const e = require("express");
const oracledb = require("oracledb");

async function listAllEmployees() { // this is kinda useless but good as a boilerplate
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`
      SELECT E.emp_id, E.name,E.Email,E.hire_date, M.name, E.project_id, E.phoneNum  
      FROM Employees E 
      inner join managers M USING (manager_id)`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function selectEmployee(emp_id) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`
      SELECT E.emp_id, E.name, E.Email, E.hire_date, M.name, E.project_id, E.phoneNum  
      FROM Employees E 
      inner join managers M USING (manager_id) WHERE emp_id = '${emp_id}'`);
    return result.rows[0];
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
      `SELECT emp_id, name, email, hire_date, project_id, phoneNum
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

async function listManagerInfo(){
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM Managers`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function InsertEmployee(EmployeeDete){
  let conn;
  oracledb.autoCommit = true;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`
      BEGIN
        AddingEmployees(:name, :email, :phoneNum, :managerID);
      END;
      `,{
        name: EmployeeDete.name,
        email: EmployeeDete.email,
        phoneNum : EmployeeDete.phoneNum,
        managerID : EmployeeDete.managerID,
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

async function bestEmployee(){
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `
      SELECT GetBestEmployee() AS employee_id FROM dual
      `
    );
    return result.rows[0]
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function insertManager(ManagerDetes){
  let conn;
  oracledb.autoCommit = true;
  console.log("Manager detes ",ManagerDetes)
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`
      BEGIN
        AddManager(:Lname, :Lemail);
      END;
      `,{
        Lname: ManagerDetes.name,
        Lemail: ManagerDetes.email,
      });
    console.log("This going")
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
  listAllEmployees,
  numEmployees,
  FindManager,
  listManagerEmployees,
  listManagerInfo,
  InsertEmployee,
  bestEmployee,
  selectEmployee,
  insertManager
};
