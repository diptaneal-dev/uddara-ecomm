import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../../../services/PIMService";
import { useParams } from "react-router-dom";

const Pricing = () => {
  const { id } = useParams();
  const [pricing, setPricing] = useState({ price: "", discount: "" });

  useEffect(() => {
    getProductById(id).then((product) => {
      setPricing({ price: product.price, discount: product.discount });
    });
  }, [id]);

  const handleChange = (e) => {
    setPricing({ ...pricing, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, pricing);
    alert("Pricing updated!");
  };

  return (
    <div className="container mt-4">
      <h2>Manage Pricing</h2>
      <form onSubmit={handleSubmit} className="border p-3">
        <div className="mb-3">
          <label>Price</label>
          <input type="number" name="price" className="form-control" value={pricing.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Discount (%)</label>
          <input type="number" name="discount" className="form-control" value={pricing.discount} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Pricing</button>
      </form>
    </div>
  );
};

export default Pricing;
