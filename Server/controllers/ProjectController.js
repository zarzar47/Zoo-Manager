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
      .status(500)
      .json({ message: `Error fetching Projects, error code ${err}` });
  }
}

async function findManagedProjects(req, res) {
  const { id } = req.body;
  try {
    const projects = await listManagerProjects(id);
    res.status(200).json({ data: projects });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error fetching Projects, error code ${err}` });
  }
}

module.exports = { getAllProjects, findManagedProjects };
