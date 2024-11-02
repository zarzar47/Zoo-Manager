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

module.exports = { getAllEmployees };
