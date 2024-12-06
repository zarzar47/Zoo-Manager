import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/LoginPage";
import ManagerDashboard from "./components/Dashboards/ManagerDashboard";
import EmployeeDashboard from "./components/Dashboards/EmployeeDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import OwnerDashboard from "./components/Dashboards/OwnerDashboad";
import ForgotPassword from './components/Login/ForgotPassword';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
          <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          <Route path="/OwnerDashboard" element={<OwnerDashboard />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
