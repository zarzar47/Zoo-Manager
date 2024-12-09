const express = require("express");
const router = express.Router();
const users = require("../server");
const {
  findManagedEmployees,
  findManagerInfo,
  allManagersInfo,
  addEmployee,
  addManager
} = require("../controllers/employeeController");
const { findManagedProjects } = require("../controllers/ProjectController");
const { getManagerTasks } = require("../controllers/TaskController");

router.post("/employees", findManagedEmployees);
router.post("/projects", findManagedProjects);
router.post("/tasks", getManagerTasks);
router.post("/", findManagerInfo);
router.get("/all", allManagersInfo);
router.post("/AddEmployee", addEmployee);
router.post("/AddManager", addManager);

module.exports = router;
