import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingIcons from "../Dashboards/subComponents/FloatingIcons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === "E")
          navigate("EmployeeDashboard", { state: { userId: data.id } });
        else if (data.status === "M")
          navigate("ManagerDashboard", { state: { userId: data.id } });
        else if (data.status === "O")
          navigate("OwnerDashboard", { state: { userId: data.id } });
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <FloatingIcons /> {/* Add Floating Icons */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(to bottom right, #5FE86C,#5FE8C9,#89E85F)",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          className="card shadow-lg p-4"
          style={{ maxWidth: "auto", borderRadius: "10px" }}
        >
          <h2 className="text-center mb-4 text-primary">Login</h2>
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
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <div className="mt-3 text-center">
            <small>
              <a href="/ForgotPassword" className="text-decoration-none text-primary">
                Forgot password?
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
