import { Link } from "react-router-dom";

const ProductSidebar = () => {
  return (
    <div className="d-flex flex-column bg-dark text-white p-3" style={{ height: "100vh", width: "250px" }}>
      <h4 className="mb-4">PIM System</h4>
      <Link to="/admin/products/new" className="btn btn-outline-light mb-2">➕ Create Product</Link>
      <Link to="/admin/products/list" className="btn btn-outline-light mb-2">📦 Product List</Link>
      <Link to="/admin/pricing" className="btn btn-outline-light mb-2">💰 Pricing & Discounts</Link>
    </div>
  );
};

export default ProductSidebar;

