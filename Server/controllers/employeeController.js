const {
  listAllEmployees,
  FindManager,
  listManagerEmployees,
  listManagerInfo,
  InsertEmployee,
  bestEmployee,
  selectEmployee,
  insertManager
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
    const employee = await selectEmployee(id);
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

async function allManagersInfo(req, res){
  try {
    const managers = await listManagerInfo();
    res.status(200).json({ data: managers });
  } catch (err) {
    res
      .status(400);
  }
}

async function addEmployee(req, res){
  const {name, email, phoneNum, managerID} = req.body;
  try {
    const result = await InsertEmployee({name, email, phoneNum, managerID});
    res.status(200).json({ data: result });
  } catch (err) {
    res
      .status(400);
  }
}

async function getBestEmployee(req, res){
  try {
    const result = await bestEmployee();
    res.status(200).json({ data: result });
  } catch (err) {
    res
      .status(400);
  }
}

async function addManager(req, res){
  const {name, email} = req.body
  try {
    const result = await insertManager({name, email});
    res.status(200).json({data : "wow"});
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
  allManagersInfo,
  addEmployee,
  getBestEmployee,
  addManager
};
