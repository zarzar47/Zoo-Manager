import React, { useState } from "react";

function ComplaintButtonWithModal({ employeeID }) {
  const [showModal, setShowModal] = useState(false);
  const [complaintDetails, setComplaintDetails] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmitComplaint = async () => {
    try {
    const response = await fetch("http://localhost:3001/api/Complaints/PostComplaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: employeeID, complaint: complaintDetails }),
    })
    
    if (response.ok) {
      alert("Complaint submitted successfully!");
      setComplaintDetails(""); // Reset the input
      handleCloseModal(); // Close the modal
    } else {
      alert("Failed to submit complaint.");
    }
    } catch (e) {
      console.log("encountered error "+e)
    }
  };

  return (
    <div>
      {/* Floating Complaint Button */}
      <button
        className="btn-complaint"
        onClick={handleOpenModal}
        style={{
          position: "fixed",
          bottom: "40px",
          left: "10px",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          color: "white",
          fontSize: "20px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <i className="fas fa-exclamation"></i>
      </button>

      {/* Complaint Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h4 style={{ marginBottom: "15px" }}>Submit a Complaint</h4>
            <textarea
              value={complaintDetails}
              onChange={(e) => setComplaintDetails(e.target.value)}
              placeholder="Describe your issue here..."
              rows={5}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            ></textarea>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "8px 12px",
                  background: "#ccc",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
              <button
                onClick={handleSubmitComplaint}
                style={{
                  padding: "8px 12px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                disabled={!complaintDetails.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintButtonWithModal;
