const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController");

router.get("/Projects", ProjectController.getAllProjects);
router.post("/getProjects", ProjectController.getEmpProject);
router.post("/AddToProject", ProjectController.AddToProject);
router.post("/AddProject", ProjectController.AddProject);

module.exports = router;
