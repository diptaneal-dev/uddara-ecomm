import { useEffect, useState } from "react";
import { getProductById, deleteProduct, getProductPricing } from "../../../services/PIMService";
import { useNavigate, useParams } from "react-router-dom";
import EditProductModal from "./EditProductModal";
import PricingModal from "./PricingModal";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [pricing, setPricing] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  // ✅ Fetch product details
  useEffect(() => {
    getProductById(id).then(setProduct);
    getProductPricing(id).then(setPricing);
  }, [id]);

  // ✅ Handle delete
  const handleDelete = async () => {
    await deleteProduct(id);
    navigate("/products/list");
  };

  // ✅ Refresh pricing after updating
  const handlePricingUpdate = () => {
    getProductPricing(id).then(setPricing);
    setShowPricingModal(false); // Close modal after update
  };

  if (!product) return <p>Loading...</p>;

  console.log("in ProductView Product is:", product.productId);
  console.log("Pricing details:", pricing);

  return (
    <div className="container mt-4">
      <div className="card">
        <img src={product.image || "https://via.placeholder.com/150"} className="card-img-top" alt={product.name} />
        <div className="card-body">
          <h2>{product.name}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>SKU:</strong> {product.productSKU}</p>

          {/* ✅ Pricing Information */}
          {pricing ? (
            <>
              <p><strong>Old Price (MRP):</strong> <s>₹{pricing.oldPrice}</s></p>
              <p><strong>Discount:</strong> {pricing.discount}%</p>
              <p><strong>Final Price:</strong> ₹{pricing.price}</p>
            </>
          ) : (
            <p><strong>Price:</strong> ₹{product.price}</p> // Fallback if pricing is not available
          )}

          <div className="d-flex mt-3">
            <button className="btn btn-warning me-2" onClick={() => setShowEditModal(true)}>Edit</button>
            <button className="btn btn-info me-2" onClick={() => setShowPricingModal(true)}>Update Pricing</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      <EditProductModal show={showEditModal} handleClose={() => setShowEditModal(false)} product={product} />

      {/* Pricing Modal - Pass Callback to Refresh Pricing */}
      <PricingModal show={showPricingModal} handleClose={handlePricingUpdate} productId={product?.productId} />
    </div>
  );
};

export default ProductView;
