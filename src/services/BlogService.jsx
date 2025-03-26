import API from "./ApiService"; // API service wrapper

const API_GATEWAY_URL = "http://localhost:8091";
const BLOG_API_URL = `${API_GATEWAY_URL}/api/blogs`;

const blogService = {
    // ✅ Upload Image via API Gateway
    uploadImage: async (formData) => {
        try {
            const response = await API.post(`${BLOG_API_URL}/images/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data; // Returns { imageUrl: "http://localhost:8091/uploads/image.jpg" }
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    },

    // ✅ Save Blog via API Gateway with Full Logging
    saveBlog: async (blogData) => {
        try {
            console.log("🔥 Sending Blog Data (Request Payload):", JSON.stringify(blogData, null, 2));

            const response = await API.post(`${BLOG_API_URL}`, blogData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("✅ Full API Response:", response);
            console.log("✅ Response Data:", response.data);

            if (!response.data || typeof response.data !== "object") {
                console.error("⚠️ Unexpected Response Format:", response);
                throw new Error("Invalid response format received.");
            }

            return response.data;
        } catch (error) {
            console.error("❌ API Call Failed:", {
                status: error.response?.status,
                message: error.response?.data || error.message,
                fullError: error,
            });
            throw error;
        }
    },

    // ✅ Fetch All Blogs
    getAllBlogs: async (pageNumber = 0, pageSize = 10) => {
        try {
            const response = await API.get(`${BLOG_API_URL}?page=${pageNumber}&size=${pageSize}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching blogs:", error);
            throw error;
        }
    },    

    // ✅ Fetch Blog by ID
    getBlogById: async (blogId) => {
        try {
            const response = await API.get(`${BLOG_API_URL}/${blogId}`);
            return response.data;
        } catch (error) {
            console.error("❌ Error fetching blog:", error);
            return null;
        }
    },
    
    // ✅ Update Blog via API Gateway
    updateBlog: async (id, blogData) => {
        try {
            const response = await API.put(`${BLOG_API_URL}/${id}`, blogData, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            console.error("Error updating blog:", error);
            throw error;
        }
    },

    createDraftBlog: async (blogData) => {
        try {
            const response = await API.post(`${BLOG_API_URL}/create`, blogData, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data; // ✅ Returns the created blog's ID
        } catch (error) {
            console.error("❌ Error creating draft blog:", error);
            throw error;
        }
    },

    getLatestDraftBlog: async () => {
        try {
            const response = await API.get(`${BLOG_API_URL}/latest-draft`);
            return response.data; // ✅ Ensure the API returns the latest draft
        } catch (error) {
            console.error("❌ Error fetching latest draft blog:", error);
            return null; // Handle gracefully
        }
    },
    
    getImagesFromDirectory: async (imageDirectory) => {
        try {
            const response = await API.get(`${BLOG_API_URL}/images/list`, {
                params: { directory: imageDirectory },
            });
            return response.data.imageUrls; // ✅ Returns an array of image URLs
        } catch (error) {
            console.error("❌ Error fetching images:", error);
            return [];
        }
    },
    
    uploadCoverImage: async (blogId, formData) => {
        try {
            console.log("What is the blogId", blogId);
            const response = await API.post(`${BLOG_API_URL}/${blogId}/cover-image`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data; 
        } catch (error) {
            console.error("❌ Error uploading cover image:", error);
            throw error;
        }
    },

    uploadBannerImage: async (blogId, formData) => {
        try {
            const response = await API.post(`${BLOG_API_URL}/${blogId}/banner-image`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data; 
        } catch (error) {
            console.error("❌ Error uploading banner image:", error);
            throw error;
        }
    },
    
    // ✅ Delete Blog via API Gateway
    deleteBlog: async (id) => {
        try {
            await API.delete(`${BLOG_API_URL}/${id}`);
        } catch (error) {
            console.error("Error deleting blog:", error);
            throw error;
        }
    },

    // ✅ Fetch blog statistics
    getBlogStats: async () => {
        const response = await API.get(`${BLOG_API_URL}/stats`);
        return response.data;
    },

};

export default blogService;
