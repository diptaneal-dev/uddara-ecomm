// blogServiceAdapter.js
import blogService from './BlogService';

export const blogServiceAdapter = {
  // Map expected methods to yours
  getBlogs: blogService.getAllBlogs,
  getBlogById: blogService.getBlogById,
  createBlog: blogService.createDraftBlog,
  updateBlog: blogService.updateBlog,
  deleteBlog: blogService.deleteBlog,

  // Optional: react-vector calls these if image uploads are enabled
  getLatestDraftBlog: blogService.getLatestDraftBlog,
  uploadImage: async (formData) => {
    const result = await blogService.uploadImage(formData);
    return { imageUrl: result.imageUrl }; // match react-vector's return format
  },
  uploadCoverImage: async (id, formData) => {
    const result = await blogService.uploadCoverImage(id, formData);
    return { coverImageUrl: result.coverImageUrl };
  },
  uploadBannerImage: async (id, formData) => {
    const result = await blogService.uploadBannerImage(id, formData);
    return { bannerImageUrl: result.bannerImageUrl };
  },
};
