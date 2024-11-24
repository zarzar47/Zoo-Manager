const { listAllTasks, empTask } = require("../models/TaskModel");
const { ManagerTask } = require("../models/TaskModel");
async function getAllTasks(req, res) {
  try {
    const tasks = await listAllTasks();
    res.json({ data: tasks });
  } catch (err) {
    res
      .status(500);
  }
}

async function getEmployeeTasks(req, res) {
  const { id } = req.body;
  try {
    const empTasks = await empTask(id);
    res.json({ data: empTasks.rows });
  } catch (err) {
    res
      .status(500);
  }
}

async function getManagerTasks(req, res) {
  const { id } = req.body;
  try {
    const empTasks = await ManagerTask(id);
    res.json({ data: empTasks.rows });
  } catch (err) {
    res
      .status(500);
  }
}

module.exports = { getAllTasks, getEmployeeTasks, getManagerTasks };
