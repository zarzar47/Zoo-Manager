const oracledb = require("oracledb");

async function selectManagerComplaints(id) {
  let conn;
  try {
    conn = await oracledb.getConnection();

    // Use bind parameters to avoid SQL injection and type mismatches
    const result = await conn.execute(
      `SELECT C.complaint_num, C.complaint, C.manager_id, E.name FROM complaints C Inner join employees E ON (C.employee_id = E.emp_id) WHERE C.manager_id = :id `,
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
  oracledb.autoCommit = true;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`
      BEGIN
        LogComplaint(:complaint, :emp_id);
      END;`,
      {
      complaint : complaintDetes.complaint,
      emp_id : complaintDetes.id,
      });
    return "success";
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function deleteComplaint(complaint_num){
  let conn;
  oracledb.autoCommit = true;
  console.log("this is the complaint nubmer " +complaint_num)
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`
      delete from complaints where complaint_num = :complaint_id
      `,
      [complaint_num]
    );
    return "success";
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
  deleteComplaint,
};
