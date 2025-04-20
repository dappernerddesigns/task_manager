const db = require("../db/connection");

exports.fetchTasks = async (queries) => {
  const { status, sorted_by, order } = queries;

  const values = [];
  let queryStr = `SELECT * FROM tasks`;
  if (status) {
    queryStr += ` WHERE status=$1`;
    values.push(status);
  }
  if (sorted_by) {
    if (sorted_by === "due") {
      const direction = order ? order : "ASC";
      queryStr += ` ORDER BY due ${direction}`;
    } else {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
  }

  const { rows } = await db.query(queryStr, values);
  return rows;
};

exports.addTask = async ({ title, description, status, due }) => {
  const queryStr = `INSERT INTO tasks(title, description,status,due) VALUES( $1,$2,$3,$4) RETURNING *`;
  const { rows } = await db.query(queryStr, [title, description, status, due]);
  return rows[0];
};

exports.fetchTask = async (id) => {
  const { rows } = await db.query(`SELECT * FROM tasks WHERE id=$1`, [id]);
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Task Not Found" });
  }
  return rows[0];
};

exports.editTask = async (id, updates) => {
  const values = [];
  let queryStrBuilder = `UPDATE tasks SET `;

  for (key in updates) {
    values.push(updates[key]);
    queryStrBuilder += `${key}=$${values.length},`;
  }
  values.push(id);
  let queryStr = queryStrBuilder.replace(/.$/, "");
  queryStr += ` WHERE id=$${values.length} RETURNING *`;
  const { rows } = await db.query(queryStr, values);

  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Task Not Found" });
  }
  return rows[0];
};

exports.deleteTask = async (id) => {
  const { rows } = await db.query(`DELETE FROM tasks WHERE id=$1 RETURNING *`, [
    id,
  ]);
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Task Not Found" });
  }
};
