import React, { useState } from "react";

const AppAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const triggerAlert = () => {
    setShowAlert(true);
    // Auto-hide the alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
        (showAlert && <div
          className="alert alert-warning mt-3"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <strong>Alert!</strong> This is your in-app alert message.
        </div>
      )
    )
};

export default AppAlert;
