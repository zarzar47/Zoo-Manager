import React, { useState } from "react";

const AddManagerModal = ({ show, onClose, setManagers }) => {
  const [managerDetails, setManagerDetails] = useState({
    name: "",
    email: "",
    phoneNum: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManagerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddManager = async () => {
    if (!managerDetails.name || !managerDetails.email || !managerDetails.phoneNum) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/Manager/AddManager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(managerDetails),
      });

      console.log(response)
      if (response.ok) {
        const newManager = await response.json();
        setManagerDetails((prevManagers) => [...prevManagers, newManager]);
        alert("Manager added successfully!");
        onClose(); // Close the modal
      } else {
        alert("Failed to add manager. Please try again.");
      }
    } catch (error) {
      console.error("Error adding manager:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      {/* Blackened Background */}
      <div
        className="modal-backdrop"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      ></div>

      {/* Modal Content */}
      <div
        className="modal show"
        style={{
          display: "block",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Manager</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={managerDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={managerDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNum"
                  value={managerDetails.phoneNum}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handleAddManager}>
                Add Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddManagerModal;
