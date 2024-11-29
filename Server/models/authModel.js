const oracledb = require("oracledb");

async function UserExists({ email }) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `SELECT * FROM LoginDatabase WHERE email = '${email}'`
    );
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function PasswordChange({ email, new_password }) {
  let conn;
  oracledb.autoCommit = true;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `UPDATE LOGINDATABASE SET L_Password = '${new_password}' WHERE email = '${email}'`,
    );
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

module.exports = { UserExists, PasswordChange };
