import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/LoginPage";
import ManagerDashboard from "./components/Dashboards/ManagerDashboard";
import EmployeeDashboard from "./components/Dashboards/EmployeeDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
          <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
