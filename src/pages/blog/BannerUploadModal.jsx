import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes, FaUpload, FaTrash } from "react-icons/fa";

export default function BannerUploadModal({ isOpen, onClose, onUpload, position = { top: 0, left: 0 } }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Reset modal state when closed
    useEffect(() => {
        if (!isOpen) {
            setSelectedImage(null);
            setPreviewUrl(null);
        }
    }, [isOpen]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file)); // Show preview
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) return;
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", selectedImage);

        try {
            await onUpload(formData); // Calls function from parent to handle upload
            setPreviewUrl(null);
            setSelectedImage(null);
            onClose();
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="custom-modal-content"
            overlayClassName="custom-modal-overlay"
            style={{
                content: {
                    width: "260px",
                    position: "absolute",
                    top: `${position.top}px`, // Dynamic positioning
                    left: `${position.left}px`,
                    borderRadius: "10px",
                    backgroundColor: "#ffffff", // ✅ Ensures white background
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    padding: "15px",
                    zIndex: 1000, // Ensures it appears above everything
                },
            }}
        >
            {/* Close Button */}
            <button className="close-button btn btn-light" onClick={onClose} style={{ position: "absolute", top: "5px", right: "5px" }}>
                <FaTimes />
            </button>

            <h6 className="modal-title text-center mb-3">Upload Banner Image</h6>

            {previewUrl ? (
                <div className="image-preview text-center mb-3">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="rounded shadow-sm"
                        style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }}
                    />
                    <button
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() => {
                            setSelectedImage(null);
                            setPreviewUrl(null);
                        }}
                    >
                        <FaTrash /> Remove
                    </button>
                </div>
            ) : (
                <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleImageChange}
                    disabled={isUploading}
                />
            )}

            <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleUpload}
                disabled={!selectedImage || isUploading}
            >
                {isUploading ? "Uploading..." : <><FaUpload /> Upload</>}
            </button>
        </Modal>
    );
}
