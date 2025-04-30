// ProductDetailsPage.jsx (Refactored)
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products";
import { CartContext } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { ReviewPage } from "../../components/Reviews/ReviewPage";
import ProductCarousel from "./ProductCarousel";
import Modal from "react-modal";
import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaClipboard,
  FaEnvelope,
  FaLinkedin,
  FaChevronDown
} from "react-icons/fa";
import {
  Container,
  SectionTitle,
  ProductInfoWrapper,
  PriceWrapper,
  ModalContent,
  RatingBar,
  DeliveryBox,
  RelatedProductCard,
  QuantityControl,
  ProductComparisonTable
} from "./ProductDetailsPage.styles";

Modal.setAppElement("#root");

const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const ProductDetailsPage = () => {
  const { darkMode } = useTheme();
  const { id } = useParams();
  const [user] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const product = products.find((p) => p.id === parseInt(id)) || null;
  const similarProducts = products.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  );

  useEffect(() => {
    if (product) document.title = product.name;
  }, [product]);

  if (!product) return <div className="container mt-5 text-center">Product not found</div>;

  const productUrl = `${window.location.origin}/product/${product.id}`;
  const shareContent = `${product.shareText} \n🛍️ Buy here: ${productUrl}`;

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, text: shareContent, url: productUrl });
    } else {
      navigator.clipboard.writeText(shareContent);
      alert("Product details copied! Share it on your favorite platform.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(productUrl);
    alert("Product link copied!");
  };

  const calculateReviewStats = (reviews) => {
    const total = reviews.length;
    const avg = total ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : 0;
    const dist = [5, 4, 3, 2, 1].map(star => ({ star, count: reviews.filter(r => r.rating === star).length }));
    return { avgRating: avg, totalReviews: total, ratingDistribution: dist };
  };

  const { avgRating, totalReviews, ratingDistribution } = calculateReviewStats(product.reviews || []);

  return (
    <Container className="product-details-page">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
          <ProductCarousel product={product} />
          <div className="w-5 d-flex justify-content-center align-items-start">
            <div className="dropdown mt-2">
              <div
                className={`d-flex align-items-center justify-content-center dropdown-toggle p-2 rounded-circle shadow ${darkMode ? "bg-secondary text-light" : "bg-light text-dark"}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer", width: "42px", height: "42px" }}
              >
                <FaShareAlt size={20} />
              </div>
              <ul className={`dropdown-menu dropdown-menu-end p-2 shadow ${darkMode ? "bg-dark text-light border-light" : "bg-light text-dark border-dark"}`}>
                <li><button className="dropdown-item" onClick={shareProduct}><FaShareAlt size={16} className="me-2" /> Share Now</button></li>
                <li><button className="dropdown-item" onClick={copyToClipboard}><FaClipboard size={16} className="me-2" /> Copy Link</button></li>
                <li><button className="dropdown-item" onClick={() => window.location.href = `mailto:?subject=Check this out&body=${shareContent}`}><FaEnvelope size={16} className="me-2" /> Email</button></li>
                <li><button className="dropdown-item" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${productUrl}`, '_blank')}><FaFacebook size={16} className="me-2 text-primary" /> Facebook</button></li>
                <li><button className="dropdown-item" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent)}`, '_blank')}><FaTwitter size={16} className="me-2 text-info" /> Twitter</button></li>
                <li><button className="dropdown-item" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareContent)}`, '_blank')}><FaWhatsapp size={16} className="me-2 text-success" /> WhatsApp</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-12">
          <ProductInfoWrapper>
            <h2>{product.name}</h2>
            <p><strong>Product SKU:</strong> {product.productSKU}</p>
            <p className="text-muted mb-3">{product.description}</p>
            <p className="fw-bold d-flex align-items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(avgRating) ? "text-warning me-1" : "text-muted me-1"}>⭐</span>
              ))}
              <span className="ms-2">{avgRating} ({totalReviews} ratings)</span>
              <span className="ms-3" style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}><FaChevronDown /></span>
            </p>
            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} className="modal-content-small" overlayClassName="modal-overlay">
              <ModalContent>
                <div className="modal-header"><h5 className="modal-title">Rating Distribution</h5><button type="button" className="btn-close" onClick={() => setShowModal(false)} /></div>
                <div className="modal-body">
                  {ratingDistribution.map(({ star, count }) => (
                    <RatingBar key={star}>
                      <span>{star} ⭐</span>
                      <div className="progress w-100">
                        <div className="progress-bar bg-warning" style={{ width: `${(count / totalReviews) * 100 || 0}%` }}></div>
                      </div>
                      <span>({count})</span>
                    </RatingBar>
                  ))}
                </div>
              </ModalContent>
            </Modal>

            <PriceWrapper>
              {product.oldPrice && <span className="old-price">{formatCurrency(product.oldPrice, product.currency)}</span>}
              <span className="current-price">{formatCurrency(product.price, product.currency)}</span>
              {product.discount && <span className="discount">-{product.discount}%</span>}
            </PriceWrapper>

            <p><strong>Stock:</strong> {product.stock > 0 ? <span className="text-success">In Stock</span> : <span className="text-danger">Out of Stock</span>}</p>
            <p><strong>Minimum Order:</strong> {product.minOrderQty} {product.unitOfMeasurement}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Use By:</strong> {product.useBy}</p>
            <p><strong>Diet Type:</strong> {product.dietType}</p>
            <p><strong>Speciality:</strong> {product.speciality?.join(", ")}</p>
          </ProductInfoWrapper>
        </div>

        <div className="col-md-2">
          <DeliveryBox>
            <h5>Delivery & Shipment</h5>
            {!user ? (
              <div>
                <p>Enter Pin Code to check delivery options:</p>
                <input type="text" className="form-control mb-2" placeholder="Enter Pin Code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                <button className="btn btn-outline-secondary">Check</button>
              </div>
            ) : (
              <p>Delivery options available for your location.</p>
            )}

            <p><strong>Stock Status:</strong> {product.stock > 0 ? <span className="text-success">In Stock</span> : <span className="text-danger">Out of Stock</span>}</p>

            <QuantityControl>
              <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input type="text" className="form-control" value={quantity} readOnly />
              <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</button>
            </QuantityControl>

            <p className="mt-3"><strong>Final Price:</strong> {formatCurrency(product.price * quantity, product.currency)}</p>
            <button className="btn btn-primary mt-2 w-100" onClick={() => addToCart(product, quantity)}>Add to Cart</button>
          </DeliveryBox>
        </div>
      </div>

      <SectionTitle>About This Product</SectionTitle>
      <ul>
        {product.aboutThisItem?.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <SectionTitle>Compare with Similar Items</SectionTitle>
      <div className="table-responsive">
        <ProductComparisonTable className="table table-bordered">
          <thead>
            <tr><th>Feature</th>{similarProducts.map(sp => <th key={sp.id}>{sp.name}</th>)}</tr>
          </thead>
          <tbody>
            <tr><td>Image</td>{similarProducts.map(sp => <td key={sp.id}><img src={sp.image} alt={sp.name} /></td>)}</tr>
            <tr><td>Price</td>{similarProducts.map(sp => <td key={sp.id} className="text-danger">{formatCurrency(sp.price, sp.currency)}</td>)}</tr>
            <tr><td>Stock</td>{similarProducts.map(sp => <td key={sp.id}>{sp.stock > 0 ? "In Stock" : "Out of Stock"}</td>)}</tr>
            <tr><td>Discount</td>{similarProducts.map(sp => <td key={sp.id}>{sp.discount ? `-${sp.discount}%` : "No Discount"}</td>)}</tr>
            <tr><td></td>{similarProducts.map(sp => <td key={sp.id}><button className="btn btn-outline-primary btn-sm w-100" onClick={() => addToCart(sp)}>Add to Cart</button></td>)}</tr>
          </tbody>
        </ProductComparisonTable>
      </div>

      <SectionTitle>Latest Review Comments</SectionTitle>
      <div className="bg-light rounded shadow-sm p-3">
        <ReviewPage reviews={product.reviews} />
      </div>
    </Container>
  );
};

export default ProductDetailsPage;