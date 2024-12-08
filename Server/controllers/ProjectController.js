const {
  listAllProjects,
  listManagerProjects,
  selectEmpProjects,
  UpdateAddProject,
  InsertProject,
  SelectReserve
} = require("../models/ProjectModel");

async function getAllProjects(req, res) {
  try {
    const projects = await listAllProjects();
    res.json({ data: projects });
  } catch (err) {
    res
      .status(500);
  }
}

async function findManagedProjects(req, res) {
  const { id } = req.body;
  try {
    const projects = await listManagerProjects(id);
    res.status(200).json({ data: projects });
  } catch (err) {
    res
      .status(500);
  }
}

async function getEmpProject(req, res){
  const { id } = req.body;
  try {
    const projects = await selectEmpProjects(id);
    res.status(200).json({ data: projects });
  } catch (err) {
    res
      .status(500);
  }
}

async function AddToProject(req, res){
  const { id } = req.body;
  try {
    const projects = await UpdateAddProject(id);
    res.status(200).json({ data: projects });
  } catch (err) {
    res
      .status(500);
  }
}

async function AddProject(req, res){
  const { projectName, manager_id } = req.body;
  try {
    const projects = await InsertProject({projectName, manager_id});
    res.status(200);
  } catch (err) {
    res
      .status(500);
  }
}

async function getReserveInfo(req, res) {
  try {
    const reserveInfo = await SelectReserve();
    res.json({ data : reserveInfo})
  } catch (e){
    console.log("There was some issue retriving reserve info")
    res.status(500)
  }
}

module.exports = { getAllProjects, findManagedProjects, getEmpProject, AddToProject, AddProject, getReserveInfo };
