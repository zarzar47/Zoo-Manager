const {
  listAllEmployees,
  FindManager,
  listManagerEmployees,
} = require("../models/EmployeeModel");

async function getAllEmployees(req, res) {
  try {
    const employees = await listAllEmployees();
    res.json({ data: employees });
  } catch (err) {
    res
      .status(500);
  }
}

async function getEmployee(req, res) {
  const { id } = req.body;
  try {
    const employees = await listAllEmployees();
    const employee = employees.find((employee) => employee[0] === id);
    res.json({ data: employee });
  } catch (err) {
    res
      .status(500);
  }
}

async function findManagedEmployees(req, res) {
  const { id } = req.body;
  try {
    const employees = await listManagerEmployees(id);
    res.status(200).json({ data: employees });
  } catch (err) {
    res
      .status(400);
  }
}

async function findManagerInfo(req, res) {
  const { id } = req.body;
  try {
    const manager = await FindManager(id);
    res.status(200).json({ data: manager });
  } catch (err) {
    res
      .status(400);
  }
}

module.exports = {
  getAllEmployees,
  getEmployee,
  findManagedEmployees,
  findManagerInfo,
};
