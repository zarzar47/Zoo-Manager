const express = require("express");
const router = express.Router();
const taskController = require("../controllers/TaskController");

router.get("/Tasks", taskController.getAllTasks);
router.post("/TasksEmp", taskController.getEmployeeTasks);
router.post("/AddTask", taskController.addTask)
router.post("/RemoveTask", taskController.removeTask)
router.post("/EditTask", taskController.EditTask)
module.exports = router;
