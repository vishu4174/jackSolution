import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { employeeService } from "../../_services/employeeService";

const EmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    employeeService.createEmployee(employeeData).then((res) => {
      if (res.Success === true) {
        window.location.href = "/employees";
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

  return (
    <div className="container">
      <h2>Employee Create Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => handleChange(e, "name")}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Location"
            onChange={(e) => handleChange(e, "location")}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Create Employee
        </Button>{" "}
        &nbsp;
        <Button variant="primary" onClick={() => navigate("/employees")}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EmployeeForm;
