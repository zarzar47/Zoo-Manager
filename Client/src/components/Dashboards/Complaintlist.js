import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ComplaintList = ({ managerID }) => {
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints assigned to the manager
  const fetchComplaints = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/Complaints/ManagerComplaints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ id: managerID }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        setComplaints(result.data);
      } else {
        console.error("Failed to fetch complaints");
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  // Resolve a complaint by deleting it from the database
  const handleResolveComplaint = async (complaintID) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/Complaints/DeleteComplaint",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ id: complaintID }),
        }
      );
      alert(`Complaint #${complaintID} resolved successfully!`);
      setComplaints(complaints.filter((complaint) => complaint[0] !== complaintID));
    } catch (error) {
      console.error("Error resolving complaint:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="container mt-3">
      {complaints.length > 0 ? (
        <div className="row">
          {complaints.map((complaint, index) => (
            <div
              key={index}
              className="col-md-6 mb-4"
              style={{ maxWidth: "100%" }}
            >
              <div className="card shadow-sm border-primary">
                <div className="card-body">
                  <h5 className="card-title">Complaint ID {complaint[0]}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {complaint[1]}
                  </p>
                  <p className="card-text">
                    <strong>Issued by: </strong>
                    <span>{complaint[3]}</span>
                  </p>
                  {/* Resolved Button */}
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => handleResolveComplaint(complaint[0])}
                  >
                    Mark as Resolved
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center">No Complaints Found</p>
      )}
    </div>
  );
};

export default ComplaintList;
