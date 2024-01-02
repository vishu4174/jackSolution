import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { employeeService } from "../../_services/employeeService";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeViewModel from "./EmployeeViewModel";

const EmployeeList = () => {
  const [storeData, setStoreData] = useState([]);
  const [selectedEmployee, setSelectedDepartment] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [checkIsDelete, setCheckIsDelete] = useState(false);
  const checkIsManager = localStorage.getItem("role");

  const createEmployee = () => {
    if (checkIsManager == "user") {
      alert("You are not authorize person");
    } else {
      window.location.href = "/employees/create";
    }
  };

  useEffect(() => {
    employeeService.getAllEmployee().then((res) => {
      if (res.Success === true) {
        setStoreData(res.Data);
      } else {
        console.log(res.error);
      }
    });
  }, [editModal, checkIsDelete]);

  const handleView = (employee) => {
    setSelectedDepartment(employee);
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    if (checkIsManager == "user") {
      alert("You are not authorize person");
    } else {
      setEditData(employee);
      setEditModal(true);
    }
  };

  const handleDelete = (employee) => {
    if (checkIsManager == "user") {
      alert("You are not authorize person");
    } else {
      setCheckIsDelete(true);
      employeeService.deleteEmployee(employee._id).then((res) => {
        if (res.Success) {
          setCheckIsDelete(false);
          alert("record is delete");
        } else {
          setCheckIsDelete(false);
          console.log("something wrong");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employee List</h2>
        <Button variant="primary" onClick={createEmployee}>
          Create Employee
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {storeData.map((employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.location}</td>
              <td>
                <Button variant="info" onClick={() => handleView(employee)}>
                  View
                </Button>{" "}
                <Button variant="warning" onClick={() => handleEdit(employee)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(employee)}>
                  Delete
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* View Department Modal */}
      <EmployeeViewModel
        showModal={showModal}
        setShowModal={setShowModal}
        selectedEmployee={selectedEmployee}
      />
      {/* Edit Employee Modal */}
      <EmployeeEdit
        editModal={editModal}
        setEditModal={setEditModal}
        editData={editData}
      />
    </div>
  );
};

export default EmployeeList;
