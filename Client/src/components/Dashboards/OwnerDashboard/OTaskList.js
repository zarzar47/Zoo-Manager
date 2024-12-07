import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EditTaskModal from "../subComponents/EditTaskModal";

const OwnerTaskList = ({ Tasks }) => {
  const [showEditModal, setShowEditModal] = useState(false); 
  const [selectedTask, setSelectedTask] = useState(null);

  const DeleteTask = async (TaskID) => {
    try {
      const response = await fetch(`http://localhost:3001/api/RemoveTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: TaskID }),
      });

      const result = await response.json();
      if (result.result === "success") {
        alert("Task successfully deleted");
      } else {
        console.error("Failed to delete task:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task); // Set the selected task for editing
    setShowEditModal(true); // Show the modal
  };

  const getUrgencyStyle = (urgency) => {
    if (urgency >= 8) return { backgroundColor: "#ffcccc" }; // High urgency
    if (urgency >= 5) return { backgroundColor: "#fff0b3" }; // Medium urgency
    return { backgroundColor: "#ccffcc" }; // Low urgency
  };

  // Sort tasks by urgency scale in descending order (highest urgency first)
  const sortedTasks = [...Tasks].sort((a, b) => b[4] - a[4]); // Assuming Urgency Scale is Task[4]

  return (
    <div className="container mt-1 align-items-center">
      {sortedTasks.length > 0 ? (
        <ul className="list-group">
          {sortedTasks.map((Task) => (
            <li
              key={Task[0]} // Assuming Task[0] contains a unique TaskID
              className="list-group-item d-flex justify-content-between align-items-center"
              style={getUrgencyStyle(Task[4])} // Apply dynamic style based on urgency
            >
              <div>
                <h5 className="mb-1">Description: {Task[1]}</h5>
                <p className="mb-1">Time assigned: {Task[2]}</p>
                <p className="mb-1">Reserve no: {Task[3]}</p>
                <p className="mb-1">Urgency Scale: {Task[4]}</p>
                <p className="mb-1">Completed: {Task[5] === 1 ? "Yes" : "No"}</p>
                <p className="mb-1">Assigned to: {Task[6]}</p>
              </div>
              <div>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditClick(Task)} // Pass the selected task
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => DeleteTask(Task[0])} // Pass TaskID
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No Tasks</p>
      )}

      {/* Edit Task Modal */}
      {showEditModal && (
        <EditTaskModal
          task={selectedTask} // Pass selected task
          onClose={() => setShowEditModal(false)} // Close modal handler
        />
      )}
    </div>
  );
};

export default OwnerTaskList;
