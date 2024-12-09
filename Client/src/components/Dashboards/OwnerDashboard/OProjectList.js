import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OwnerProjectList = ({ Managers, Projects, setProjects }) => {
  const [newProjectName, setNewProjectName] = useState("");
  const [managerID, setManagerID] = useState(null);
  const [loading, setLoading] = useState(false);

  const availableManagers = Managers.filter(
    (manager) => {
      const assignedProject = Projects.some((project) => project[3] === manager[1]);
      return !assignedProject;
    })

  const handleAddProject = async () => {
    if (!newProjectName.trim() || !managerID) {
      alert("Please enter a project name and select a manager.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/api/AddProject`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectName: newProjectName, manager_id: managerID }),
      });
      if (response.ok){
      alert("Successfully added project data");
      setNewProjectName("");
      setManagerID(null);
      } else {
        alert("Something went wrong adding the project");
      }
    } catch (error) {
      console.error(`Error adding project data:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-1 align-items-center">
      <div className="mb-3">
        <h5>Add a New Project</h5>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <select
            className="form-control"
            value={managerID || ""}
            onChange={(e) => setManagerID(parseInt(e.target.value) || null)}
          >
            <option value="" disabled>
              Select a Manager
            </option>
            {availableManagers.map((manager) => (
              <option key={manager[0]} value={manager[0]}>
                {manager[1]} {/* Assuming manager name is at index 1 in `Managers` */}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={handleAddProject}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Project"}
          </button>
        </div>
      </div>

      {Projects.length > 0 ? (
        <ul className="list-group">
          {Projects.map((Project, index) => (
            <li key={index} className="list-group-item">
              <div>
                <h5 className="mb-1">{Project[0]}</h5>
                <p className="mb-1">Time Created: {Project[1]}</p>
                <p className="mb-1">Completion Date: {Project[2]}</p>
                <p className="mb-1">Assigned to manager: {Project[3]}</p>
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

export default OwnerProjectList;
