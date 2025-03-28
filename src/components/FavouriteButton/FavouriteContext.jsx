import { createContext, useContext, useEffect, useState } from "react";
import favoriteService from "../../services/FavouriteService";
import { useUserContext } from "../../hooks/UserContext";
import { v4 as uuidv4 } from "uuid";

const GUEST_FAVORITES_KEY = "guest_favorites";
const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

const FavoriteProvider = ({ children }) => {
    const { isAuthenticated, user } = useUserContext();
    const [favorites, setFavorites] = useState([]);
    const userId = user?.userId;

    useEffect(() => {
        const syncFavorites = async () => {
            try {
                let sessionData = JSON.parse(sessionStorage.getItem(GUEST_FAVORITES_KEY)) || {};
                let sessionFavorites = sessionData.favorites || [];
                let sessionCreatedAt = sessionData.createdAt || Date.now();
                let sessionId = sessionData.sessionId || uuidv4();

                // Filter out any malformed entries
                sessionFavorites = sessionFavorites.filter(fav => fav && fav.productId);

                // Always update session storage (for guests)
                sessionStorage.setItem(GUEST_FAVORITES_KEY, JSON.stringify({
                    favorites: sessionFavorites,
                    createdAt: sessionCreatedAt,
                    sessionId: sessionId,
                }));

                if (isAuthenticated) {
                    console.log("Fetching favorites from backend...");
                    const userFavorites = await favoriteService.getFavorites(userId);
                    console.log("Received favorites:", userFavorites);

                    if (JSON.stringify(userFavorites) !== JSON.stringify(favorites)) {
                        setFavorites(userFavorites.filter(fav => fav && fav.productId));
                    }
                } else {
                    setFavorites(sessionFavorites);
                }
            } catch (error) {
                console.error("Error syncing favorites:", error);
                setFavorites([]);
            }
        };

        syncFavorites();
    }, [isAuthenticated, userId]);

    const toggleFavorite = async (item) => {
        if (!item || !item.id) {
            console.error("❌ Invalid item provided to toggleFavorite:", item);
            return;
        }

        const isFavorited = favorites.some(fav => fav.productId === item.id);
        let updatedFavorites = favorites.filter(fav => fav.productId !== item.id);

        if (!isFavorited) {
            const newFavorite = {
                productId: item.id,
                productName: item.name,
                productImage: item.image,
                productCategory: item.category,
                productPrice: item.price,
                timestamp: Date.now(),
            };

            setFavorites([...favorites, newFavorite]);

            if (isAuthenticated) {
                try {
                    const response = await favoriteService.addToFavorites(userId, newFavorite);
                    setFavorites([...favorites, response.data]);
                } catch (error) {
                    console.error("❌ Error adding favorite:", error);
                }
            }
        } else {
            setFavorites(updatedFavorites);

            if (isAuthenticated) {
                try {
                    await favoriteService.removeFromFavorites(userId, item.id);
                } catch (error) {
                    console.error("❌ Error removing favorite:", error);
                }
            }
        }
    };

    const removeFavorite = async (id) => {
        const updatedFavorites = favorites.filter(fav => fav.productId !== id);
        setFavorites(updatedFavorites);

        if (isAuthenticated) {
            try {
                await favoriteService.removeFromFavorites(userId, id);
            } catch (error) {
                console.error("Error removing favorite:", error);
            }
        } else {
            sessionStorage.setItem(GUEST_FAVORITES_KEY, JSON.stringify({
                favorites: updatedFavorites,
                createdAt: Date.now(),
            }));
        }
    };

    const clearFavorites = async () => {
        setFavorites([]);

        if (isAuthenticated) {
            try {
                await favoriteService.clearFavorites(userId);
            } catch (error) {
                console.error("Error clearing favorites:", error);
            }
        }

        sessionStorage.removeItem(GUEST_FAVORITES_KEY);
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, removeFavorite, clearFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteProvider;
