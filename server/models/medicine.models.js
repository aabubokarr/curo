import db from "../config/db.js";

const Medicine = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO medicine (medicine_name, medicine_quantity, medicine_price) VALUES (?, ?, ?)";
    db.query(
      sql,
      [data.medicine_name, data.medicine_quantity, data.medicine_price],
      callback
    );
  },
  read: (callback) => {
    const sql =
      "SELECT medicine_id, medicine_name, medicine_quantity, medicine_price, (medicine_quantity*medicine_price) AS total FROM medicine";
    db.query(sql, callback);
  },
  readById: (id, callback) => {
    const sql = "SELECT * FROM medicine WHERE medicine_id = ?";
    db.query(sql, [id], callback);
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

    const sql = `UPDATE medicine SET ${updates.join(
      ", "
    )} WHERE medicine_id = ?`;
    values.push(id);
    db.query(sql, values, callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM medicine WHERE medicine_id = ?";
    db.query(sql, [id], callback);
  },
};

export default Medicine;
