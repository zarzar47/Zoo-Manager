import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [new_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const triggerAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/auth/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, new_password }),
      });
    
      if (response.status == 400){
        console.log("Masla agaya");
      }
      if (response.ok) {
        triggerAlert();
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(to bottom right, #6a11cb, #2575fc)",
        boxShadow: "0 0 100px rgba(0, 0, 0, 0.5)",
        height: "90vh",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "auto", borderRadius: "10px" }}
      >
        {showAlert && <div
          className="text-center"
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          Password Successfully changed
        </div>
        }
        <h2 className="text-center mb-4 text-primary">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your new password"
              value={new_password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Change
          </button>
        </form>
        <div className="mt-3 text-center">
        <button type="submit" onClick={() => {
            navigate("/");
        }} className="btn btn-primary w-100">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
