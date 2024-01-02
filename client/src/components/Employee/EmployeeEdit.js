import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { employeeService } from "../../_services/employeeService";

const EmployeeEdit = ({ editModal, setEditModal, editData }) => {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setEditModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    employeeService.editEmployee(employeeData, editData?._id).then((res) => {
      if (res.Success === true) {
        setEditModal(false);
      } else {
        console.log(res.error);
      }
    });
  };

  const handleChange = (e, name) => {
    setEmployeeData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  useEffect(() => {
    setEmployeeData((prev) => ({
      ...prev,
      name: editData?.name,
      location: editData?.location,
    }));
  }, [editModal]);

  return (
    <Modal show={editModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>View Employee</Modal.Title>
      </Modal.Header>
      <div className="container">
        <h2>Employee Edit Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter employee name"
              onChange={(e) => handleChange(e, "name")}
              value={employeeData.name}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter employee location"
              onChange={(e) => handleChange(e, "location")}
              value={employeeData.location}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Edit Employee
          </Button>{" "}
          &nbsp;
          <Button variant="primary" onClick={() => navigate("/employees")}>
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

export default EmployeeEdit;
