import API from "./ApiService"; 

const API_GATEWAY_URL = "http://localhost:8091";
const REFDATA_API_URL = `${API_GATEWAY_URL}/api/refdata`;
const REFDATA_CAT_API_URL = `${API_GATEWAY_URL}/api/reference/categories`;

// 🌍 Fetch all countries
export const getAllCountries = async () => {
  try {
    const response = await API.get(`${REFDATA_API_URL}/countries`);
    console.log("Response received for country:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

// 💱 Fetch all currencies
export const getAllCurrencies = async () => {
  try {
    const response = await API.get(`${REFDATA_API_URL}/currencies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return [];
  }
};

// 🕒 Placeholder: Fetch all timezones (if implemented later)
export const getAllTimezones = async () => {
  try {
    const response = await API.get(`${REFDATA_API_URL}/timezones`);
    return response.data;
  } catch (error) {
    console.error("Error fetching timezones:", error);
    return [];
  }
};

// 📦 Get all categories (optionally by type)
export const getAllCategories = async (type) => {
  try {
    const response = await API.get(REFDATA_CAT_API_URL, {
      params: type ? { type } : {}
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const addCategory = async (categoryDto) => {
  try {
    const response = await API.post(REFDATA_CAT_API_URL, categoryDto);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = async (id, categoryDto) => {
  try {
    const response = await API.put(`${REFDATA_CAT_API_URL}/${id}`, categoryDto);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await API.delete(`${REFDATA_CAT_API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
};

export const uploadCategoryCsv = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await API.post(`${REFDATA_CAT_API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading CSV:", error);
    throw error;
  }
};
