const oracledb = require("oracledb");

async function listAllProjects() { // this is kinda useless but good as a boilerplate
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM projects`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function listManagerProjects(ID) { // this will work
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `SELECT ProjectDetail, TO_CHAR(StartDate, 'YYYY-MM-DD') as StartDate, TO_CHAR(estEndDate, 'YYYY-MM-DD') as estEndDate, Manager_id FROM projects WHERE manager_id = ${ID}`
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

async function numProjects() { // this will work
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT count(*) FROM projects`);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

module.exports = {
  listAllProjects,
  numProjects,
  listManagerProjects,
};
