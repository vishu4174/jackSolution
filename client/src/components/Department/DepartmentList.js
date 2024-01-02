import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { departmentService } from "../../_services/depatmentService";
import DepartmentViewModel from "./DepartmentViewModel";
import DepartmentEdit from "./DepartmentEdit";

const DepartmentList = () => {
  const [storeData, setStoreData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [checkIsDelete, setCheckIsDelete] = useState(false);
  const checkIsManager = localStorage.getItem("role");

  useEffect(() => {
    departmentService.getAllDepartment().then((res) => {
      if (res.Success === true) {
        setStoreData(res.Data);
      } else {
        console.log(res.error);
      }
    });
  }, [editModal, checkIsDelete]);

  const handleView = (department) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  const handleEdit = (department) => {
    if (checkIsManager == "user") {
      alert("You are not authorize person");
    } else {
      setEditData(department);
      setEditModal(true);
    }
  };

  const handleDelete = (department) => {
    if (checkIsManager == "user") {
      alert("You are not authorize person");
    } else {
      setCheckIsDelete(true);
      departmentService.deleteDepartment(department._id).then((res) => {
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

  const createDepartment = () => {
    if (checkIsManager == "user") {
      alert("You are not authorize person");
    } else {
      window.location.href = "/departments/create";
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Department List</h2>
        <Button variant="primary" onClick={createDepartment}>
          Create Department
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storeData.map((department, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{department.name}</td>
              <td>{department.description}</td>
              <td>
                <Button variant="info" onClick={() => handleView(department)}>
                  View
                </Button>{" "}
                <Button
                  variant="warning"
                  onClick={() => handleEdit(department)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(department)}
                >
                  Delete
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* View Department Modal */}
      <DepartmentViewModel
        showModal={showModal}
        setShowModal={setShowModal}
        selectedDepartment={selectedDepartment}
      />
      {/* Edit Department Modal */}
      <DepartmentEdit
        editModal={editModal}
        setEditModal={setEditModal}
        editData={editData}
      />
    </div>
  );
};

export default DepartmentList;
