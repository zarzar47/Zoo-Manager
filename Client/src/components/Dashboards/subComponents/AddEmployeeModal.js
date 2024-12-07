import React, { useState } from "react";

const AddEmployeeModal = ({ show, onClose, manager }) => {
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    email: "",
    phoneNum: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddEmployee = async () => {
    if (!employeeDetails.name || !employeeDetails.email || !employeeDetails.phoneNum) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/Manager/AddEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...employeeDetails,
          managerID: manager[0], // Add manager ID to the request
        }),
      });
      if (response.ok) {
        alert("Employee added successfully!");
        onClose(); // Close the modal
      } else {
        alert("Failed to add employee. Please try again.");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  if (!show || !manager) {
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
              <h5 className="modal-title">Add Employee to {manager[1]}</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={employeeDetails.name}
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
                  value={employeeDetails.email}
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
                  value={employeeDetails.phoneNum}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handleAddEmployee}>
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
