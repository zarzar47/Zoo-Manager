const express = require("express");
const router = express.Router();
const taskController = require("../controllers/TaskController");

router.get("/Tasks", taskController.getAllTasks);
router.post("/TasksEmp", taskController.getEmployeeTasks);

module.exports = router;
