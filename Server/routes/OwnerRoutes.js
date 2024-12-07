const express = require("express");
const router = express.Router();
const users = require("../server");
const OwnerController = require("../controllers/OwnerController");

router.post("/Info", OwnerController.findOwnerDetails);
module.exports = router;
