import db from "../config/db.js";

const Test = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO test (treatment_id, test_name, test_cost) VALUES (?, ?, ?)";
    db.query(
      sql,
      [data.treatment_id, data.test_name, data.test_cost],
      callback
    );
  },
  read: (callback) => {
    const sql = "SELECT * FROM test";
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

    if (updates.length === 0) {
      return callback({ message: "No fields to update" });
    }

    const sql = `UPDATE test SET ${updates.join(", ")} WHERE test_id = ?`;
    values.push(id);
    db.query(sql, values, callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM test WHERE test_id = ?";
    db.query(sql, [id], callback);
  },
};

export default Test;
