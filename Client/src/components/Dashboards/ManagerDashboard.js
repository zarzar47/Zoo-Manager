import React, { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import ProjectList from "./ProjectList";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskList from "./TaskList";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    // fetchData("Manager/tasks", setTaskData);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <div
        className="container p-4 shadow-lg"
        style={{
          background: "#fff",
          borderRadius: "15px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">Manager Dashboard</h2>
          <button
            className="btn btn-primary"
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

        <h3 className="text-center mb-4">
          Welcome Manager! <span className="text-success">{manager[2]}</span>
        </h3>

        <div className="card shadow-sm p-4" style={{ borderRadius: "10px" }}>
          <div className="mb-4">
            <h4 className="text-primary">Projects</h4>
            <ProjectList Projects={projectData} />
          </div>

          <div className="col">
              <h4 className="text-primary">Employees</h4>
              <EmployeeList employees={employeeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;