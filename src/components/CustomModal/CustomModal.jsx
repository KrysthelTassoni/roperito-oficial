import { Modal, Button } from "react-bootstrap";
import React from "react";
import "./CustomModal.css";
import CustomButton from "../CustomButton/CustomButton";

export default function CustomModal({
  textHeader = null,
  children,
  showModal,
  closeModal,
  confirm = null,
  textButtonConfirm = null,
  textButtonCancel = "Cancelar",
  variant = "outline-primary",
  isLoading = false,
}) {
  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      centered
      contentClassName="custom-modal-content"
      backdropClassName="custom-modal-backdrop"
    >
      <Modal.Header className="custom-modal-header">
        <Modal.Title>{textHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">{children}</Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        {!isLoading && (
          <CustomButton
            title={textButtonCancel}
            onClick={closeModal}
            variant={variant}
            style="ms-2"
          />
        )}

        {confirm && (
          <CustomButton
            title={textButtonConfirm}
            variant="primary"
            onClick={confirm}
            style="ms-2"
          />
        )}
      </Modal.Footer>
    </Modal>
  );
}
