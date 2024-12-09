import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import ComplaintButtonWithModal from "./subComponents/ComplaintButtonModal";

function EmployeeDashboard() {
  const [employee, setEmployee] = useState([0, "", "", "", "", ""]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

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
        const data = await response.json();
        window.location.href = data.redirect;
        return;
      }

      const employeeInfo = await response.json();
      setEmployee(employeeInfo.data);

      const taskResponse = await fetch("http://localhost:3001/api/TasksEmp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: userId }),
      });

      if (taskResponse.ok) {
        const taskInfo = await taskResponse.json();
        const fetchedTasks = taskInfo.data;
        setTasks(fetchedTasks);

        const completed = fetchedTasks
          .filter((task) => task[5] === 1)
          .map((task) => task[0]);

        setCompletedTasks(completed);
      }

      const projectResponse = await fetch("http://localhost:3001/api/getProjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: employeeInfo.data[0] }),
      });

      if (projectResponse.ok) {
        const projectInfo = await projectResponse.json();
        setProjects(projectInfo.data);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const toggleTaskCompletion = async (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task[0] === taskId) {
          // Optimistically toggle task completion in the UI
          return [...task.slice(0, 5), !task[5], ...task.slice(6)];
        }
        return task;
      })
    );
  
    try {
      const task = tasks.find((t) => t[0] === taskId);
      if (task) {
        const taskResponse = await fetch("http://localhost:3001/api/TaskComp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id: taskId,
            completionStatus: task[5] ? 0 : 1, // Send the opposite of the current status
          }),
        });
  
        if (taskResponse.ok) {
          console.log("Task completion updated successfully");
        } else {
          console.error("Failed to update task completion on the server");
        }
      }
    } catch (error) {
      console.error("Error updating task completion:", error);
    }

    if (completedTasks.includes(taskId)) {
      setCompletedTasks((prevCompleted) =>
        prevCompleted.filter((id) => id !== taskId)
      );
    } else {
      setCompletedTasks((prevCompleted) => [...prevCompleted, taskId]);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" p-3"
      style={{
        background: "linear-gradient(to bottom right, #5FE86C,#5FE8C9,#89E85F)",
        minHeight: "100vh",
      }}
    >
      {/* Employee Details */}
      <div className="shadow-lg rounded p-4 bg-light mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-primary mb-0">{employee[1]}</h3>
          <button
            className="btn btn-primary btn-sm"
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
          <p>
            <strong>Email:</strong> {employee[2]}
          </p>
          <p>
            <strong>Manager:</strong> {employee[4]}
          </p>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="shadow-sm rounded p-3 mb-4 bg-dark text-white">
        <h5>Performance Summary</h5>
        <p>
          Tasks Completed: {completedTasks.length} / {tasks.length}
        </p>
      </div>

      {/* Projects Section */}
      <div className="shadow-sm rounded p-3 mb-4 bg-light">
        <h5 className="text-primary">Your Projects</h5>
        {projects.length === 0 ? (
          <p>No projects assigned yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project[0]}
              className="mb-3 p-2 rounded border"
            >
              <h5>{project[1]}</h5>
                <p>
                  Start: {new Date(project[2]).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} <br></br>
                  End: {new Date(project[3]).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>
          ))
        )}
      </div>

      {/* Tasks Section */}
      <div className="shadow-sm rounded p-3 bg-light">
        <h5 className="text-primary">Your Tasks</h5>
        {tasks.length === 0 ? (
          <p>No tasks assigned yet.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task[0]}
              className={`d-flex justify-content-between align-items-center mb-2 p-2 rounded border ${
                task[5] ? "bg-success text-white" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleTaskClick(task)}
            >
              <span
                style={{
                  textDecoration: task[5] ? "line-through" : "none",
                }}
              >
                {task[1]}
              </span>
              <button
                className={`btn btn-sm ${task[5] ? "btn-light" : "btn-primary"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTaskCompletion(task[0]);
                }}
              >
                {task[5] ? "Undo" : "Complete"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal for Task Details */}
      {selectedTask && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Task Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setSelectedTask(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Task Description:</strong> {selectedTask[1]}
                </p>
                <p>
                  <strong>Assigned Time:</strong> {selectedTask[2]}
                </p>
                <p>
                  <strong>Assigned Date:</strong> {new Date(selectedTask[3]).toLocaleDateString()}
                </p>
                <p>
                  <strong>Completed:</strong> {selectedTask[5] ? "Yes" : "No"}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedTask(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Complaint Button */}
      <ComplaintButtonWithModal employeeID={userId}></ComplaintButtonWithModal>
      </div>
  );
}

export default EmployeeDashboard;
