import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { employeeService } from "../../_services/employeeService";

const EmployeeFilter = () => {
  const [location, setLocation] = useState("");
  const [order, setOrder] = useState("Ascending");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    employeeService.filterEmployee({ location, order }).then((res) => {
      if (res.Success === true) {
        setFilteredEmployees(res.Data);
      } else {
        console.error(res.data.error);
      }
    });
  };

  return (
    <div className="container">
      <h2>Employee Filter</h2>
      <Form onSubmit={handleFilterSubmit}>
        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formOrder">
          <Form.Label>Order</Form.Label>
          <Form.Control
            as="select"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option>Ascending</option>
            <option>Descending</option>
          </Form.Control>
        </Form.Group>
        <br />

        <Button variant="primary" type="submit">
          Filter Employees
        </Button>
      </Form>
      <br />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.location}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeFilter;
