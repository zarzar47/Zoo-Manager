const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/employees", employeeController.getAllEmployees);
router.post("/getemployee", employeeController.getEmployee);

module.exports = router;
