import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { loginService } from "../../_services/loginService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailed, loginSuccess } from "../../redux/slices/auth";
import ToastMessage from "../../ToastMessage";

const LoginForm = () => {
  const validationModel = {
    username: { errors: "", valid: false },
    password: { errors: "", valid: false },
  };
  const [FormState, SetFormState] = useState(validationModel);
  const [loginData, setLoginData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ValidateFromState(FormState, SetFormState, loginData)) {
      setShowToast(false);
      loginService.login(loginData).then((res) => {
        if (res.Success === true) {
          setShowToast(true);
          dispatch(loginSuccess(res.Data));
          localStorage.setItem("token", res.token);
          localStorage.setItem("role", res.Data.role);
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          setShowToast(false);
          dispatch(loginFailed(false));
          console.log(res.error);
        }
      });
    } else {
      return;
    }
  };

  function ValidateFromState(formState, SetFormState, formData) {
    let isValid = true;
    for (const key in formState) {
      if (formState[key].valid == false) {
        let validResp = Required(
          formData[key].toString() == "0" ? "" : formData[key].toString()
        );

        if (validResp.isValid === false) {
          SetFormState((prevState) => ({
            ...prevState,
            [key]: { valid: validResp.isValid, errors: validResp.message },
          }));
          isValid = validResp.isValid;
          return isValid;
        }
      }
    }
    return isValid;
  }

  const handleChange = (e, name, IsValidate = false) => {
    setLoginData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
    if (IsValidate === true) {
      IsValidateCheck(e, name, e.target.value);
    }
  };

  const IsValidateCheck = (e, name, value) => {
    let validResp = Required(value);

    if (!validResp.isValid) {
      if (e !== null) {
        e.target.focus();
      }
    }
    SetFormState((prevState) => ({
      ...prevState,
      [name]: { valid: validResp.isValid, errors: validResp.message },
    }));
  };

  function Required(val) {
    return val !== undefined && val.trim().length > 0
      ? { isValid: true, message: "" }
      : { isValid: false, message: "This field is Required!" };
  }

  return (
    <div className="container">
      <h2>Login Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => handleChange(e, "username", true)}
          />
          <span className="text-danger">{FormState.username.errors}</span>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e, "password", true)}
          />
          <span className="text-danger">{FormState.password.errors}</span>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Login
        </Button>
        &nbsp;
        <Button variant="primary" onClick={() => navigate("/signup")}>
          Signup
        </Button>
      </Form>
      <ToastMessage
        showToast={showToast}
        setShowToast={setShowToast}
        message="Login Successfully"
      />
    </div>
  );
};

export default LoginForm;
