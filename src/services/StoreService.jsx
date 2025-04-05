import API from "./ApiService";

const STORE_API_URL = 'http://localhost:8091/api/stores';

const storeService = {
    getAllStores: () => API.get(STORE_API_URL),
    createStore: (storeData) => API.post(`${STORE_API_URL}/create-store`, storeData),
    updateStore: (id, storeData) => API.put(`${STORE_API_URL}/${id}`, storeData),
    deleteStore: (id) => API.delete(`${STORE_API_URL}/${id}`),

    getStoreById: async (id) => {
        const response = await API.get(`${STORE_API_URL}/${id}`);
        return response.data;
    },
    getStoresByUser: async (username) => {
        const response = await API.get(`${STORE_API_URL}/user/${username}`);
        return response.data;
    },
    // --- Store Group APIs ---
    createStoreGroup: async (groupData) => {
        const response = await API.post(`${STORE_API_URL}/create-group`, groupData);
        return response.data;
    },

    updateStoreGroup: async (id, groupData) => {
        const response = await API.put(`${STORE_API_URL}/group/${id}`, groupData);
        return response.data;
    },

    deleteStoreGroup: async (id) => {
        const response = await API.delete(`${STORE_API_URL}/group/${id}`);
        return response.data;
    },

    getMyStoreGroups: async () => {
        const response = await API.get(`${STORE_API_URL}/groups/me`);
        console.log("Group information:", response.data);
        return response.data;
    },

    getStoreGroupById: async (id) => {
        const response = await API.get(`${STORE_API_URL}/group/${id}`);
        console.log("Response received:", response.data);
        return response.data;
    },

    getMyStores: async () => {
        const response = await API.get(`${STORE_API_URL}/me`);
        console.log("Fetching stores:", response.data);
        return response.data;
    },

    getStoresByGroupId: async (groupId) => {
        const response = await API.get(`${STORE_API_URL}/group/${groupId}/stores`);
        console.log("getStoresByGroupId :", response.data);
        return response.data;
    },

    submitExpirationPolicies: (storeId, expirationPolicies) => {
        const url = `${STORE_API_URL}/expiration-policies/${storeId}`;
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

    // Assign user to a store or store group (scopeType: 'STORE' or 'GROUP')
    assignUserToScope: async (userId, { scopeType, scopeId, role }) => {
        if (scopeType === 'STORE') {
            return await API.post(`${STORE_API_URL}/${scopeId}/user/${userId}?role=${role}`);
        } else if (scopeType === 'GROUP') {
            return await API.post(`${STORE_API_URL}/group/${scopeId}/user/${userId}?role=${role}`);
        } else {
            throw new Error(`Unknown scopeType: ${scopeType}`);
        }
    },

    // Remove user from a store or store group
    removeUserScopeAssignment: async (assignmentId, scopeType) => {
        const { userId, scopeId } = assignmentId;

        if (scopeType === 'STORE') {
            return await API.delete(`${STORE_API_URL}/${scopeId}/user/${userId}`);
        } else if (scopeType === 'GROUP') {
            return await API.delete(`${STORE_API_URL}/group/${scopeId}/user/${userId}`);
        } else {
            throw new Error(`Unknown scopeType: ${scopeType}`);
        }
    },

    // Get all stores assigned to a user
    getUserStores: async (userId) => {
        const response = await API.get(`${STORE_API_URL}/user/${userId}/stores`);
        return response.data;
    },

    // Get all store groups assigned to a user
    getUserStoreGroups: async (userId) => {
        const response = await API.get(`${STORE_API_URL}/user/${userId}/groups`);
        return response.data;
    },


};

export default storeService;
