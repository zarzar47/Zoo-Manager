const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/employees", employeeController.getAllEmployees);

module.exports = router;
