import React, { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import ProjectList from "./ProjectList";
import TaskList from "./TaskList";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

var count = 3;
function OwnerDashboard() {
  const [employeeData, setEmployeeData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
      count -= 1;
      if (count < 0) setLoading(false);
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData("employees", setEmployeeData);
    fetchData("projects", setProjectData);
    fetchData("tasks", setTaskData);
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
      className="d-flex flex-column"
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
        <h2 className="text-center text-primary mb-4">Welcome Owner!</h2>

        <div className="card shadow-sm p-4" style={{ borderRadius: "10px" }}>
          <div className="mb-4">
            <h4 className="text-primary text-center">Projects</h4>
            <ProjectList Projects={projectData} />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <h4 className="text-primary text-center">Employees</h4>
              <EmployeeList employees={employeeData} />
            </div>
            <div className="col-md-6">
              <h4 className="text-primary text-center">Tasks</h4>
              <TaskList Tasks={taskData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
