import React, { useEffect, useState } from "react";
import TaskList from "./TaskList"; // Component to display list of tasks
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

function EmployeeDashboard() {
  // States to store current employee information and their tasks
  const [employee, setEmployee] = useState({ id: 0, name: "", email: "" });
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const userId = location.state?.userId;

  const fetchEmployeeData = async () => {
    try {
      const employeeResponse = await fetch(
        "http://localhost:3001/api/getemployee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        }
      );

      const employeeInfo = await employeeResponse.json();
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
    <div className="container p-3">
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-2 mb-3 rounded">
        <div>
          <h5 className="mb-0">{employee.name}</h5>
          <small>{employee.email}</small>
        </div>
      </div>

      <div className="card">
        <h4 className="card-header text-center">Your Tasks</h4>
        <div className="card-body">
          <TaskList Tasks={taskData} />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
