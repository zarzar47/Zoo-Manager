import React from "react";

const EmployeeList = ({ employees }) => {
  return (
    <div className="Wow">
      <ol>
        {employees.length > 0 ? (
          employees.map((employees, i) => (
            <li key={i}>
              Name : <span>{employees[1]}</span>, Email:{" "}
              <span>{employees[2]}</span>
            </li>
          ))
        ) : (
          <p> No employees </p>
        )}
      </ol>
    </div>
  );
};

export default EmployeeList;
