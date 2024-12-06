const { InsertComplaint, selectManagerComplaints } = require("../models/complaintModel");

async function getManagerComplaint(req, res) {
  const { id } = req.body
  try {
    const complaints = await selectManagerComplaints(id);
    res.json({ data: complaints });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500);
  }
}

async function AddComplaint(req, res) {
  const { id  } = req.body
  try {
    const tasks = await InsertComplaint(id);
    res.json({ data: tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500);
  }
}

module.exports = { 
  getManagerComplaint,
  AddComplaint,
};
