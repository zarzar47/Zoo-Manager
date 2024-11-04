const oracledb = require("oracledb");

async function listAllTasks() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM tasks`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function numTasks() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT count(*) FROM tasks`);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function empTask(emp_id) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `select task_id, task_desc, assigned_time, reserveId, urgency from assignments
     inner join employees using (emp_id) 
     inner join tasks using (task_id) where emp_id = ${emp_id}`
    );
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
  listAllTasks,
  numTasks,
  empTask,
};
