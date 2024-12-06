const oracledb = require("oracledb");

async function listAllEmployees() { // this is kinda useless but good as a boilerplate
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM Employees`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function numEmployees() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT count(*) FROM employees`);
    return result.rows[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function FindManager(id) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `SELECT * FROM managers where manager_id = ${id}`
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

async function listManagerEmployees(id) { // this will work
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `SELECT emp_id, name, email, TO_CHAR(hire_date, 'YY-MM-DD') as hiredate, project_id, phoneNum
       FROM employees where manager_id = ${id}`
    );
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
  numEmployees,
  FindManager,
  listManagerEmployees,
};
