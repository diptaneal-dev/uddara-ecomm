import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products";
import { CartContext } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { ReviewPage } from "../../components/Reviews/ReviewPage";
import ProductCarousel from "./ProductCarousel";
import Modal from "react-modal";

import {
    FaShareAlt, FaFacebook, FaTwitter, FaWhatsapp, FaClipboard, FaEnvelope, FaLinkedin
} from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import "./productDetailsPage.css";

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
    const [user, setUser] = useState(null);
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const [pinCode, setPinCode] = useState("");
    const [showHistogram, setShowHistogram] = useState(false);
    const [showModal, setShowModal] = useState(false);

    console.log("Product Id is:", id);
    const product = products.find((p) => p.id === parseInt(id)) || null;

    const similarProducts = products.filter(
        (p) => p.category === product?.category && p.id !== product?.id
    );

    useEffect(() => {
        console.log("Products loaded:", product);
        if (product) {
            document.title = product.name;
        }
    }, [product]);

    if (!product) {
        return <div className="container mt-5 text-center">Product not found</div>;
    }

    const productUrl = `${window.location.origin}/product/${product.id}`;
    const shareContent = `${product.shareText} \n🛍️ Buy here: ${productUrl}`;

    // Web Share API for Mobile & Modern Browsers
    const shareProduct = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: shareContent,
                url: productUrl,
            })
                .then(() => console.log("Product shared successfully"))
                .catch((error) => console.error("Error sharing:", error));
        } else {
            navigator.clipboard.writeText(shareContent);
            alert("Product details copied! Share it on your favorite platform.");
        }
    };

    const calculateReviewStats = (reviews) => {
        const totalReviews = reviews.length;
        const avgRating = totalReviews ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : 0;
        const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
            star,
            count: reviews.filter(r => r.rating === star).length,
        }));
        return { avgRating, totalReviews, ratingDistribution };
    };

    // Copy to Clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(productUrl);
        alert("Product link copied!");
    };

    const { avgRating, totalReviews, ratingDistribution } = calculateReviewStats(product.reviews || []);

    return (
        <div className={`container-fluid mt-4 ms-1 product-details-page`} style={{ backgroundColor: "#FFF" }}>
            <div className="row">
                {/* 50% Width Section: Image & Share */}
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                    {/* Image Container (95% of 50%) */}
                    <ProductCarousel product={product} />

                    {/* Share Button (5% of 50%) */}
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
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={shareProduct}>
                                        <FaShareAlt size={16} className="me-2" /> Share Now
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={copyToClipboard}>
                                        <FaClipboard size={16} className="me-2" /> Copy Link
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={() => window.location.href = `mailto:?subject=Check out this product!&body=${shareContent}`}>
                                        <FaEnvelope size={16} className="me-2" /> Email
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${productUrl}`, '_blank')}>
                                        <FaFacebook size={16} className="me-2 text-primary" /> Facebook
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent)}`, '_blank')}>
                                        <FaTwitter size={16} className="me-2 text-info" /> Twitter
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareContent)}`, '_blank')}>
                                        <FaWhatsapp size={16} className="me-2 text-success" /> WhatsApp
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Product Details Section with Scrollable Content */}
                <div className="col-md-4 col-sm-12" style={{ maxHeight: "500px", overflowY: "auto" }}>

                    <div className="col-md-8">
                        <h2>{product.name}</h2>
                        <p><strong>Product SKU:</strong> {product.productSKU}</p>
                        <p className="text-muted mb-3">{product.description}</p>
                    </div>

                    <div>
                        <div className="mt-3">
                            <p className="fw-bold d-flex align-items-center flex-wrap">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className={index < Math.round(avgRating) ? "text-warning me-1" : "text-muted me-1"}>
                                        ⭐
                                    </span>
                                ))}
                                <span className="ms-2">{avgRating} ({totalReviews} ratings)</span>
                                <span className="ms-3" style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}>
                                    <FaChevronDown />
                                </span>
                            </p>
                        </div>

                        {/* Review Modal using React Modal */}
                        <Modal
                            isOpen={showModal}
                            onRequestClose={() => setShowModal(false)}
                            contentLabel="Rating Distribution"
                            className="modal-content-small"
                            overlayClassName="modal-overlay"
                        >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Rating Distribution</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {ratingDistribution.map(({ star, count }) => (
                                        <div key={star} className="d-flex align-items-center">
                                            <span className="me-2">{star} ⭐</span>
                                            <div className="progress w-100">
                                                <div
                                                    className="progress-bar bg-warning"
                                                    role="progressbar"
                                                    style={{ width: `${(count / totalReviews) * 100 || 0}%` }}
                                                >
                                                </div>
                                            </div>
                                            <span className="ms-2">({count})</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                </div>
                            </div>
                        </Modal>
                    </div>

                    {/* Price & Discount */}
                    <p className="d-flex align-items-center mb-3">
                        {product.oldPrice && (
                            <span className="text-muted text-decoration-line-through me-2">
                                {formatCurrency(product.oldPrice, product.currency)}
                            </span>
                        )}
                        <strong className="text-danger fs-4">{formatCurrency(product.price, product.currency)}</strong>
                        {product.discount && <span className="badge bg-success ms-2">-{product.discount}%</span>}
                    </p>

                    <p><strong>Stock:</strong> {product.stock > 0 ? <span className="text-success">In Stock</span> : <span className="text-danger">Out of Stock</span>}</p>
                    <p><strong>Minimum Order:</strong> {product.minOrderQty} {product.unitOfMeasurement}</p>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Size:</strong> {product.size}</p>
                    <p><strong>Use By:</strong> {product.useBy}</p>
                    <p><strong>Diet Type:</strong> {product.dietType}</p>
                    <p><strong>Speciality:</strong> {product.speciality?.join(", ")}</p>

                </div>


                {/* Delivery and Shipment Section */}
                <div className="col-md-2 border-start border-secondary ps-4">
                    <h5>Delivery & Shipment</h5>
                    {!user ? (
                        <div>
                            <p>Enter Pin Code to check delivery options:</p>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Enter Pin Code"
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary">Check</button>
                        </div>
                    ) : (
                        <p>Delivery options available for your location.</p>
                    )}

                    <p><strong>Stock Status:</strong> {product.stock > 0 ? <span className="text-success">In Stock</span> : <span className="text-danger">Out of Stock</span>}</p>

                    {/* Quantity Selector */}
                    <div className="mt-3">
                        <strong>Choose Quantity:</strong>
                        <div className="input-group w-100 mt-1">
                            <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <input type="text" className="form-control text-center" value={quantity} readOnly />
                            <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>

                    {/* Final Price & Add to Cart */}
                    <p className="mt-3"><strong>Final Price:</strong> {formatCurrency(product.price * quantity, product.currency)}</p>
                    <button className="btn btn-primary mt-2 w-100" onClick={() => addToCart(product, quantity)}>
                        Add to Cart
                    </button>

                </div>

            </div>

            <div className="mt-5">
                <h4>About This Product</h4>
                <ul>
                    {product.aboutThisItem?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Expandable Sections for More Details */}
            <div className="mt-5">
                <h4>Product Information</h4>
                <div className="accordion" id="productDetailsAccordion">
                    {/* Specifications */}
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#specifications">
                                Product Specifications
                            </button>
                        </h2>
                        <div id="specifications" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <ul>
                                    {product.specifications?.map((spec, index) => (
                                        <li key={index}>{spec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ingredients">
                                Ingredients
                            </button>
                        </h2>
                        <div id="ingredients" className="accordion-collapse collapse">
                            <div className="accordion-body">{product.ingredients || "N/A"}</div>
                        </div>
                    </div>

                    {/* Legal Disclaimer */}
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#legalDisclaimer">
                                Legal Disclaimer
                            </button>
                        </h2>
                        <div id="legalDisclaimer" className="accordion-collapse collapse">
                            <div className="accordion-body text-warning">{product.legalDisclaimer || "No disclaimer available."}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-5">
                <h4>Related Products</h4>
                <div className="d-flex overflow-auto gap-3 py-3">
                    {products.filter(p => p.category === product?.category && p.id !== product?.id).map((sp) => (
                        <div key={sp.id} className="card shadow-sm border rounded" style={{ width: "18rem" }}>
                            <img src={sp.image} className="card-img-top" alt={sp.name} style={{ height: "150px", objectFit: "cover" }} />
                            <div className="card-body">
                                <h6 className="card-title">{sp.name}</h6>
                                <p className="text-muted">{sp.description}</p>
                                <p>
                                    {sp.oldPrice && (
                                        <span className="text-muted text-decoration-line-through me-2">
                                            {formatCurrency(sp.oldPrice, sp.currency)}
                                        </span>
                                    )}
                                    <strong className="text-danger">{formatCurrency(sp.price, sp.currency)}</strong>
                                </p>
                                <button className="btn btn-outline-primary btn-sm w-100" onClick={() => addToCart(sp)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Comparison Section */}
            <div className="mt-5">
                <h4>Compare with Similar Items</h4>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                {similarProducts.map(sp => (
                                    <th key={sp.id}>{sp.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Image</td>
                                {similarProducts.map(sp => (
                                    <td key={sp.id} className="text-center">
                                        <img src={sp.image} alt={sp.name} className="img-fluid" style={{ maxHeight: "80px" }} />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Price</td>
                                {similarProducts.map(sp => (
                                    <td key={sp.id} className="text-danger">{formatCurrency(sp.price, sp.currency)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Stock</td>
                                {similarProducts.map(sp => (
                                    <td key={sp.id}>{sp.stock > 0 ? "In Stock" : "Out of Stock"}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Discount</td>
                                {similarProducts.map(sp => (
                                    <td key={sp.id}>{sp.discount ? `-${sp.discount}%` : "No Discount"}</td>
                                ))}
                            </tr>
                            <tr>
                                <td></td>
                                {similarProducts.map(sp => (
                                    <td key={sp.id}>
                                        <button className="btn btn-outline-primary btn-sm w-100" onClick={() => addToCart(sp)}>Add to Cart</button>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customer Reviews */}
            <div className="mt-5 p-3 bg-light rounded shadow-sm">
                <h3 className="mb-3">Latest Review Comments</h3>
                <ReviewPage reviews={product.reviews} />
            </div>

        </div>
    );
};

export default ProductDetailsPage;
