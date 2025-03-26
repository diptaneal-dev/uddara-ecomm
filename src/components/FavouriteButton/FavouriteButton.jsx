import { useState, useEffect, useCallback } from "react";
import Heart from "react-heart";
import { useFavorites } from "./FavouriteContext";
import { useUserContext } from "../../hooks/UserContext";
import "./favouriteButton.css";

const FavoriteButton = ({ item }) => {
    const { isAuthenticated, user } = useUserContext();
    const { favorites, toggleFavorite } = useFavorites();
    const [isFavorite, setIsFavorite] = useState(false);

    // Session Storage Key
    const GUEST_FAVORITES_KEY = "guest_favorites";

    // ✅ Memoized function to check favorite status
    const checkFavoriteStatus = useCallback(() => {
        if (!item?.id) {
            console.warn("❌ Item is missing an ID, cannot check favorite status.");
            return false; 
        }

        console.log("📌 Checking favorite status for item ID:", item.id);
        console.log("🛠 Favorites in context:", favorites);
        console.log("Is user authenticated:", isAuthenticated);
        if (isAuthenticated) {
            const isFav = favorites.some(fav => fav.productId === item.id);
            console.log(`🔴 Authenticated User: Is item ${item.id} a favorite?`, isFav);
            return isFav;
        } else {
            try {
                const storedData = sessionStorage.getItem(GUEST_FAVORITES_KEY);
                const storedFavourites = storedData ? JSON.parse(storedData).favorites || [] : [];
                const isFav = Array.isArray(storedFavourites) && storedFavourites.some(fav => fav.productId === item.id);
                console.log(`🟢 Guest User: Is item ${item.id} a favorite?`, isFav);
                return isFav;
            } catch (error) {
                console.error("Error parsing sessionStorage data:", error);
                return false;
            }
        }
    }, [favorites, isAuthenticated]); 

    useEffect(() => {
        const status = checkFavoriteStatus();
        console.log(`✅ Setting isFavorite for item ${item.id}:`, status);
        setIsFavorite(status);
    }, [favorites, checkFavoriteStatus]);

    const handleClick = async (event) => {
        if (event?.stopPropagation) {
            event.stopPropagation();
        }

        console.log("🖱️ Favorite button clicked for item:", item.id);
        
        try {
            await toggleFavorite(item); // ✅ Ensures backend updates before state changes
            console.log("✔️ Favorite status toggled.");
        } catch (error) {
            console.error("❌ Error toggling favorite:", error);
        }
    };

    return (
        <Heart
            isActive={isFavorite}
            onClick={handleClick} 
            animationScale={1.2}
            animationTrigger="click"
            style={{
                width: "1.2rem",
                height: "1.2rem",
                fill: isFavorite ? "red" : "none",
                stroke: isFavorite ? "red" : "gray",
                strokeWidth: "1px",
                cursor: "pointer"
            }}
        />
    );
};

export default FavoriteButton;
