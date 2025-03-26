import React, { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { useUserContext } from "../../hooks/UserContext";
import { useFavorites } from "../../components/FavouriteButton/FavouriteContext";
import FavoriteButton from "../../components/FavouriteButton/FavouriteButton";
import Slider from "react-slick";
import products from "../../data/products";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./productCarouselSection.css"; // Moved styles to a separate CSS file

const CustomPrevArrow = ({ onClick }) => (
    <button onClick={onClick} className="custom-arrow custom-prev btn btn-dark" aria-label="Previous slide">
        <FaArrowLeft />
    </button>
);

const CustomNextArrow = ({ onClick }) => (
    <button onClick={onClick} className="custom-arrow custom-next btn btn-dark" aria-label="Next slide">
        <FaArrowRight />
    </button>
);

const ProductCarouselSection = () => {
    const [selectedProduct, setSelectedProduct] = useState(products[0] || {});
    const navigate = useNavigate();
    const { isAuthenticated } = useUserContext();
    const { addToCart } = useContext(CartContext);
    const { favorites } = useFavorites();

    const handleBeforeChange = useCallback((_, next) => {
        setSelectedProduct(products[next]);
    }, []);

    const settings = {
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        beforeChange: handleBeforeChange,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    if (!products || products.length === 0) return <p>No products available</p>;

    return (
        <>
            <section className="product-carousel-section py-4 bg-light">
                <div className="container">
                    <div className="carousel-container p-4 bg-white shadow rounded">
                        <Slider {...settings}>
                            {products.map((product) => (
                                <div key={product.id} className="px-3">
                                    <div className="card product-card border-0 shadow-lg text-center"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                        style={{ cursor: "pointer" }}>
                                        <img
                                            src={product.images?.[0] || product.image || "/placeholder.jpg"}
                                            alt={product.name}
                                            className="card-img-top img-fluid rounded-top"
                                            loading="lazy"
                                        />

                                        <div className="card-body p-2">
                                            {/* First Row: Brand & Favorite Icon */}
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="product-brand text-muted small-text">{product.brand}</span>
                                                <div onClick={(e) => e.stopPropagation()}> {/* ✅ Prevents card click from triggering */}
                                                    <FavoriteButton item={product} />
                                                </div>
                                            </div>

                                            {/* Second Row: Product Name */}
                                            <h4 className="product-name text-start product-title">{product.name}</h4>

                                            {/* Third Row: Price Section - Old Price, New Price & Savings */}
                                            <div className="d-flex align-items-center price-section mt-1">
                                                {product.oldPrice && (
                                                    <span className="old-price text-muted text-decoration-line-through me-2">
                                                        ₹{product.oldPrice?.toFixed(2) ?? "0.00"}
                                                    </span>
                                                )}
                                                <span className="new-price text-danger fw-bold me-2">
                                                    ₹{product.price?.toFixed(2) ?? "0.00"}
                                                </span>
                                                {product.oldPrice && product.price && (
                                                    <span className="savings badge bg-success ms-2">
                                                        Save ₹{((product.oldPrice - product.price) || 0).toFixed(2)}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Fourth Row: Ratings Section (Inside a Box with a Single Star) */}
                                            <div className="rating-box mt-2">
                                                <FaStar className="text-warning" />
                                                <span className="rating-score">
                                                    {Number(product.rating ?? 0).toFixed(1)} ({product.reviews?.length ?? 0})
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            <section className="selected-product-details py-5 bg-white">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 text-center">
                            <img
                                src={selectedProduct.images?.[0] || selectedProduct.image || "/placeholder.jpg"}
                                alt={selectedProduct.name}
                                className="img-fluid rounded shadow-lg"
                                loading="lazy"
                            />
                        </div>
                        <div className="col-md-7 mt-4 mt-md-0 product-info">
                            <h3 className="fw-bold">{selectedProduct.name ?? "Product Name"}</h3>

                            <p className="text-danger fs-4 fw-bold">
                                {selectedProduct.currency ?? "INR"} {selectedProduct.price?.toFixed(2) ?? "0.00"}
                            </p>

                            <p className="text-muted">{selectedProduct.description ?? "No description available."}</p>

                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>Brand:</strong> {selectedProduct.brand ?? "N/A"}
                                </li>
                                <li className="list-group-item">
                                    <strong>Category:</strong> {selectedProduct.category ?? "N/A"}
                                </li>
                                <li className="list-group-item">
                                    <strong>Stock:</strong>
                                    {selectedProduct.stock > 0 ? (
                                        <span className="text-success fw-bold ms-2">In Stock</span>
                                    ) : (
                                        <span className="text-danger fw-bold ms-2">Out of Stock</span>
                                    )}
                                </li>
                                <li className="list-group-item">
                                    <strong>Use By:</strong> {selectedProduct.useBy ?? "N/A"}
                                </li>
                            </ul>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <button className="btn btn-outline-dark" onClick={() => navigate(`/product/${selectedProduct.id}`)}>
                                    Know More
                                </button>
                                <button className="btn btn-primary" onClick={() => addToCart(selectedProduct)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductCarouselSection;
