import { useEffect, useState } from "react";
import { getProductStats } from "../../../services/PIMService";

const ProductDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getProductStats().then(setStats);
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Product Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Products</h5>
            <p className="h4">{stats.totalProducts}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Stock</h5>
            <p className="h4">{stats.totalStock}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Low Stock Products</h5>
            <p className="h4">{stats.lowStockProducts}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Average Price</h5>
            <p className="h4">₹{stats.averagePrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
