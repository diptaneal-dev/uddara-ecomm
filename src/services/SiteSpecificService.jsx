import API from "./ApiService"; // Use Axios API service

const STORE_API_URL = "/api/site-specific/store"; 
const TEMPLATE_API_URL = "/api/site-specific/template";

const SiteSpecificService = {
  // Fetch store-specific configuration (Header, Body, Footer)
  async getStoreConfig(storeId) {
    const response = await API.get(`${STORE_API_URL}/config/${storeId}`);
    return response.data; // Axios automatically parses JSON
  },

  // Fetch all available header templates
  async getHeaderTemplates() {
    const response = await API.get(`${TEMPLATE_API_URL}/headers`);
    return response.data;
  },

  // Fetch all available footer templates
  async getFooterTemplates() {
    const response = await API.get(`${TEMPLATE_API_URL}/footers`);
    return response.data;
  },

  // Fetch all available body sections
  async getBodySections(storeId) {
    const response = await API.get(`${TEMPLATE_API_URL}/sections/${storeId}`);
    return response.data;
  },

  // Save store-specific header configuration
  async saveHeaderConfig(storeId, headerConfig) {
    const response = await API.post(`${TEMPLATE_API_URL}/header/${storeId}/save`, { headerConfig });
    return response.data;
  },

  // Save store-specific footer configuration
  async saveFooterConfig(storeId, footerConfig) {
    const response = await API.post(`${TEMPLATE_API_URL}/footer/${storeId}/save`, { footerConfig });
    return response.data;
  },

  // Save store-specific body sections configuration
  async saveBodySections(storeId, bodySections) {
    const response = await API.post(`${TEMPLATE_API_URL}/sections/${storeId}/save`, { bodySections });
    return response.data;
  },
};

export default SiteSpecificService;
