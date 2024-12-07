const { InsertComplaint, selectManagerComplaints, deleteComplaint } = require("../models/complaintModel");

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
  const { id, complaint } = req.body
  try {
    const result = await InsertComplaint({id, complaint});
    res.status(200);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500);
  }
}

async function RemoveComplaint(req, res) {
  const { id } = req.body
  console.log("got here in the first place ", id)
  try {
    const result = await deleteComplaint(id);
    res.status(200);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500);
  }
}

module.exports = { 
  getManagerComplaint,
  AddComplaint,
  RemoveComplaint,
};
