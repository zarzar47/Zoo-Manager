import React, { useState } from "react";

const EditTaskModal = ({ task, onClose }) => {
  const [description, setDescription] = useState(task[1]);
  const [urgency, setUrgency] = useState(task[4]);
  const [reserveNo, setReserveNo] = useState(task[3]);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/EditTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: task[0], // Task ID
          description : description,
          urgency : urgency,
          reserveNo : reserveNo,
        }),
      });

      const result = await response.json();
      if (result.result === "success") {
        alert("Task successfully updated");
        onClose(); // Close modal on success
      } else {
        console.error("Failed to update task:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Task Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="urgency" className="form-label">
                Urgency Scale
              </label>
              <input
                type="number"
                className="form-control"
                id="urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                min="1"
                max="10"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reserveNo" className="form-label">
                Reserve Number
              </label>
              <input
                type="text"
                className="form-control"
                id="reserveNo"
                value={reserveNo}
                onChange={(e) => setReserveNo(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
