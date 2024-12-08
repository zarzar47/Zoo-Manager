const oracledb = require("oracledb");

async function listAllTasks() { // boilerplate 
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`
      SELECT 
        Tasks_id,
        taskdesc, 
        TO_CHAR(time, ' DD-MM-YY HH:MI:SS AM') AS task_time, 
        RID, 
        urgency, 
        completed,
        E.name
      FROM tasks T inner join Employees E on (E.emp_id = T.employeeid)`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function numTasks() { // this will work
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

    // Use parameterized query to prevent SQL injection
    const result = await conn.execute(
      `SELECT 
        Tasks_id,
        taskdesc, 
        TO_CHAR(time, 'HH:MI:SS AM') AS task_time, 
        RID, 
        urgency, 
        completed
      FROM tasks T
      INNER JOIN employees E ON T.employeeID = E.emp_id
      WHERE E.emp_id = :emp_id`, 
      [emp_id]
    );
    return result.rows;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}


async function ManagerTask(MANAGER_ID) {
  let conn;
  try {
    conn = await oracledb.getConnection();

    const result = await conn.execute(
      `BEGIN :result := GetTasksForManager(:manager_id); END;`,
      {
        result: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
        manager_id: MANAGER_ID
      }
    );

    const tasks = [];
    const cursor = result.outBinds.result;
    let row;
    
    if (!cursor) {
      console.error("Cursor is not valid");
      return [];
    }

    while ((row = await cursor.getRow())) {
      if (!row) {
        break; // Break the loop if no rows are fetched
      }
      tasks.push({
        task_id : row[0],
        task_desc: row[1],
        task_time: row[2],
        task_urgency: row[3],
        task_completed: row[4],
        task_employee: row[5]
      });
    }

    // Close the cursor
    await cursor.close();

    return tasks;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function InsertTask(taskdetails)
{
  let conn;
  oracledb.autoCommit = true;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `BEGIN
        AddingTasks(:TaskDesc, SYSDATE, :RID, :employeeID, :urgency);
      END;`
    , {
      TaskDesc: taskdetails.description,
      RID: taskdetails.reserveId,
      employeeID: taskdetails.employeeId,
      urgency: taskdetails.urgency
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

async function deleteTask(taskID) {
  let conn;
  oracledb.autoCommit = true;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `BEGIN
        removingTasks(:TaskID);
      END;`
    , {
      TaskID: taskID,
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

async function UpdateTask(EditedTaskDetes) {
  let conn;
  oracledb.autoCommit = true;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `BEGIN
        UpdateTask(:taskid, :descrip, :RID, :urgency);
      END;`
    , {
      taskid: EditedTaskDetes.id,
      descrip : EditedTaskDetes.description,
      urgency: EditedTaskDetes.urgency,
      RID: EditedTaskDetes.reserveNo
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

async function UpdateTaskCompletion(TaskDetes){
  let conn;
  oracledb.autoCommit = true;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `Update Tasks set completed = :status where Tasks_id = :taskid`
    , {
      taskid: TaskDetes.id,
      status: TaskDetes.completionStatus,
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

module.exports = {
  listAllTasks,
  numTasks,
  empTask,
  ManagerTask,
  InsertTask,
  deleteTask,
  UpdateTask,
  UpdateTaskCompletion
};
