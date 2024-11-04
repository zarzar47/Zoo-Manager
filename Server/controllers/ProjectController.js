const { listAllProjects } = require("../models/ProjectModel");

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

module.exports = { getAllProjects };
