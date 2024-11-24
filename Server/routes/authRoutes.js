const express = require("express");
const router = express.Router();
const users = require("../server");
const { findUser, changePassword } = require("../controllers/authController");

router.post("/login", findUser);
router.post("/changePassword", changePassword);
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out" });
      });
});

module.exports = router;
