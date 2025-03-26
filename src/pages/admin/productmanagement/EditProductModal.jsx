import { useState } from "react";
import { updateProduct } from "../../../services/PIMService";

const EditProductModal = ({ show, handleClose, product }) => {
  const [productData, setProductData] = useState({ ...product });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(product.productId, productData);
    handleClose();
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <input type="text" name="name" className="form-control" value={productData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Category</label>
                <input type="text" name="category" className="form-control" value={productData.category} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
