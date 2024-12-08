const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/employees", employeeController.getAllEmployees);
router.get("/employees/Best", employeeController.getBestEmployee);
router.post("/getemployee", employeeController.getEmployee);

module.exports = router;
