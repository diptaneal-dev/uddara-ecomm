import API from "./ApiService"; // API service wrapper

const API_GATEWAY_URL = "http://localhost:8091";
const BOOKING_API_URL = `${API_GATEWAY_URL}/api/interaction/bookings`;
const AVAILABILITY_API_URL = `${API_GATEWAY_URL}/api/interaction/availability`;

const interactionService = {

    // setup Availability
    setupAvailability: async (payload) => {
        try {
            console.log("Request payload sent:", payload);
            const response = await API.post(`${AVAILABILITY_API_URL}/setup`, payload);
            console.log("Response data is:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error processing availability setup:", error);
            return null;
        }
    },

    // Fetch all availability slots for the admin's store
    fetchAvailability: async (storeId) => {
        try {
            const response = await API.get(`${AVAILABILITY_API_URL}/store/${storeId}`);
            console.log("Received response for availability:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching availability slots:", error);
            return [];
        }
    },

};

export default interactionService;
