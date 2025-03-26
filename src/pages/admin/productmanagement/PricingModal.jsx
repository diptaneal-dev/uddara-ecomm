import { useState, useEffect } from "react";
import { getProductPricing, enrichProductPricing, getTaxCategories } from "../../../services/PIMService";

const PricingModal = ({ show, handleClose, productId }) => {
  const todayDate = new Date().toISOString().split("T")[0]; // Default validFrom to today

  const [pricingData, setPricingData] = useState({
    productId: productId || null, // Ensure productId is set
    currency: "INR",
    basePrice: 0,  
    oldPrice: 0,
    price: 0,
    discount: 0,
    wholesalePrice: 0,
    unitOfMeasurement: "piece",
    minOrderQty: 1,
    taxCategoryId: "",  
    validFrom: todayDate, // Default to today
    validUntil: "", // Optional
    updatedBy: "admin@example.com"
  });

  const [taxCategories, setTaxCategories] = useState([]);

  useEffect(() => {
    if (productId) {
      getProductPricing(productId).then((data) => {
        if (data) {
          setPricingData((prev) => ({
            ...prev,
            ...data,
            validFrom: data.validFrom || todayDate, // ✅ Keep existing value or set to today
          }));
        } else {
          console.warn("No pricing data found. Initializing with default values.");
        }
      });

      getTaxCategories().then(setTaxCategories);
    }
  }, [productId]);

  useEffect(() => {
    if (pricingData.discount && pricingData.oldPrice) {
      const discountedPrice = pricingData.oldPrice - (pricingData.oldPrice * pricingData.discount) / 100;
      setPricingData((prev) => ({ ...prev, price: discountedPrice.toFixed(2) }));
    }
  }, [pricingData.discount, pricingData.oldPrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPricingData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : value, // ✅ Prevent issues with empty strings
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!pricingData.productId) {
      console.error("Error: Product ID is missing in the payload.");
      alert("Product ID is required.");
      return;
    }
  
    try {
      await enrichProductPricing(pricingData);
      handleClose(); // ✅ Ensure modal closes after update
    } catch (error) {
      alert("Failed to update pricing. Please try again.");
    }
  };
  

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Pricing</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Currency Selector */}
              <div className="mb-3">
                <label>Currency</label>
                <select name="currency" className="form-control" value={pricingData.currency} onChange={handleChange}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              {/* Base Price */}
              <div className="mb-3">
                <label>Base Price</label>
                <input
                  type="number"
                  name="basePrice"
                  className="form-control"
                  value={pricingData.basePrice}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Old Price (MRP) */}
              <div className="mb-3">
                <label>Old Price (MRP)</label>
                <input
                  type="number"
                  name="oldPrice"
                  className="form-control"
                  value={pricingData.oldPrice}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Discount */}
              <div className="mb-3">
                <label>Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  className="form-control"
                  value={pricingData.discount}
                  onChange={handleChange}
                />
              </div>

              {/* Auto-calculated Final Price */}
              <div className="mb-3">
                <label>Final Price (After Discount)</label>
                <input type="number" className="form-control" value={pricingData.price} readOnly />
              </div>

              {/* Tax Category Selection */}
              <div className="mb-3">
                <label>Tax Category</label>
                <select name="taxCategoryId" className="form-control" value={pricingData.taxCategoryId} onChange={handleChange}>
                  <option value="">Select Tax Category</option>
                  {taxCategories.length > 0 ? (
                    taxCategories.map((tax) => (
                      <option key={tax.taxCategoryId} value={tax.taxCategoryId}>
                        {tax.categoryName} - {tax.gstRate}%
                      </option>
                    ))
                  ) : (
                    <option disabled>No Tax Categories Found</option>
                  )}
                </select>
              </div>

              {/* Minimum Order Quantity */}
              <div className="mb-3">
                <label>Minimum Order Quantity</label>
                <input
                  type="number"
                  name="minOrderQty"
                  className="form-control"
                  value={pricingData.minOrderQty}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price Valid From */}
              <div className="mb-3">
                <label>Price Valid From</label>
                <input
                  type="date"
                  name="validFrom"
                  className="form-control"
                  value={pricingData.validFrom}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price Valid Until */}
              <div className="mb-3">
                <label>Price Valid Until (Optional)</label>
                <input
                  type="date"
                  name="validUntil"
                  className="form-control"
                  value={pricingData.validUntil}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">Update Pricing</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
