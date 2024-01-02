import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { departmentService } from "../../_services/depatmentService";
import { useNavigate } from "react-router-dom";

const DepartmentForm = () => {
  const [depatmentData, setDepartmentData] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    departmentService.createDepartment(depatmentData).then((res) => {
      if (res.Success === true) {
        window.location.href = "/departments";
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

  return (
    <div className="container">
      <h2>Department Create Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department name"
            onChange={(e) => handleChange(e, "name")}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department description"
            onChange={(e) => handleChange(e, "description")}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Create Department
        </Button>{" "}
        &nbsp;
        <Button variant="primary" onClick={() => navigate("/departments")}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default DepartmentForm;
