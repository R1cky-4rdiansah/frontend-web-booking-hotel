import React from "react";
import propTypes from "prop-types";
import { Modal } from "react-bootstrap";

export default function ModalBS({
  headerTitle,
  footer,
  children,
  size,
  footerChildren,
  setShowModal,
  show,
}) {
  return (
    <Modal
      show={show}
      onHide={() => setShowModal(false)}
      backdrop="static"
      keyboard={false}
      size={size}
      animation
      centered
    >
      <Modal.Header className="p-3" closeButton>
        <Modal.Title>
          <h1 className="modal-title fs-3" id="exampleModalLabel">
            {headerTitle}
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer && (
        <Modal.Footer>
          {footerChildren}
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

ModalBS.propTypes = {
  id: propTypes.string.isRequired,
  headerTitle: propTypes.string,
  footer: propTypes.bool,
  size: propTypes.string,
};
