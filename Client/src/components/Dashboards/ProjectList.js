import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Project } from "../../classes/Classes"

const ProjectList = ({ Projects }) => {
  return (
    <div className="container mt-1 align-items-center">
      {Projects.length > 0 ? (
        <ul className="list-group">
          {Projects.map((Project, index) => (
            <li
              key={index}
              className="list-group-item"
            >
              <div>
                <h5 className="mb-1">Name: {Project[0]}</h5>
                <p className="mb-1">Time Created: {Project[1]}</p>
                <p className="mb-1">
                  Completion date: {Project[2]}
                </p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "65%" }}
                    aria-valuenow="65"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    65%
                  </div>
                </div>
                {/* <p className="mb-1">Assigned to manager no.: {Project[4]}</p> */}
              </div>
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
