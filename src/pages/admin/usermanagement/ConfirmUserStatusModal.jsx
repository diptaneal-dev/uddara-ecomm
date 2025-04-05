// components/UserModals/ConfirmUserStatusModal.jsx
import React from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { Button } from '../../../components/Button/Button';
import { FormGrid, FormGroup, Label } from '../../../components/Modal/FormGrid.styles';

export const ConfirmUserStatusModal = ({ user, onClose, onConfirm }) => {
  if (!user) return null;

  const isDeactivating = user.active;
  const actionLabel = isDeactivating ? 'Deactivate' : 'Reactivate';

  return (
    <Modal
      open={!!user}
      onClose={onClose}
      title={`${actionLabel} User`}
      footer={
        <>
          <Button $variant="secondary" $outline onClick={onClose}>
            Cancel
          </Button>
          <Button $variant="primary" onClick={() => { onConfirm(user); onClose(); }}>
            Confirm
          </Button>
        </>
      }
    >
      <FormGrid>
        <FormGroup style={{ gridColumn: '1 / -1' }}>
          <Label>Confirmation</Label>
          <p className="text-sm text-gray-700">
            Are you sure you want to{' '}
            <strong>{actionLabel.toLowerCase()}</strong>{' '}
            <strong>{user.firstName} {user.lastName}</strong>?
          </p>
        </FormGroup>
      </FormGrid>
    </Modal>
  );
};
