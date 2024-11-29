import React, { useEffect, useState } from "react";
import TaskList from "./TaskList"; // Component to display list of tasks
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const [employee, setEmployee] = useState({ id: 0, name: "", email: "" });
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [notifications, setNotifications] = useState([
    "Welcome to the Zoo Employee Dashboard!",
    "New task assigned: Check animal habitats.",
  ]);
  const [background, setBackground] = useState("forest");
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
        console.log("Issue getting tasks");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const toggleTaskCompletion = (taskId) => {
    setTaskData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  const toggleBackground = () => {
    setBackground((prev) =>
      prev === "forest" ? "savannah" : prev === "savannah" ? "ocean" : "forest"
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="d-flex flex-column"
      style={{
        minHeight: "100vh",
        backgroundImage:
          background === "forest"
            ? "url('https://th.bing.com/th/id/R.ee89e33a2de59e747861744dd3aeddd1?rik=FpKQVhPWVAXaPw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fPJXlT3m.jpg&ehk=4KIKqKYgfLJY4YPAtMespwDXU44zDiNwMjgJptatzrU%3d&risl=&pid=ImgRaw&r=0')"
            : background === "savannah"
            ? "url('https://i.pinimg.com/originals/fe/02/4e/fe024e50a71cfd6599841dbb2a144d2c.jpg')"
            : "url('https://www.kolpaper.com/wp-content/uploads/2020/06/Ocean-4K-Wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      <div
        className="container p-4 shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "15px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary mb-0">
            Hello, {employee.name}! Ready for another productive day?
          </h3>
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

            {/* Performance Summary */}
            <div
              className="mb-4 p-3"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark background with some transparency
                color: "white", // Light text color for contrast
                borderRadius: "10px", // Smooth corners
              }}
>
              <h5>Performance Summary:</h5>
               <p>
                   Tasks Completed: {completedTasks.length} / {taskData.length}
              </p>
            </div>


        {/* Special Project Section */}
        <div className="card shadow-sm mb-4" style={{ borderRadius: "10px" }}>
          <h4 className="card-header text-center text-primary">
            Special Project
          </h4>
          <div className="card-body">
            <p>Project: Revamp the aviary section</p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "65%" }}
                aria-valuenow="65"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                65%
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="card shadow-sm mb-4" style={{ borderRadius: "10px" }}>
          <h4 className="card-header text-center text-primary">
            Notifications
          </h4>
          <div className="card-body">
            <ul>
              {notifications.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Task List */}
        <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
          <h4 className="card-header text-center text-primary">Your Tasks</h4>
          <div className="card-body">
            {taskData.map((task) => (
              <div
                key={task.id}
                className={`d-flex justify-content-between align-items-center mb-2 ${
                  task.completed ? "text-muted" : ""
                }`}
              >
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.description}
                </span>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  <i className="fas fa-check"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Complaint Button */}
        <button
          className="btn btn-primary position-fixed"
          style={{
            bottom: "10px",
            left: "10px",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i className="fas fa-comment"></i>
        </button>

        {/* Background Toggle Button */}
        <button
          className="btn btn-secondary position-fixed"
          style={{
            bottom: "10px",
            right: "10px",
          }}
          onClick={toggleBackground}
        >
          Change Background
        </button>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
