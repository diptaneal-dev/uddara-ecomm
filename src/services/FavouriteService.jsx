import API from "./ApiService";

const API_URL = "http://localhost:8091/api/favorites"; // Base API URL

const favoriteService = {
    // ✅ Fetch favorites from backend for registered users
    getFavorites: async (userId) => {
        try {
            if (!userId) {
                // If user is a guest, fetch from sessionStorage
                const guestFavorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
                return guestFavorites;
            }
            console.log("Fetching favourite for userId", userId);
            const response = await API.get(`${API_URL}/${userId}`);
            return response.data; // Returns list of favorite products
        } catch (error) {
            console.error("Error fetching favorites:", error);
            return []; // Return empty array on error
        }
    },

    // ✅ Add item to favorites (backend for registered users, sessionStorage for guests)
    addToFavorites: async (userId, item) => {
        try {
            console.log("Insert request for userId:", userId);
            if (!userId) {
                console.log("Requesting for guest user the same product");
                // Guest user logic
                const guestFavorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
                guestFavorites.push({ ...item, timestamp: Date.now() });
                sessionStorage.setItem("favorites", JSON.stringify(guestFavorites));
                return;
            }
    
            console.log("Posting Add request to backend:", item);
            const favoriteItem = { 
                ...item, // ✅ Send only the first item from the array
                userId,
                timestamp: Date.now()
            };
            console.log("Sending request to backend:", favoriteItem);
            const response = await API.post(`${API_URL}/add`, favoriteItem);            
            console.log("Received response from server:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    },
    
    // ✅ Remove item from favorites (backend for registered users, sessionStorage for guests)
    removeFromFavorites: async (userId, productId) => {
        try {
            if (!userId) {
                // Guest user logic
                let guestFavorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
                guestFavorites = guestFavorites.filter(item => item.id !== productId);
                sessionStorage.setItem("favorites", JSON.stringify(guestFavorites));
                return;
            }
            
            console.log("User Id:", userId);
            console.log("Product Id:", productId);

            // Registered user logic
            await API.delete(`${API_URL}/remove/${userId}/${productId}`);
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    },

    // ✅ Clear all favorites (backend for registered users, sessionStorage for guests)
    clearFavorites: async (userId) => {
        try {
            if (!userId) {
                sessionStorage.removeItem("favorites");
                return;
            }

            // Registered user logic
            await API.post(`${API_URL}/clear`, { userId });
        } catch (error) {
            console.error("Error clearing favorites:", error);
        }
    }
};

export default favoriteService;
