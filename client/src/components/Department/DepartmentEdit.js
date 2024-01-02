import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { departmentService } from "../../_services/depatmentService";

const DepartmentEdit = ({ editModal, setEditModal, editData }) => {
  const [depatmentData, setDepartmentData] = useState([]);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setEditModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    departmentService
      .editDepartment(depatmentData, editData?._id)
      .then((res) => {
        if (res.Success === true) {
          setEditModal(false);
        } else {
          console.log(res.error);
        }
      });
  };

  const handleChange = (e, name) => {
    setDepartmentData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  useEffect(() => {
    setDepartmentData((prev) => ({
      ...prev,
      name: editData?.name,
      description: editData?.description,
    }));
  }, [editModal]);

  return (
    <Modal show={editModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>View Department</Modal.Title>
      </Modal.Header>
      <div className="container">
        <h2>Department Edit Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department name"
              onChange={(e) => handleChange(e, "name")}
              value={depatmentData.name}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department description"
              onChange={(e) => handleChange(e, "description")}
              value={depatmentData.description}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Edit Department
          </Button>{" "}
          &nbsp;
          <Button variant="primary" onClick={() => navigate("/departments")}>
            Cancel
          </Button>
        </Form>
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DepartmentEdit;
