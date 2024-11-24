const {
  listAllProjects,
  listManagerProjects,
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

module.exports = { getAllProjects, findManagedProjects };
