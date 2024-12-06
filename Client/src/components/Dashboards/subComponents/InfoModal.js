import React from "react";
import TaskList from "../TaskList"; // Assuming TaskList is another component

const InfoModal = ({ show, employee, tasks, onClose }) => {
  if (!show || !employee) return null; // Render nothing if not shown

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Tasks and Details for {employee[1]}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <p><strong>Name:</strong> {employee[1]}</p>
              <p><strong>Email:</strong> {employee[2]}</p>
              <p><strong>Hire Date:</strong> {employee[3]}</p>
              <p><strong>Phone:</strong> {employee[6] ? employee[6] : "No number given"}</p>
            </div>
            <hr />
            <h6>Assigned Tasks</h6>
            <TaskList Tasks={tasks} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
