import API from "./ApiService";

const API_GATEWAY_URL = "http://localhost:8091"; // Use API Gateway for all requests

const API_URL = `${API_GATEWAY_URL}/api/users`;
const AUTH_API_URL = `${API_GATEWAY_URL}/api/auth`;
const USER_CONTEXT_API_URL = `${API_GATEWAY_URL}/api/user-context`;

const USER_CONTEXT_KEY = "user";

const userService = {
    register: async (data) => {
        try {
            const response = await API.post(`${AUTH_API_URL}/register`, data);
            return response.data;
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            throw error.response?.data || "Registration failed";
        }
    },

    login: async (username, password) => {
        try {
            const response = await API.post(`${AUTH_API_URL}/login/internal`, { username, password });
            console.log("Login Response:", response.data);
            
            const { userContext, expiresAt } = response.data;

            // Store only user context, NOT the JWT
            localStorage.setItem(USER_CONTEXT_KEY, JSON.stringify(userContext));
            localStorage.setItem("tokenExpiry", expiresAt);
            
            return { userContext, expiresAt };
        } catch (error) {
            console.error("Login Failed:", error.response?.data || error.message);
            throw error.response?.data || "Login failed";
        }
    },

    logout: async () => {
        try {
            await API.post(`${AUTH_API_URL}/logout`);
            localStorage.removeItem(USER_CONTEXT_KEY); // Clear user context
            console.log("Logged out successfully.");
        } catch (error) {
            console.error("Logout Failed:", error.message);
        }
    },
    
    refreshToken: async () => {
        try {
            const response = await API.post(`${AUTH_API_URL}/refresh`); // Fixed the refresh path
            console.log("🔄 Refresh Token Successful:", response.data);
            return response.data;
        } catch (error) {
            console.error("Refresh token request failed:", error);
            throw error;
        }
    },

    getUserStores: async (userId) => {
        const response = await API.get(`${API_URL}/getUserStores/${userId}`);
        console.log("User Stores:", response.data);
        return response.data;
    },

    createUserStoreMapping: async (userId, store) => {
        try {
            const payload = { userId, store };
            const response = await API.post(`${API_URL}/user-store`, payload);
            console.log("User-Store Mapping Created:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating User-Store mapping:", error.response?.data || error.message);
            throw error.response?.data || "Failed to create User-Store mapping";
        }
    },

    updateCurrentStore: async (userId, storeId) => {
        try {
            await API.put(`${API_URL}/current-store/${storeId}`, { userId }); // Fixed the request payload
            console.log("Current store updated.");
        } catch (error) {
            console.error("Failed to update current store:", error.response?.data || error.message);
            throw error.response?.data || "Failed to update current store";
        }
    },

    fetchUserContext: async (userId) => {
        console.log("📌 Fetching UserContext for userId:", userId);
        const response = await API.get(`${USER_CONTEXT_API_URL}/${userId}`);
        console.log("✅ UserContext Fetched:", response.data);
        return response.data;
    },

    getFullUserContext: async (userId) => {
        try {
            const response = await API.get(`${USER_CONTEXT_API_URL}/full/${userId}`);
            if (response.status !== 200) throw new Error("Failed to fetch user context");
            console.log("Full UserContext Fetched:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching full user context:", error.response?.data || error.message);
            throw error.response?.data || "Failed to fetch user context";
        }
    },

    savePreferences: async (userId, preferences) => {
        try {
            const response = await API.put(`${USER_CONTEXT_API_URL}/${userId}/preferences`, preferences);
            console.log("Preferences Updated Successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating preferences:", error.response?.data || error.message);
            throw error.response?.data || "Failed to update preferences";
        }
    },

    getUserContext: () => {
        const userData = localStorage.getItem(USER_CONTEXT_KEY);
        return userData ? JSON.parse(userData) : null;
    },
};

export default userService;
