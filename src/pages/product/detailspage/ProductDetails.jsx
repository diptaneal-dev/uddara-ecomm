import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { ReviewPage } from "../../../components/Reviews/ReviewPage";

import products from "../../../data/products";

import ProductCarousel from "./ProductCarousel";
import DeliverySection from "./DeliverySection";
import CompareProducts from "./CompareProducts";
import RelatedProducts from "./RelatedProducts";
import ShareDropdown from "../../../components/ShareDropdown/ShareDropdown";

import Modal from "react-modal";
import { FaChevronDown } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";

Modal.setAppElement("#root");

const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(amount);
};

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const [pinCode, setPinCode] = useState("");
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

    const calculateReviewStats = (reviews) => {
        const totalReviews = reviews.length;
        const avgRating = totalReviews ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : 0;
        const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
            star,
            count: reviews.filter(r => r.rating === star).length,
        }));
        return { avgRating, totalReviews, ratingDistribution };
    };

    const { avgRating, totalReviews, ratingDistribution } = calculateReviewStats(product.reviews || []);

    return (
        <div className={`container-fluid ms-1 product-details-page`} style={{ backgroundColor: "#FFF" }}>

            <div className="row mt-4">
                {/* 50% Width Section: Image & Share */}
                <div className="col-lg-5 col-md-5 col-sm-12 mt-5 d-flex">
                    {/* Image Container (95% of 50%) */}
                    <ProductCarousel product={product} />

                    {/* Share Button (5% of 50%) */}
                    <div className="col-lg-1 col-md-12 ">
                        <ShareDropdown
                            product={product}
                            shareContent={shareContent}
                            productUrl={productUrl}
                        />
                    </div>

                </div>

                {/* Product Details Section with Scrollable Content */}
                <div className="col-lg-4 col-md-4 col-sm-12 mt-5" style={{ maxHeight: "800px", overflowY: "auto"}}>
                    <div className="col-md-10">
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
                <div className="col-lg-3 col-md-4 col-sm-12 mt-5">
                    <DeliverySection
                        user={user}
                        pinCode={pinCode}
                        setPinCode={setPinCode}
                        product={product}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        addToCart={addToCart}
                        formatCurrency={formatCurrency}
                    />
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
            <RelatedProducts
                related={similarProducts}
                addToCart={addToCart}
                formatCurrency={formatCurrency}
            />


            {/* Product Comparison Section */}
            <CompareProducts
                products={similarProducts}
                addToCart={addToCart}
                formatCurrency={formatCurrency}
            />

            {/* Customer Reviews */}
            <div className="mt-5 p-3 bg-light rounded shadow-sm">
                <h3 className="mb-3">Latest Review Comments</h3>
                <ReviewPage reviews={product.reviews} />
            </div>

        </div>
    );
};

export default ProductDetailsPage;
