import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ManagerItem from "./subComponents/ManagerItem";
import AddEmployeeModal from "./subComponents/AddEmployeeModal";

const ManagerList = ({ managers }) => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false); // Add Employee modal visibility
  const [selectedManager, setSelectedManager] = useState(null); // Selected manager

  const openAddEmployeeModal = (manager) => {
    setSelectedManager(manager);
    setShowAddEmployeeModal(true);
  };

  const closeAddEmployeeModal = () => {
    setSelectedManager(null);
    setShowAddEmployeeModal(false);
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

      {/* Add Employee Modal */}
      <AddEmployeeModal
        show={showAddEmployeeModal}
        onClose={closeAddEmployeeModal}
        manager={selectedManager}
      />
    </div>
  );
};

export default ManagerList;
