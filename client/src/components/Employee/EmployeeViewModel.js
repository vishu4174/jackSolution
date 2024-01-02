import React from "react";
import { Button, Modal } from "react-bootstrap";

const EmployeeViewModel = ({ showModal, setShowModal, selectedEmployee }) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>View Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedEmployee && (
          <>
            <p>ID: {selectedEmployee._id}</p>
            <p>Name: {selectedEmployee.name}</p>
            <p>Location: {selectedEmployee.location}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeViewModel;
