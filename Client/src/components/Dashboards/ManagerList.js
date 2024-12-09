import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ManagerItem from "./subComponents/ManagerItem";
import AddEmployeeModal from "./subComponents/AddEmployeeModal";
import AddManagerModal from "./subComponents/AddManagerModal"; // New Modal Component

const ManagerList = ({ managers, setManagers }) => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddManagerModal, setShowAddManagerModal] = useState(false); // Add Manager modal visibility
  const [selectedManager, setSelectedManager] = useState(null);

  const openAddEmployeeModal = (manager) => {
    setSelectedManager(manager);
    setShowAddEmployeeModal(true);
  };

  const closeAddEmployeeModal = () => {
    setSelectedManager(null);
    setShowAddEmployeeModal(false);
  };

  const openAddManagerModal = () => {
    setShowAddManagerModal(true);
  };

  const closeAddManagerModal = () => {
    setShowAddManagerModal(false);
  };

  return (
    <div className="container mt-1">
      {managers.length > 0 ? (
        <ul className="list-group">
          {managers.map((manager, index) => (
            <ManagerItem
              key={index}
              manager={manager}
              onAddEmployeeClick={openAddEmployeeModal}
            />
          ))}
        </ul>
      ) : (
        <p className="text-muted">No managers</p>
      )}

      <div className="d-flex justify-content-between align-items-center p-3">
        <button className="btn btn-primary" onClick={openAddManagerModal}>
          Add Manager
        </button>
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        show={showAddEmployeeModal}
        onClose={closeAddEmployeeModal}
        manager={selectedManager}
      />

      {/* Add Manager Modal */}
      <AddManagerModal
        show={showAddManagerModal}
        onClose={closeAddManagerModal}
        setManagers={setManagers}
      />
    </div>
  );
};

export default ManagerList;
