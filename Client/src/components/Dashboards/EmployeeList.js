import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeList = ({ employees }) => {
  console.log("Employee info: " + employees);
  return (
    <div className="container mt-1 align-items-center">
      <h1 style={{ fontSize: "1.5rem" }}>Employees</h1>
      {employees.length > 0 ? (
        <ul className="list-group">
          {employees.map((employee, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">Name: {employee[1]}</h5>
                <p className="mb-1">Email: {employee[2]}</p>
                <p className="mb-1">Manager No.: {employee[3]}</p>
                <p className="mb-1">Project Assigned: {employee[4]}</p>
              </div>
              <span className="badge badge-primary badge-pill bg-dark">
                #{index + 1}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No employees</p>
      )}
    </div>
  );
};

export default EmployeeList;
