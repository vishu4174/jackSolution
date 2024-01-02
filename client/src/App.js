import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignupForm from "./components/auth/SignupForm";
import DepartmentList from "./components/Department/DepartmentList";
import DepartmentForm from "./components/Department/DepartmentForm";
import EmployeeList from "./components/Employee/EmployeeList";
import EmployeeFilter from "./components/Employee/EmployeeFilter";
import NavbarComponent from "./components/Layout/Navbar";
import LoginForm from "./components/auth/LoginForm.js";
import EmployeeForm from "./components/Employee/EmployeeForm.js";

const App = () => {
  const checkToken = localStorage.getItem("token");
  return (
    <Router>
      <div>
        {checkToken ? (
          <>
            <NavbarComponent />
            <Routes>
              <Route path="/departments" element={<DepartmentList />} />
              <Route path="/departments/create" element={<DepartmentForm />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/employees/create" element={<EmployeeForm />} />
              <Route path="/filter" element={<EmployeeFilter />} />
              <Route path="*" element={<Navigate to="/departments" />} />
            </Routes>
          </>
        ) : (
          <>
            {" "}
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
