const express = require("express");
const router = express.Router();
const users = require("../server");
const {
  findManagedEmployees,
  findManagerInfo,
} = require("../controllers/employeeController");
const { findManagedProjects } = require("../controllers/ProjectController");
const { getManagerTasks } = require("../controllers/TaskController");

router.post("/employees", findManagedEmployees);
router.post("/projects", findManagedProjects);
router.post("/tasks", getManagerTasks);
router.post("/", findManagerInfo);
module.exports = router;
