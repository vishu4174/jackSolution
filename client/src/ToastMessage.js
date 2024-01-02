import React from "react";
import Toast from "react-bootstrap/Toast";

const ToastMessage = ({ showToast, setShowToast, message }) => {
  return (
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
      autohide
      style={{
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastMessage;
