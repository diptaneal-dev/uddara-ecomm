import API from "./ApiService";

const API_URL = "http://localhost:8091/api/cart"; // Base API URL

const cartService = {
    // ✅ Fetch cart from DB
    getCart: async (userId) => {
        try {
            const response = await API.get(`${API_URL}/${userId}`);
            return response.data; // Returns CartDTO
        } catch (error) {
            console.error("Error fetching cart:", error);
            return { userId, items: [] }; // Return empty cart on error
        }
    },

    // ✅ Update cart in DB 
    updateCart: async (userId, items) => {
        try {
            const cartDTO = { userId, items }; // ✅ Match CartDTO format
            await API.post(`${API_URL}/update`, cartDTO);
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    },

    // ✅ Clear cart in DB 
    clearCart: async (userId) => {
        try {
            const cartDTO = { userId, items: [] }; 
            await API.post(`${API_URL}/clear`, cartDTO);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    }
};

export default cartService;
