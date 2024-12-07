import React from "react";

const ManagerItem = ({ manager, onAddEmployeeClick }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h5>{manager[1]}</h5>
        <p className="mb-0"><strong>Email:</strong> {manager[3]}</p>
        <p className="mb-0"><strong>Hire Date:</strong> {manager[2]}</p>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => onAddEmployeeClick(manager)}
      >
        Add Employee
      </button>
    </li>
  );
};

export default ManagerItem;
