import React from "react";
import { Button, Modal } from "react-bootstrap";

const DepartmentViewModel = ({
  showModal,
  setShowModal,
  selectedDepartment,
}) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>View Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedDepartment && (
          <>
            <p>ID: {selectedDepartment._id}</p>
            <p>Name: {selectedDepartment.name}</p>
            <p>Description: {selectedDepartment.description}</p>
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

export default DepartmentViewModel;
