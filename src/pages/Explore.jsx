import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Explore = () => {
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">Explore</h2>
        <p className="text-center">Learn about the different products we offer and their benefits.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <img src="/images/explore-foxnuts.webp" className="card-img-top" alt="Foxnuts" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">Why Choose Foxnuts?</h5>
                <p className="card-text">Discover the health benefits and origins of foxnuts.</p>
                <Link to="/blog/foxnuts-benefits" className="btn btn-secondary">Read More</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <img src="/images/explore-spices.webp" className="card-img-top" alt="Spices" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">Exploring Exotic Spices</h5>
                <p className="card-text">A guide to the different spices and their uses.</p>
                <Link to="/blog/exotic-spices" className="btn btn-secondary">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
