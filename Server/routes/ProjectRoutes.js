const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController");

router.get("/Projects", ProjectController.getAllProjects);
router.post("/getProjects", ProjectController.getEmpProject);

module.exports = router;
