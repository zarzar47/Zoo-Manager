const oracledb = require("oracledb");

async function listAllProjects() { // this is kinda useless but good as a boilerplate
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT ProjectDetail, 
      TO_CHAR(StartDate, 'YYYY-MM-DD') as StartDate, 
      TO_CHAR(estEndDate, 'YYYY-MM-DD') as estEndDate, 
      M.name FROM projects P
      inner join Managers M ON (M.manager_id = P.manager_id)`);
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

async function SelectReserve() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`select * from reserves`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function selectEmpProjects(employeeID) {
  let conn;
  try {
    conn = await oracledb.getConnection();

    // Call the SQL function
    const result = await conn.execute(
      `
      BEGIN
        :cursor := GET_EMPLOYEE_PROJECT(:EMPLOYEE_ID);
      END;
      `,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }, // Bind a cursor for the result
        EMPLOYEE_ID: employeeID, // Bind the employee ID
      }
    );

    // Fetch rows from the cursor
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows(); // Get all rows
    await resultSet.close(); // Close the cursor

    return rows; // Return the fetched rows
  } catch (err) {
    console.error("Error fetching employee's project:", err);
    throw err; // Re-throw the error
  } finally {
    if (conn) {
      await conn.close(); // Close the connection
    }
  }
}

async function UpdateAddProject(employeeID){
  let conn;
  oracledb.autoCommit = true;
  try {
    conn = await oracledb.getConnection();

    const result = await conn.execute(
      `
      BEGIN
        AssignEmployeeToProject(:emp_id);
      END;
      `, [employeeID]
    );
    return "success"
  } catch (err) {
    console.error("Error Adding employee's project:", err);
    throw err; // Re-throw the error
  } finally {
    if (conn) {
      await conn.close(); // Close the connection
    }
  }
}

async function InsertProject(ProjectDetes){
  let conn;
  oracledb.autoCommit = true;
  try {
    conn = await oracledb.getConnection();
    console.log("adding project")
    const result = await conn.execute(
      `
      BEGIN
        AddProject(:ProjectName, :managerID);
      END;
      `, {
        ProjectName : ProjectDetes.projectName,
        managerID : ProjectDetes.manager_id,
      }
    );
    return "success"
  } catch (err) {
    console.error("Error Adding project:", err);
    throw err; // Re-throw the error
  } finally {
    if (conn) {
      await conn.close(); // Close the connection
    }
  }
}

module.exports = {
  listAllProjects,
  numProjects,
  listManagerProjects,
  selectEmpProjects,
  UpdateAddProject,
  InsertProject,
  SelectReserve
};
