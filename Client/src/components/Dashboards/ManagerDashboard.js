import React, { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import ProjectList from "./ProjectList";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskList from "./TaskList";

function ManagerDashboard() {
  const [backendData, setBackendData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${endpoint}`);
      const data = await response.json();
      const sortedData = data.data.sort((a, b) => (a[0] < b[0] ? -1 : 1));
      setter(sortedData);
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
    }
  };

  useEffect(() => {
    fetchData("employees", setBackendData);
    fetchData("Projects", setProjectData);
    fetchData("tasks", setTaskData);
  }, []);

  return (
    <div className="container p-3">
      <h2 className="text-center">Welcome manager!</h2>
      <div className="card pb-3">
        <ProjectList Projects={projectData} />
        <div className="row">
          <div className="col-md-6">
            <EmployeeList employees={backendData} />
          </div>
          <div className="col-md-6">
            <TaskList Tasks={taskData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
