import API from "./ApiService";

const API_GATEWAY_URL = "http://localhost:8091"; // API Gateway Base URL
const CLIENT_API_URL = `${API_GATEWAY_URL}/api/clients`;

const clientService = {

    // Fetch all clients (Users with role USER and store_id = 33)
    fetchClients: async () => {
        try {
            const response = await API.get(`${CLIENT_API_URL}/all?storeId=33`);
            console.log("✅ Clients Fetched:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching clients:", error.response?.data || error.message);
            throw error.response?.data || "Failed to fetch clients";
        }
    },

    // Fetch a specific client by ID
    fetchClientById: async (clientId) => {
        try {
            const response = await API.get(`${CLIENT_API_URL}/${clientId}`);
            console.log("✅ Client Fetched:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching client:", error.response?.data || error.message);
            throw error.response?.data || "Failed to fetch client";
        }
    },

    // Activate or deactivate a client (Admin Control)
    toggleClientStatus: async (clientId, isActive) => {
        try {
            const response = await API.put(`${CLIENT_API_URL}/${clientId}/status`, { active: isActive });
            console.log(`✅ Client ${isActive ? "Activated" : "Deactivated"} Successfully:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Error updating client status:`, error.response?.data || error.message);
            throw error.response?.data || `Failed to update client status`;
        }
    },

    // Update client details
    updateClient: async (clientId, clientData) => {
        try {
            const response = await API.put(`${CLIENT_API_URL}/${clientId}`, clientData);
            console.log("✅ Client Updated Successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating client:", error.response?.data || error.message);
            throw error.response?.data || "Failed to update client";
        }
    },

    // Fetch client order history
    fetchClientOrders: async (clientId) => {
        try {
            const response = await API.get(`${CLIENT_API_URL}/${clientId}/orders`);
            console.log("✅ Client Orders Fetched:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching client orders:", error.response?.data || error.message);
            throw error.response?.data || "Failed to fetch client orders";
        }
    },

};

export default clientService;
