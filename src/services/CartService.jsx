import API from "./ApiService";

const API_URL = "http://localhost:8091/api/cart";

const cartService = {
    // ✅ Fetch cart from DB
    getCart: async (userId, storeId) => {
        try {
            const response = await API.get(`${API_URL}/${userId}/store/${storeId}`);
            return response.data; // CartDTO
        } catch (error) {
            console.error("Error fetching cart:", error);
            return { userId, storeId, items: [] }; // Empty fallback
        }
    },

    // ✅ Update cart in DB
    updateCart: async (userId, storeId, items) => {
        try {
            const cartDTO = { userId, storeId, items }; 
            console.log("Cart Update sent:", cartDTO);
            await API.post(`${API_URL}/update`, cartDTO);
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    },

    // ✅ Clear cart in DB
    clearCart: async (userId, storeId) => {
        try {
            const cartDTO = { userId, storeId, items: [] };
            await API.post(`${API_URL}/clear/store/${storeId}`, cartDTO);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    }
};

export default cartService;
