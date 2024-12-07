import React from "react";

const OEmployeeItem = ({ employee, onInfoClick, onAddTaskClick }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h5 className="mb-1">Name: {employee[1]}</h5>
        <p className="mb-1">Email: {employee[2]}</p>
        <p className="mb-1">Project Assigned: {employee[5] != null ? "yes" : "no"}</p>
        <p className="mb-1">Manager: {employee[4]}</p>
        <button
          type="button"
          className="btn btn-outline-dark btn-sm"
          onClick={() => onInfoClick(employee)}
        >
          Info
        </button>
        <button
          type="button"
          className="btn btn-outline-success btn-sm m-1"
          onClick={() => onAddTaskClick(employee)}
        >
          Add Task
        </button>
      </div>
    </li>
  );
};

export default OEmployeeItem;
