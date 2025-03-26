import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay } from "react-icons/fa";

const ProductCarousel = ({ product }) => {
    const [selectedMedia, setSelectedMedia] = useState(product?.images?.[0]); // Default to first media

    return (
        <div className="d-flex flex-lg-row flex-column align-items-center w-100">
            {/* Thumbnail Strip (Wider Width) */}
            <div className="d-flex flex-lg-column flex-row overflow-auto align-items-center"
                style={{
                    width: "90px", // Increase width slightly
                    maxWidth: "15%", // Ensure it doesn’t become too large
                    flexShrink: 0, // Prevent it from shrinking
                }}
            >
                {product.images.map((media, index) => (
                    <div 
                        key={index} 
                        className={`thumbnail-container ${selectedMedia === media ? "border-primary border-2" : "border"} rounded`}
                        onClick={() => setSelectedMedia(media)}
                        style={{
                            width: "85px", // Slightly wider thumbnails
                            height: "85px",
                            cursor: "pointer",
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexGrow: 1
                        }}
                    >
                        {media.endsWith(".mp4") ? (
                            <div className="position-relative w-100 h-100">
                                <video className="w-100 h-100 object-fit-cover">
                                    <source src={media} type="video/mp4" />
                                </video>
                                <div className="position-absolute top-50 start-50 translate-middle text-white bg-dark bg-opacity-50 p-1 rounded-circle">
                                    <FaPlay size={18} />
                                </div>
                            </div>
                        ) : (
                            <img src={media} className="w-100 h-100 object-fit-cover rounded" alt={`Thumbnail ${index}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Main Image/Video Display */}
            <div id="mainDisplay" className="text-center flex-grow-1">
                {selectedMedia.endsWith(".mp4") ? (
                    <video controls className="img-fluid rounded shadow w-100">
                        <source src={selectedMedia} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img src={selectedMedia} className="img-fluid rounded shadow w-100" alt="Product Preview" />
                )}
            </div>
        </div>
    );
};

export default ProductCarousel;
