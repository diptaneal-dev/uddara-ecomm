import API from "./ApiService";

const STORE_API_URL = 'http://localhost:8091/api/stores';

const storeService = {
    getAllStores: () => API.get(STORE_API_URL),
    getStoreById: (id) => API.get(`${STORE_API_URL}/${id}`),
    createStore: (storeData) => API.post(`${STORE_API_URL}/create-store`, storeData),
    updateStore: (id, storeData) => API.put(`${STORE_API_URL}/${id}`, storeData),
    deleteStore: (id) => API.delete(`${STORE_API_URL}/${id}`),
    getStoresByUser: async (username) => {
        const response = await API.get(`${STORE_API_URL}/user/${username}`);
        return response.data;
    },
    submitExpirationPolicies: (storeId, expirationPolicies) => {
        const url = `${STORE_API_URL}/expiration-policies/${storeId}`;
        console.log(`URL: ${url}`);
        console.log(`Submitting expiration policies for store ID: ${storeId}`, expirationPolicies);
        return API.post(url, expirationPolicies);
    },
    getExpirationPoliciesByStoreId: async (storeId) => {
        const response = await API.get(`${STORE_API_URL}/expiration-policies/${storeId}`);
        console.log("Response to this API is:", response.data);
        return response.data;
    },
    createSeatingArrangement: async (seatingData) => {
        try {
            const response = await API.post(`${STORE_API_URL}/${seatingData.storeId}/seating-arrangements`, seatingData);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            throw new Error("Failed to create seating arrangement.");
        }
    },
    getSeatingArrangementByStoreId: async (storeId) => {
        const response = await API.get(`${STORE_API_URL}/seating-arrangements/${storeId}`);
        console.log("Response to this API is:", response.data);
        return response.data;
    },
    addTempCapacityToStore: async (additionalData) => {
        const response = await API.patch(
            `${STORE_API_URL}/seating-arrangements/add-seats?storeId=${additionalData.storeId}&name=${encodeURIComponent(additionalData.name)}`,
            { additionalCapacity: additionalData.additionalSeats }
        );
        return response.data;
    },
    resetCapacity: async (payload) => {
        try {
            const response = await API.patch(
                `${STORE_API_URL}/seating-arrangements/reset-capacity?storeId=${payload.storeId}&name=${encodeURIComponent(payload.name)}`
            );

            return response.data;
        } catch (error) {
            console.error("Error resetting capacity:", error.response?.data || error.message);
            throw new Error("Failed to reset seating capacity.");
        }
    },
    
    /** Subscribe Users to Store Newsletter */
    subscribeToNewsletter: async (storeId, email) => {
        try {
            const response = await API.post(`${STORE_API_URL}/${storeId}/subscribe`, { email });
            return response.data;
        } catch (error) {
            console.error("Error subscribing to newsletter:", error.response?.data || error.message);
            throw new Error("Failed to subscribe to the store newsletter.");
        }
    },

};

export default storeService;
