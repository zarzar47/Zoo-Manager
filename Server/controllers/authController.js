const { UserExists } = require("../models/authModel");

async function findUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserExists({ email });

    if (!user || user[2] !== password) {
      return res.status(401).json({
        message: "Invalid username or password",
        error: "Invalid username or password",
      });
    }
    req.session.userId = user[0];
    res
      .status(200)
      .json({ message: "Login successful", status: user[3], id: user[0] });
  } catch (err) {
    res.status(400).json({ error: "An error occurred during login" });
  }
}

module.exports = { findUser };
