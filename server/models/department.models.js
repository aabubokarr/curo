import db from "../config/db.js";

const Department = {
  create: (data, callback) => {
    const sql = "INSERT INTO department (dept_name) VALUES (?)";
    db.query(sql, data.dept_name, callback);
  },
  read: (callback) => {
    const sql =
      "SELECT * FROM department";
    db.query(sql, callback);
  },
  update: (id, data, callback) => {
    const updates = [];
    const values = [];

    Object.keys(data).forEach((key) => {
      if (data[key] !== "" && data[key] !== null && data[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(data[key]);
      }
    });

    const sql = `UPDATE department SET ${updates.join(", ")} WHERE dept_id = ?`;
    values.push(id);
    db.query(sql, values, callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM department WHERE dept_id = ?";
    db.query(sql, [id], callback);
  },
};

export default Department;
