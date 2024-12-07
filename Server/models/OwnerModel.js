const oracledb = require("oracledb");

async function SelectOwner(ownerid) { // this is kinda useless but good as a boilerplate
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM Owners where OwnerID = :id`, [ownerid]);
    return result.rows[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}


module.exports = {
  SelectOwner
};
