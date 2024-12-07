const {SelectOwner} = require("../models/OwnerModel");

async function findOwnerDetails(req, res) {
  const { id } = req.body
  try {
    const ownerData = await SelectOwner(id);
    res.json({ data: ownerData });
  } catch (err) {
    res
      .status(500);
  }
}

module.exports = {
  findOwnerDetails,
};
