// services/CareersService.js
import API from "./ApiService";

const API_URL = "http://localhost:8091/api/careers";

const careersService = {
  getOpenPositions: async () => {
    try {
      const response = await API.get(`${API_URL}/openpositions`);
      return response.data;
    } catch (error) {
      console.error("Error fetching open positions:", error);
      return { openPositions: [] };
    }
  },

  // ✅ Submit career interest form
  submitInterest: async (formData) => {
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("message", formData.message);
      payload.append("resume", formData.resume);

      const response = await API.post(`${API_URL}/submit`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error submitting application:", error);
      throw error;
    }
  },
};

export default careersService;
