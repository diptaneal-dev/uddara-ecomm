import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategories = () => {
  return (
    <section className="product-categories text-center w-100 py-3 px-0">
      <h2>Shop by Category</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <img src="/images/packaged-foxnuts.webp" className="card-img-top" alt="Foxnuts" />
            <div className="card-body">
              <h5 className="card-title">Foxnuts</h5>
              <Link to="/explore" className="btn btn-primary">Explore</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src="/images/dry-fruits.webp" className="card-img-top" alt="Dry Fruits" />
            <div className="card-body">
              <h5 className="card-title">Dry Fruits</h5>
              <Link to="/category/dry-fruits" className="btn btn-outline-primary">Coming Soon</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src="/images/spices-assortment.webp" className="card-img-top" alt="Spices" />
            <div className="card-body">
              <h5 className="card-title">Spices</h5>
              <Link to="/category/spices" className="btn btn-outline-primary">Coming Soon</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
