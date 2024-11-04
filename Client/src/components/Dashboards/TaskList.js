import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskList = ({ Tasks }) => {
  return (
    <div className="container mt-1 align-items-center">
      <h1 style={{ fontSize: "1.5rem" }}>Tasks Assigned</h1>
      {Tasks.length > 0 ? (
        <ul className="list-group">
          {Tasks.map((Task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">Description: {Task[1]}</h5>
                <p className="mb-1">Time assigned: {Task[2]}</p>
                <p className="mb-1">Reserve no: {Task[3]}</p>
                {Tasks.length > 4 ? (
                  <p className="mb-1">Urgency Scale: {Task[4]}</p>
                ) : (
                  ""
                )}
              </div>
              <span className="badge badge-primary badge-pill bg-dark">
                #{index + 1}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No Tasks</p>
      )}
    </div>
  );
};

export default TaskList;
