import API from "./ApiService"; // API service wrapper

const API_GATEWAY_URL = "http://localhost:8091";
const PIM_API_URL = `${API_GATEWAY_URL}/api/pim`;

export const getAllProducts = async () => {
  const response = await API.get(PIM_API_URL);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await API.get(`${PIM_API_URL}/${id}`);
  return response.data;
};

export const getProductStats = async () => {
  const response = await API.get(`${PIM_API_URL}/stats`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await API.post(PIM_API_URL, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await API.put(`${PIM_API_URL}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  await API.delete(`${PIM_API_URL}/${id}`);
};

export const uploadProductImage = async (productId, imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await API.post(`${PIM_API_URL}/${productId}/upload-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// ✅ Fetch product pricing
export const getProductPricing = async (productId) => {
  try {
    const response = await API.get(`${PIM_API_URL}/pricing/${productId}`);
    
    if (response.status === 204) {
      console.warn("No pricing data found for product", productId);
      return null; // Return null to handle missing pricing in UI
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching product pricing:", error);
    return null;
  }
};


// ✅ Update product pricing
export const updateProductPricing = async (productId, pricingData) => {
  const response = await API.put(`${PIM_API_URL}/pricing/${productId}`, pricingData, {
    params: { updatedBy: "admin" }, // Pass user info
  });
  return response.data;
};

export const getTaxCategories = async () => {
  try {
    const response = await API.get(`${PIM_API_URL}/tax/categories`);
    console.log("API Response - Tax Categories:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tax categories:", error);
    return [];
  }
};

// ✅ Best practice: Pass everything in the request body
export const enrichProductPricing = async (pricingData) => {
  try {
    console.log("Enriching product pricing with data:", pricingData);
    
    const response = await API.put(`${PIM_API_URL}/pricing/enrich`, pricingData); 
    return response.data;
  } catch (error) {
    console.error("Error updating product pricing:", error);
    throw error;
  }
};

// ✅ Fetch inventory for a product
export const getProductInventory = async (productId) => {
  const response = await API.get(`${PIM_API_URL}/inventory/${productId}`);
  return response.data;
};

// ✅ Add new inventory record
export const addProductInventory = async (inventoryData) => {
  const response = await API.post(`${PIM_API_URL}/inventory/`, inventoryData);
  return response.data;
};

// ✅ Update existing inventory
export const updateProductInventory = async (inventoryId, inventoryData) => {
  const response = await API.put(`${PIM_API_URL}/inventory/${inventoryId}`, inventoryData);
  return response.data;
};

// ✅ Delete inventory
export const deleteProductInventory = async (inventoryId) => {
  await API.delete(`${PIM_API_URL}/inventory/${inventoryId}`);
};
