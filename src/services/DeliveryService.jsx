import API from "./ApiService";

const API_GATEWAY_URL = "http://localhost:8091"; // API Gateway Base URL
const DELIVERY_API_URL = `${API_GATEWAY_URL}/api/delivery`;

const deliveryService = {

    // Fetch all delivery addresses for the client
    fetchDeliveryAddresses: async (clientId) => {
        try {
            const response = await API.get(`${DELIVERY_API_URL}/${clientId}/addresses`);
            console.log("✅ Client Delivery Addresses Fetched:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching client addresses:", error.response?.data || error.message);
            throw error.response?.data || "Failed to fetch client addresses";
        }
    },

    // Save a new delivery address
    saveDeliveryAddress: async (clientId, addressData) => {
        try {
            const response = await API.post(`${DELIVERY_API_URL}/${clientId}/addresses`, addressData);
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
            const response = await API.put(`${DELIVERY_API_URL}/${clientId}/addresses/${addressId}`, addressData);
            console.log("✅ Delivery Address Updated:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating delivery address:", error.response?.data || error.message);
            throw error.response?.data || "Failed to update delivery address";
        }
    }
};

export default deliveryService;
