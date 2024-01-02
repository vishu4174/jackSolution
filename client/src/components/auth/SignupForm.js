import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { loginService } from "../../_services/loginService";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../ToastMessage";

const SignupForm = () => {
  const [signupData, setSignupData] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setShowToast(false);
    e.preventDefault();
    loginService.register(signupData).then((res) => {
      if (res.Success === true) {
        setShowToast(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setShowToast(false);
        console.log(res.error);
      }
    });
  };

  const handleChange = (e, name) => {
    setSignupData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <h2>Signup Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => handleChange(e, "username")}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e, "password")}
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" onChange={(e) => handleChange(e, "role")}>
            <option>user</option>
            <option>manager</option>
          </Form.Control>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Signup
        </Button>
        &nbsp;
        <Button variant="primary" onClick={() => navigate("/")}>
          Login
        </Button>
      </Form>
      <ToastMessage
        showToast={showToast}
        setShowToast={setShowToast}
        message="Register Successfully"
      />
    </div>
  );
};

export default SignupForm;
