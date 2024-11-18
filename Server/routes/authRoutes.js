const express = require("express");
const router = express.Router();
const users = require("../server");
const { findUser } = require("../controllers/authController");

router.post("/login", findUser);
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out" });
      });
});

module.exports = router;
