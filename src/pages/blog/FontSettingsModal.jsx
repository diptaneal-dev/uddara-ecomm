import React from "react";
import Modal from "react-modal";

// Ensure accessibility for screen readers
Modal.setAppElement("#root");

export default function FontSettingsModal({ isOpen, onClose, applyFormatting }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose} // Allows closing by clicking outside or pressing ESC
            contentLabel="Font Settings"
            className="custom-modal"
            overlayClassName="custom-modal-overlay"
        >
            <div className="modal-header">
                <h6 className="modal-title fw-bold">Font Settings</h6>
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body d-flex justify-content-between gap-2">
                {/* Font Family Selection */}
                <div className="w-50">
                    <label className="form-label small">Font</label>
                    <select className="form-select form-select-sm" onChange={(e) => applyFormatting("fontName", e.target.value)}>
                        <option value="">Default</option>
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        <option value="Comic Sans MS">Comic Sans MS</option>
                        <option value="Impact">Impact</option>
                    </select>
                </div>

                {/* Font Size Selection */}
                <div className="w-50">
                    <label className="form-label small">Size</label>
                    <select className="form-select form-select-sm" onChange={(e) => applyFormatting("fontSize", e.target.value)}>
                        <option value="">Default</option>
                        <option value="1">Small</option>
                        <option value="3">Normal</option>
                        <option value="5">Large</option>
                        <option value="7">Extra Large</option>
                    </select>
                </div>
            </div>
            <div className="modal-footer border-0 pt-2">
                <button type="button" className="btn btn-sm btn-secondary w-100" onClick={onClose}>
                    Close
                </button>
            </div>
        </Modal>
    );
}
