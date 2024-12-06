const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");

router.post("/ManagerComplaints", complaintController.getManagerComplaint);
router.post("/PostComplaints", complaintController.AddComplaint);
module.exports = router;
