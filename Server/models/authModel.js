const oracledb = require("oracledb");

async function UserExists({ email }) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `SELECT * FROM LoginDatabase WHERE email = '${email}'`
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

module.exports = { UserExists };
