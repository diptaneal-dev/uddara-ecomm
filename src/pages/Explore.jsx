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
          <div className="card mt-5 mb-5">
            <img
              src="/images/whyfoxnut.png"
              className="card-img-top"
              alt="Foxnuts"
              style={{
                width: '100%',
                maxHeight: '360px',
                objectFit: 'cover'
              }}
            />
            <div className="card-body">
              <h5 className="card-title">Why Choose Foxnuts?</h5>
              <p className="card-text">Discover the health benefits and origins of foxnuts.</p>
              <Link to="/blog/foxnut-benefits" className="btn btn-secondary">Read More</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mt-5 mb-5">
            <img
              src="/images/whymillets.png"
              className="card-img-top"
              alt="Spices"
              style={{
                width: '100%',
                maxHeight: '360px',
                objectFit: 'cover',
                objectPosition: 'top'
              }}
            />
            <div className="card-body">
              <h5 className="card-title">Exploring Millets</h5>
              <p className="card-text">A refreshing and energetic morning as never before.</p>
              <Link to="/blog/millet-benefits" className="btn btn-secondary">Read More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
