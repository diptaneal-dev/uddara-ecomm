import API from "./ApiService"; // API service wrapper

const API_GATEWAY_URL = "http://localhost:8091";
const PAYMENT_API_URL = `${API_GATEWAY_URL}/api/payments`;

const paymentService = {
    // Create a new payment order
    createOrder: async (amount, currency) => {
        try {
            const response = await API.post(`${PAYMENT_API_URL}/create-order`, {
                amount,
                currency: currency || "INR",
            });
            console.log("Received Response from server:", response.data);
            return response.data.order_id;
        } catch (error) {
            console.error("Error creating order:", error);
            return null;
        }
    },

    // Fetch filtered payments
    getPayments: async (status, fromDate, toDate) => {
        try {
            const params = {};
            if (status) params.status = status;
            if (fromDate && toDate) {
                params.fromDate = fromDate;
                params.toDate = toDate;
            }

            const response = await API.get(`${PAYMENT_API_URL}/all`, { params });
            console.log("Received response from backend:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching payments:", error);
            return [];
        }
    },

    // Process a payment after confirmation
    processPayment: async (paymentData) => {
        try {
            const response = await API.post(`${PAYMENT_API_URL}/process`, paymentData);
            return response.data;
        } catch (error) {
            console.error("Error processing payment:", error);
            return null;
        }
    }
};

export default paymentService;
