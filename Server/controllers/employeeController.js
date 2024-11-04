const { listAllEmployees } = require("../models/EmployeeModel");

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

module.exports = { getAllEmployees, getEmployee };
