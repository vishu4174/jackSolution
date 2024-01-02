import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/departments">Employee Management</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/departments">
          Departments
        </Nav.Link>
        <Nav.Link as={Link} to="/employees">
          Employees
        </Nav.Link>
        <Nav.Link as={Link} to="/filter">
          Employee Filter
        </Nav.Link>
      </Nav>
      <Nav>
        <Button variant="primary" onClick={logout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
