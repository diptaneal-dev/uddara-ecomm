import { useState } from "react";
import { createProduct } from "../../../services/PIMService";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({ name: "", category: "", description: "" });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await createProduct(productData);
      navigate(`/admin/productmgmt/products/view/${newProduct.productId}`); // Redirect to product details page
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="border p-3">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input type="text" name="category" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" className="form-control" onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Create Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
