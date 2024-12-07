import React, { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import ProjectList from "./ProjectList";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ComplaintList from "./Complaintlist";

function ManagerDashboard() {
  const [manager, setManager] = useState({ id: 0, name: "", email: "" });
  const [employeeData, setemployeeData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: userId }),
      });

      if (response.status === 401) {
        response.json().then((data) => {
          window.location.href = data.redirect;
        });
      }
      const data = await response.json();
      const sortedData = data.data.sort((a, b) => (a[0] < b[0] ? -1 : 1));
      setter(sortedData);
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
    }
  };

  useEffect(() => {
    fetchData("Manager/", setManager);
    fetchData("Manager/employees", setemployeeData);
    fetchData("Manager/projects", setProjectData);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className=" p-3 "
      style={{
        background: "linear-gradient(to bottom right, #5FE86C,#5FE8C9,#89E85F)",
        minHeight: "100vh",
      }}
    >
      <div className="shadow-lg rounded p-4 bg-white mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-primary mb-0">{manager[2]}</h3>
          <button
            className="btn btn-primary btn-sm"
            style={{
              backgroundColor: "#6a11cb",
              borderColor: "#6a11cb",
            }}
            onClick={() => {
              navigate("/");
              fetch("http://localhost:3001/api/auth/logout", {
                method: "GET",
                credentials: "include",
              });
            }}
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="mb-4">
          <strong>Manager Details</strong>
          <p>
            <strong>Email:</strong> {manager[3]}
          </p>
        </div>
      </div>

      <div className="shadow-lg rounded p-4 bg-light mb-4">
        <h4 className="text-primary">Projects</h4>
        <ProjectList Projects={projectData} />
      </div>

      <div className="shadow-lg rounded p-4 bg-light mb-4">
        <h4 className="text-primary">Employees</h4>
        <EmployeeList employees={employeeData} />
      </div>
      <p></p>
      <div className="shadow-lg rounded p-4 bg-light mb-4">
        <h4 className="text-primary">Complaints</h4>
        <ComplaintList managerID={userId} />
      </div>
    </div>
  );
}

export default ManagerDashboard;
