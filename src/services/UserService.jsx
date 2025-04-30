import API from "./ApiService";

const API_GATEWAY_URL = "http://localhost:8091";

const API_URL = `${API_GATEWAY_URL}/api/users`;
const AUTH_API_URL = `${API_GATEWAY_URL}/api/auth`;
const USER_CONTEXT_API_URL = `${API_GATEWAY_URL}/api/user-context`;

const USER_CONTEXT_KEY = "user";

const userService = {
    register: async (data) => {
        const response = await API.post(`${AUTH_API_URL}/register`, data);
        return response.data;
    },

    login: async (username, password) => {
        const response = await API.post(`${AUTH_API_URL}/login/internal`, { username, password });
        const { userContext, expiresAt } = response.data;
        localStorage.setItem(USER_CONTEXT_KEY, JSON.stringify(userContext));
        localStorage.setItem("tokenExpiry", expiresAt);
        return { userContext, expiresAt };
    },

    logout: async () => {
        await API.post(`${AUTH_API_URL}/logout`);
        localStorage.removeItem(USER_CONTEXT_KEY);
    },

    refreshToken: async () => {
        const response = await API.post(`${AUTH_API_URL}/refresh`);
        return response.data;
    },

    getUserStores: async (userId) => {
        const response = await API.get(`${API_URL}/${userId}/stores`);
        return response.data;
    },

    getUserStoreGroups: async (userId) => {
        const response = await API.get(`${API_URL}/${userId}/store-groups`);
        return response.data;
    },

    assignUserToScope: async (userId, { role, scopeType, scopeId }) => {
        const response = await API.post(`${API_URL}/${userId}/assign-scope`, {
            role,
            scopeType,
            scopeId,
        });
        return response.data;
    },

    removeUserScopeAssignment: async (assignmentId, type) => {
        await API.delete(`${API_URL}/scope/${assignmentId}`, {
            params: { type },
        });
    },

    createUserStoreMapping: async (userId, store) => {
        const payload = { userId, store };
        const response = await API.post(`${API_URL}/user-store`, payload);
        return response.data;
    },

    updateCurrentStore: async (userId, storeId) => {
        await API.put(`${API_URL}/current-store/${storeId}`, { userId });
    },

    fetchUserContext: async (userId) => {
        const response = await API.get(`${USER_CONTEXT_API_URL}/${userId}`);
        return response.data;
    },

    getFullUserContext: async (userId) => {
        const response = await API.get(`${USER_CONTEXT_API_URL}/full/${userId}`);
        return response.data;
    },

    savePreferences: async (userId, preferences) => {
        const response = await API.put(`${USER_CONTEXT_API_URL}/${userId}/preferences`, preferences);
        return response.data;
    },

    getUserContext: () => {
        const userData = localStorage.getItem(USER_CONTEXT_KEY);
        return userData ? JSON.parse(userData) : null;
    },

    sendInvitation: async (form) => {
        const {
            email,
            role,
            scopeType,
            scopeId,
            expiration,
            domain
        } = form;
    
        const payload = {
            email,
            role,
            scopeType,
            scopeId,
            domain,
            expiration: expiration || null
        };
    
        const response = await API.post(`${USER_CONTEXT_API_URL}/invite`, payload);
        console.log("Incoming response:", response);
        return response.data;
    },
        
    toggleUserStatus: async (userId, isActive) => {
        const response = await API.patch(`${API_URL}/${userId}/status`, { isActive });
        return response.data;
    },

    logUserAction: async (userId, action, details) => {
        await API.post(`${API_URL}/${userId}/logs`, { action, details });
    },

    getUserActivityLog: async (userId, { search = '', type = '' } = {}) => {
        const response = await API.get(`${API_URL}/${userId}/logs`, {
            params: { search, type },
        });
        return response.data;
    },

    getUsers: async ({ search = '', role = [], status = '', store = [] }) => {
        const response = await API.get(`${API_URL}`, {
            params: {
                search,
                status,
                role,
                store,
            },
            paramsSerializer: (params) => {
                const query = new URLSearchParams();
                if (params.search) query.append('search', params.search);
                if (params.status) query.append('status', params.status);
                if (Array.isArray(params.role)) {
                    params.role.forEach((r) => query.append('role', r));
                }
                if (Array.isArray(params.store)) {
                    params.store.forEach((s) => query.append('store', s));
                }
                return query.toString();
            },
        });

        return response.data;
    },

    createUser: async (data) => {
        const response = await API.post(`${API_URL}`, data);
        return response.data;
    },

    updateUser: async (id, data) => {
        const response = await API.put(`${API_URL}/${id}`, data);
        return response.data;
    },

    assignRole: async (userId, payload) => {
        const response = await API.post(`${API_URL}/${userId}/roles`, payload);
        return response.data;
    },

    removeRoleAssignment: async (assignmentId) => {
        await API.delete(`${API_URL}/roles/${assignmentId}`);
    },

    getUserRoleAssignments: async (userId) => {
        const response = await API.get(`${API_URL}/${userId}/roles`);
        return response.data;
    },

    getStores: async () => {
        const response = await API.get(`${API_GATEWAY_URL}/api/stores`);
        return response.data;
    },

    getStoreGroups: async () => {
        const response = await API.get(`${API_GATEWAY_URL}/api/store-groups`);
        return response.data;
    },
};

export default userService;
