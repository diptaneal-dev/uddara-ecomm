import API from "./ApiService";  // ✅ Use the API Gateway service

const API_URL = "http://localhost:8091/api/ecommerce-orders"; // Base API URL via API Gateway

const OrderService = {
    // 🟢 Place a new e-commerce order
    placeOrder: async (orderData) => {
        try {
            console.log("Order placed:", orderData);
            const response = await API.post(`${API_URL}/placeOrder`, orderData);
            return response.data;
        } catch (error) {
            console.error("Error placing order:", error);
            throw error;
        }
    },

    // 🟢 Get order details by ID
    getOrderById: async (orderId) => {
        try {
            const response = await API.get(`${API_URL}/${orderId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching order details:", error);
            throw error;
        }
    },

    // 🟢 Update order tracking number
    updateTracking: async (orderId, trackingNumber) => {
        try {
            await API.put(`${API_URL}/${orderId}/updateTracking`, null, {
                params: { trackingNumber },
            });
        } catch (error) {
            console.error("Error updating tracking number:", error);
            throw error;
        }
    },

    // 🟢 Get all orders for a specific customer
    getOrdersByCustomer: async (customerId) => {
        try {
            const response = await API.get(`${API_URL}/customer/${customerId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching customer orders:", error);
            throw error;
        }
    },

    // 🟢 Get orders by shipping status (e.g., SHIPPED, DELIVERED)
    getOrdersByStatus: async (status) => {
        try {
            const response = await API.get(`${API_URL}/status/${status}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching orders by status:", error);
            throw error;
        }
    },

    // 🟢 Mark e-commerce order as delivered
    markOrderAsDelivered: async (orderId) => {
        try {
            await API.put(`${API_URL}/${orderId}/markDelivered`);
        } catch (error) {
            console.error("Error marking order as delivered:", error);
            throw error;
        }
    },
};

export default OrderService;
