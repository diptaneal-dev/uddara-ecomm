import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../../services/PIMService";
import { Link } from "react-router-dom";

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p.productId !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={product.productId}>
            <div className="card">
              <img src={product.image || "https://via.placeholder.com/150"} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text"><strong>Category:</strong> {product.category}</p>
                <p className="card-text"><strong>SKU:</strong> {product.productSKU}</p>
                <div className="d-flex">
                  <Link to={`/admin/productmgmt/products/view/${product.productId}`} className="btn btn-primary me-2">View</Link>
                  <Link to={`/admin/productmgmt/products/edit/${product.productId}`} className="btn btn-warning me-2">Edit</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.productId)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
