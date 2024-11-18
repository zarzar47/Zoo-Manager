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
  const [taskData, setTaskData] = useState([]);
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate();

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

      if (response.status === 401){
        // response.json().then((data) => {
        //   window.location.href = data.redirect;
        // })
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
    fetchData("Manager/tasks", setTaskData);
  }, []);

  return (
    <div className="container p-3">
      <button className="btn btn-primary" onClick={() => {
          navigate("/");
          fetch("http://localhost:3001/api/auth/logout", {
            method: "GET",
            credentials: "include",
          })
        }}>Log out</button>
      <h2 className="text-center">
        Welcome manager! <span>{manager[1]}</span>
      </h2>
      <div className="card pb-3">
        <ProjectList Projects={projectData} />
        <div className="row">
          <div className="col-md-6">
            <EmployeeList employees={employeeData} />
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
