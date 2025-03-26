import { createContext, useContext, useEffect, useState } from "react";
import favoriteService from "../../services/FavouriteService";
import { useUserContext } from "../../hooks/UserContext";
import { v4 as uuidv4 } from "uuid"; // ✅ Generate unique session IDs

const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
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
                let sessionCreatedAt = sessionData.createdAt || 0;
                let sessionId = sessionData.sessionId || uuidv4();

                const now = Date.now();
                const isSessionExpired = sessionCreatedAt && (now - sessionCreatedAt) > SESSION_TIMEOUT;

                // ✅ If expired, do not clear — just mark the session as old
                if (isSessionExpired) {
                    console.warn("Session expired, marking as old but not clearing data.");
                }

                // ✅ Ensure no `null` values in session data
                sessionFavorites = sessionFavorites.filter(fav => fav && fav.productId);

                // ✅ Always update session ID to maintain freshness
                sessionStorage.setItem(GUEST_FAVORITES_KEY, JSON.stringify({
                    favorites: sessionFavorites,
                    createdAt: sessionCreatedAt || now,
                    sessionId: sessionId,
                }));

                if (isAuthenticated) {
                    console.log("Fetching favorites from backend...");
                    const userFavorites = await favoriteService.getFavorites(userId);
                    console.log("Received favorites:", userFavorites);

                    // ✅ Replace state only if different
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
    
        console.log("🔄 Toggling favorite for item:", item.id);
        console.log("📝 Current favorites before toggle:", favorites);
    
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
    
            console.log("➕ Adding new favorite:", newFavorite);
    
            setFavorites([...favorites, newFavorite]);
            console.log("✅ Favorites after adding:", [...favorites, newFavorite]);
    
            if (isAuthenticated) {
                try {
                    const response = await favoriteService.addToFavorites(userId, newFavorite);
                    console.log("✅ Backend response:", response.data);
                    setFavorites([...favorites, response.data]);
                } catch (error) {
                    console.error("❌ Error adding favorite:", error);
                }
            }
        } else {
            console.log("❌ Removing favorite:", item.id);
    
            setFavorites(updatedFavorites);
            console.log("✅ Favorites after removal:", updatedFavorites);
    
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
        console.log(`Removing favorite with product ID: ${id}`);
        const updatedFavorites = favorites.filter(fav => fav.productId !== id);
        setFavorites(updatedFavorites);

        if (isAuthenticated) {
            try {
                await favoriteService.removeFromFavorites(userId, id);
                console.log("Favorite removed from backend.");
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
        console.log("Clearing all favorites manually.");
        setFavorites([]);

        if (isAuthenticated) {
            try {
                await favoriteService.clearFavorites(userId);
                console.log("All favorites cleared from backend.");
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
