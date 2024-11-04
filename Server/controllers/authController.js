const { UserExists } = require("../models/authModel");

async function findUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await UserExists({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid username or password",
        error: "Invalid username or password",
      });
    }

    req.session.userId = user.id;
    res
      .status(200)
      .json({ message: "Login successful", status: user.status, id: user.id });
  } catch (err) {
    res.status(400).json({ error: "An error occurred during login" });
  }
}

module.exports = { findUser };
