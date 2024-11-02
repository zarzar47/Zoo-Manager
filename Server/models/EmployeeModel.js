const oracledb = require("oracledb");

async function listAllEmployees() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM employees`);
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
  listAllEmployees,
};
