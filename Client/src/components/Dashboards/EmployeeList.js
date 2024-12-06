import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeItem from "./subComponents/EmployeeItem";
import AddTaskModal from "./subComponents/AddTaskModal";
import InfoModal from "./subComponents/InfoModal";

const EmployeeList = ({ employees }) => {
  const [showModal, setShowModal] = useState(false); // Info modal visibility
  const [showAddTaskModal, setShowAddTaskModal] = useState(false); // Add Task modal visibility
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee
  const [tasks, setTasks] = useState([]); // Employee tasks

  // Fetch employee tasks
  const fetchEmployeeTasks = async (employeeId) => {
    try {
      const response = await fetch("http://localhost:3001/api/TasksEmp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: employeeId }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result)
        setTasks(result.data);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching employee tasks:", error);
    }
  };

  const handleTaskClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
    fetchEmployeeTasks(employee[0]);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setTasks([]);
  };

  const openAddTaskModal = (employee) => {
    setSelectedEmployee(employee);
    setShowAddTaskModal(true);
  };

  const closeAddTaskModal = () => {
    setSelectedEmployee(null);
    setShowAddTaskModal(false);
  };

  return (
    <div className="container mt-1">
      {employees.length > 0 ? (
        <ul className="list-group">
          {employees.map((employee, index) => (
            <EmployeeItem
              key={index}
              employee={employee}
              onInfoClick={handleTaskClick}
              onAddTaskClick={openAddTaskModal}
            />
          ))}
        </ul>
      ) : (
        <p className="text-muted">No employees</p>
      )}

      {/* Modals */}
      <InfoModal
        show={showModal}
        employee={selectedEmployee}
        tasks={tasks}
        onClose={closeModal}
      />
      <AddTaskModal
        show={showAddTaskModal}
        onClose={closeAddTaskModal}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeeList;
