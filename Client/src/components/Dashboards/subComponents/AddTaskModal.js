import React, { useState } from "react";

const AddTaskModal = ({ show, onClose, employee, reserveData }) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [urgency, setUrgency] = useState("");
  const [reserveId, setReserveId] = useState("");
  
  const handleAddTask = async () => {
    if (!taskDescription || !urgency || !reserveId) {
      alert("Please fill out all fields!");
      return;
    }

    const newTask = {
      description: taskDescription,
      urgency: urgency,
      reserveId: reserveId,
      employeeId: employee[0], // Employee ID
    };

    try {
      const response = await fetch("http://localhost:3001/api/AddTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        alert("Task added successfully!");
        onClose(); // Close the modal
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  if (!show) return null; // Do not render if modal is hidden
  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Add Task for {employee ? employee[1] : "Employee"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Task Description</label>
              <textarea
                className="form-control"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Urgency</label>
              <input
                type="text"
                className="form-control"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Reserve ID</label>
              <select
                className="form-control"
                value={reserveId || ""}
                onChange={(e) => setReserveId(e.target.value)}
              >
                <option value="" disabled>
                  Select a Reserve
                </option>
                {reserveData.map((reserve) => (
                  <option key={reserve[0]} value={reserve[0]}>
                    {reserve[1]}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
