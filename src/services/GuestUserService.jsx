import API from "./ApiService";

const API_GATEWAY_URL = "http://localhost:8091"; // API Gateway Base URL
const GUEST_USER_API_URL = `${API_GATEWAY_URL}/api/guest`;

const guestUserService = {

    // ✅ Create a guest user & map to store
    createGuestUser: async (firstName, lastName, email, phoneNumber, storeId) => {
        try {
            console.log("Calling API to create guest user...");
            const response = await API.post(`${GUEST_USER_API_URL}/createUser`, { firstName, lastName, email, phoneNumber, storeId });
            console.log("✅ Guest user created:", response.data);
            return response.data; // Returns { userId, storeId }
        } catch (error) {
            console.error("❌ Error creating guest user:", error);
            throw error;
        }
    },

    // Save a new delivery address (without clientId in the URL)
    saveGuestDeliveryAddress: async (addressData) => {
        try {
            const response = await API.post(`${GUEST_USER_API_URL}/saveAddress`, addressData);
            console.log("✅ Delivery Address Saved:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error saving delivery address:", error.response?.data || error.message);
            throw error.response?.data || "Failed to save delivery address";
        }
    },

    // Update an existing delivery address
    updateDeliveryAddress: async (clientId, addressId, addressData) => {
        try {
            const response = await API.put(`${GUEST_USER_API_URL}/${clientId}/addresses/${addressId}`, addressData);
            alert("Resposne received", response.data);
            console.log("✅ Delivery Address Updated:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating delivery address:", error.response?.data || error.message);
            throw error.response?.data || "Failed to update delivery address";
        }
    },

    // Fetch all delivery addresses for the client
    fetchDeliveryAddresses: async (clientId) => {
        try {
            const response = await API.get(`${GUEST_USER_API_URL}/${clientId}/addresses`);
            console.log("✅ Client Delivery Addresses Fetched:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching client addresses:", error.response?.data || error.message);
            throw error.response?.data || "Failed to fetch client addresses";
        }
    },

    // ✅ Generate a checkout token (ONE-TIME USE)
    generateCheckoutToken: async (userShippingInfo) => {
        try {
            console.log("Requesting guest checkout token...");
            const response = await API.post(`${GUEST_USER_API_URL}/generate-checkout-token`, { userShippingInfo });
            console.log("✅ Checkout Token Received:", response.data);
            return response.data.token; // Returns token string
        } catch (error) {
            console.error("❌ Error generating checkout token:", error.response?.data || error.message);
            throw error.response?.data || "Failed to generate checkout token";
        }
    },

    // ✅ Invalidate guest token after checkout
    invalidateGuestToken: async (token) => {
        try {
            console.log("Invalidating guest token...");
            await API.post(`${GUEST_USER_API_URL}/invalidate-token`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("✅ Guest token invalidated");
        } catch (error) {
            console.error("❌ Error invalidating guest token:", error.response?.data || error.message);
        }
    },



};

export default guestUserService;
