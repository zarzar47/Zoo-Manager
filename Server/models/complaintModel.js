const oracledb = require("oracledb");

async function selectManagerComplaints(id) {
  let conn;
  try {
    conn = await oracledb.getConnection();

    // Use bind parameters to avoid SQL injection and type mismatches
    const result = await conn.execute(
      `SELECT * FROM complaints WHERE manager_id = :id`,
      [id]
    );
    return result.rows;
  } catch (err) {
    console.error("Error executing query: ", err);
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function InsertComplaint(complaintDetes) { // boilerplate 
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`
      SELECT * FROM complaints WHERE manager_id = '${id}'
    `);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}


module.exports = {
  selectManagerComplaints,
  InsertComplaint,
};
