import React, { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import ProjectList from "./ProjectList";
import TaskList from "./TaskList";
import { useNavigate } from "react-router-dom";

function OwnerDashboard() {
  const [employeeData, setEmployeeData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
        credentials: "include",
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
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchData("employees", setEmployeeData),
        fetchData("projects", setProjectData),
        fetchData("tasks", setTaskData),
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center p-4">
      <div
        className="container p-4 shadow-lg"
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {/* Header */}
        <header className="text-center mb-4">
          <h2 className="text-primary">Welcome, Owner!</h2>
          <p className="text-muted">
            Here is an overview of your projects, employees, and tasks.
          </p>
        </header>

        {/* Content Section */}
        <div className="row g-4">
          {/* Projects */}
          <div className="col-12">
            <div className="card shadow-sm p-4">
              <h4 className="text-primary mb-3 text-center">Projects</h4>
              <ProjectList Projects={projectData} />
            </div>
          </div>

          {/* Employees and Tasks */}
          <div className="col">
            <div className="card shadow-sm p-4 h-100">
              <h4 className="text-primary mb-3 text-center">Employees</h4>
              <EmployeeList employees={employeeData} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm p-4 h-100">
              <h4 className="text-primary mb-3 text-center">Tasks</h4>
              <TaskList Tasks={taskData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
