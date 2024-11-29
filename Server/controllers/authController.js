const { UserExists, PasswordChange } = require("../models/authModel");

async function findUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserExists({ email });
      console.log(password);
      console.log(user[2]);
    if (!user || user[2] !== password) {
      return res.status(401).json({
        message: "Invalid username or password",
        error: "Invalid username or password",
      });
    }
    req.session.user = {username : user[0], role: user[3]};
    req.session.save((err) => { 
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Could not save session" });
      }
      return res
      .status(200)
      .json({ message: "Login successful", status: user[3], id: user[0] });
    });
    // console.log("Sent session: ", JSON.stringify(req.session, null, 2));
  } catch (err) {
    res.status(400).json({ error: "An error occurred during login" });
  }
}

async function changePassword(req, res) {
  const { email, new_password } = req.body;
  console.log(req.body);
  try{
    const user = await UserExists({ email });
    if (!user){
      return res.status(401).json({
        error: "Invalid email",
      });
    }
    console.log("user exits");
    const new_user = await PasswordChange({email, new_password});
    if (new_user.rowsAffected != 0)
      return res.status(200).json({message: "Password change successful"});
    else return res.status(400).json({ error: "An error occurred during password change" });
  } catch (err) {
    res.status(400).json({ error: "An error occurred during password change" });
  }
}

module.exports = { findUser, changePassword };
