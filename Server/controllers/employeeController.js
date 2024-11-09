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
      .status(500)
      .json({ message: `Error fetching employees, error code ${err}` });
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
      .status(500)
      .json({ message: `Error fetching employee, error code ${err}` });
  }
}

async function findManagedEmployees(req, res) {
  const { id } = req.body;
  try {
    const employees = await listManagerEmployees(id);
    res.status(200).json({ data: employees });
  } catch (err) {
    res
      .status(400)
      .json({ error: "An error occurred during manager employee search up" });
  }
}

async function findManagerInfo(req, res) {
  const { id } = req.body;
  try {
    const manager = await FindManager(id);
    res.status(200).json({ data: manager });
  } catch (err) {
    res
      .status(400)
      .json({ error: "An error occurred during manager info search up" });
  }
}

module.exports = {
  getAllEmployees,
  getEmployee,
  findManagedEmployees,
  findManagerInfo,
};
