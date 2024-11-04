import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProjectList = ({ Projects }) => {
  return (
    <div className="container mt-1 align-items-center">
      <h1 style={{ fontSize: "1.5rem" }}>Projects</h1>
      {Projects.length > 0 ? (
        <ul className="list-group">
          {Projects.map((Project, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">Name: {Project[1]}</h5>
                <p className="mb-1">Time Created: {Project[2]}</p>
                <p className="mb-1">
                  Estimated Time of Completion: {Project[3]}
                </p>
                <p className="mb-1">Assigned to manager no.: {Project[4]}</p>
              </div>
              <span className="badge badge-primary badge-pill bg-dark">
                #{index + 1}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No Projects</p>
      )}
    </div>
  );
};

export default ProjectList;
