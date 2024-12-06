const oracledb = require("oracledb");

async function UserExists({ email }) { // this will work
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

async function PasswordChange({ email, new_password }) { // this will work
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
