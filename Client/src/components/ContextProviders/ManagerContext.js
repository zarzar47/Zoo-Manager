import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {Manager, Employee, Task, Project} from "../../classes/Classes"
import { useContext } from "react";
const ManagerContext = React.createContext();

export const ManagerProvider = ({ children }) => {
  const [manager, setManager] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const userId = location.state?.userId;

  const fetchAllData = async () => {
    try {
      const [managerRes, employeesRes, projectsRes, tasksRes] = await Promise.all([
        fetch("http://localhost:3001/api/Manager/", { method: "POST",credentials: "include", body: JSON.stringify({ id: userId }) }),
        fetch("http://localhost:3001/api/Manager/employees", { method: "POST",credentials: "include", body: JSON.stringify({ id: userId }) }),
        fetch("http://localhost:3001/api/Manager/projects", { method: "POST",credentials: "include", body: JSON.stringify({ id: userId }) }),
        fetch("http://localhost:3001/api/Manager/tasks", { method: "POST",credentials: "include", body: JSON.stringify({ id: userId }) })
      ]);
      console.log(managerRes)
      const [managerData, employeesData, projectsData, tasksData] = await Promise.all([
        managerRes.json(),
        employeesRes.json(),
        projectsRes.json(),
        tasksRes.json()
      ]);
      
      setManager(transformManagerData(managerData));
      setEmployeeData(transformEmployeeData(employeesData));
      setProjectData(transformProjectData(projectsData));
      setTaskData(transformTaskData(tasksData));

      console.log("employee data ",employeeData)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to transform manager data into an object
  const transformManagerData = (data) => {
    return data.map(manager => new Manager(manager.id, manager.name, manager.email));
  };

  // Function to transform employee data into an object
  const transformEmployeeData = (data) => {
    return data.map(employee => new Employee(
      employee.id,
      employee.name,
      employee.position,
      employee.manager_id,
      [] // Placeholder for tasks
    ));
  };

  // Function to transform task data into an object
  const transformTaskData = (data) => {
    return data.map(task => new Task(
      task.id,
      task.description,
      task.deadline,
      task.urgency,
      task.completed,
      task.employee_id
    ));
  };

  // Function to transform project data into an object
  const transformProjectData = (data) => {
    return data.map(project => new Project(
      project.id,
      project.name,
      project.owner_id,
      project.description,
      project.start_date,
      project.end_date,
      [] // Placeholder for tasks
    ));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ManagerContext.Provider value={{ manager, employeeData, projectData, taskData }}>
      {children}
    </ManagerContext.Provider>
  );
};

export const useManager = () => useContext(ManagerContext);
