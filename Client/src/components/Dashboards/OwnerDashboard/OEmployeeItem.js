import React from "react";

const OEmployeeItem = ({ employee, onInfoClick, onAddTaskClick, bestID }) => {

  const AddToProject = async (employeeid) => {
    try {
      const response = await fetch("http://localhost:3001/api/AddToProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: employeeid }),
      });
      if (response.ok) {
        alert("Added employee to project")
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching employee");
    }
  }

  const isBestEmployee = parseInt(employee[0]) === parseInt(bestID);
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        isBestEmployee ? "bg-success text-white" : ""
      }`}
    >
      <div>
        {isBestEmployee && <p><strong>Best Employee</strong></p>}
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
          className={`btn ${isBestEmployee? "btn-outline-warning" : "btn-outline-success"} btn-sm m-1`}
          onClick={() => onAddTaskClick(employee)}
        >
          Add Task
        </button>
        {(employee[5] == null)? <button
          type="button"
          className={`btn ${isBestEmployee? "btn-outline-warning" : "btn-outline-success"} btn-sm m-1`}
          onClick={() => AddToProject(employee[0])}
        >
          Assign Project
        </button> : <p></p>}
      </div>
    </li>
  );
};


export default OEmployeeItem;
