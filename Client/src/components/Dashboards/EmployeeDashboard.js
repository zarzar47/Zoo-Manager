import React, { useEffect, useState } from "react";
import TaskList from "./TaskList"; // Component to display list of tasks
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  // States to store current employee information and their tasks
  const [employee, setEmployee] = useState({ id: 0, name: "", email: "" });
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate();

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/getemployee", {
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

      const employeeInfo = await response.json();
      const id = employeeInfo.data[0];
      setEmployee({
        id: employeeInfo.data[0],
        name: employeeInfo.data[1],
        email: employeeInfo.data[2],
      });

      const taskResponse = await fetch("http://localhost:3001/api/TasksEmp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: id }),
      });

      if (taskResponse.ok) {
        const taskInfo = await taskResponse.json();
        setTaskData(taskInfo.data);
        setLoading(false);
      } else {
        console.log("issue getting tasks");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="d-flex flex-column"
    >
      <div
        className="container p-4 shadow-lg"
        style={{
          background: "#fff",
          borderRadius: "15px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary mb-0">Employee Dashboard</h3>
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
            Log out
          </button>
        </div>

        <div
          className="d-flex justify-content-between align-items-center p-3 mb-4 rounded"
          style={{
            background: "#f8f9fa",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <h5 className="mb-0 text-primary">{employee.name}</h5>
          <small className="text-muted">{employee.email}</small>
        </div>

        <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
          <h4 className="card-header text-center text-primary">Your Tasks</h4>
          <div className="card-body">
            <TaskList Tasks={taskData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
