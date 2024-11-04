const express = require("express");
const router = express.Router();
const users = require("../server");
const { findUser } = require("../controllers/authController");

router.post("/login", findUser);

module.exports = router;
