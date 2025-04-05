import React, { useEffect } from "react";
import PropTypes from "prop-types";
import StoreCard from "./StoreCard";
import { Button } from "../../../components/Button/Button";

import {
  ModalOverlay,
  ModalDialog,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  NoStoresText
} from "./StoreListModal.styles";

export default function StoreListModal({ stores, onClose, onEdit, onDelete, onView }) {

  // 🔐 Escape key listener
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);


  return (
    <ModalOverlay className="modal fade show d-block" tabIndex="-1" onClick={onClose}>
      <ModalDialog className="modal-dialog modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
        <ModalContent className="modal-content">
          <ModalHeader className="modal-header">
            <ModalTitle className="modal-title">Stores in this Group</ModalTitle>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </ModalHeader>

          <ModalBody className="modal-body">
            {stores.length === 0 ? (
              <NoStoresText>No stores available in this group.</NoStoresText>
            ) : (
              <div className="row">
                {stores.map((store) => (
                  <div key={store.id} className="col-12 col-sm-6 col-md-4 mb-4">
                    <StoreCard
                      store={store}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onView={onView}
                    />
                  </div>
                ))}
              </div>
            )}
          </ModalBody>

          <ModalFooter className="modal-footer">
            <Button $size="sm" $variant="secondary" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalDialog>
    </ModalOverlay>
  );
}

StoreListModal.propTypes = {
  stores: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};
