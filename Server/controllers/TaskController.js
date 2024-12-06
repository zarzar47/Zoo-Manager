const { listAllTasks, empTask, InsertTask, deleteTask, UpdateTask, UpdateTaskCompletion } = require("../models/TaskModel");
const { ManagerTask } = require("../models/TaskModel");

async function getAllTasks(req, res) {
  try {
    const tasks = await listAllTasks();
    res.json({ data: tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500);
  }
}

async function getEmployeeTasks(req, res) {
  const { id } = req.body;
  try {
    const result = await empTask(id);
    res.json({ data: result });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500);
  }
}

async function getManagerTasks(req, res) {
  const { id } = req.body;
  try {
    const empTasks = await ManagerTask(id);
    res.json({ data: empTasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addTask(req, res){
  const { description, urgency, reserveId, employeeId } = req.body;
  try {
    const result = await InsertTask({ description, urgency, reserveId, employeeId });
    res.json({ result: result });
  } catch (err) {
    console.error("Error adding tasks:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function removeTask(req, res){
  const { id } = req.body;
  try {
    const result = await deleteTask(id);
    res.json({ result: result });
  } catch (err) {
    console.error("Error adding tasks:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function EditTask(req, res){
  const { id, description, urgency, reserveNo } = req.body;
  try {
    const result = await UpdateTask({id, description, urgency, reserveNo});
    res.json({ result: result });
  } catch (err) {
    console.error("Error editing tasks:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function CompleteTask(req, res){
  const { id, completionStatus } = req.body;
  try {
    const result = await UpdateTaskCompletion({id, completionStatus});
    res.json({ result: result });
  } catch (err) {
    console.error("Error editing tasks:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { 
  getAllTasks, 
  getEmployeeTasks, 
  getManagerTasks, 
  addTask, 
  removeTask, 
  EditTask,
  CompleteTask
};
