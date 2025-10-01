import db from "../config/db.js";

const Service = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO service (treatment_id, service_name, service_cost) VALUES (?, ?, ?)";
    db.query(
      sql,
      [data.treatment_id, data.service_name, data.service_cost],
      callback
    );
  },
  read: (callback) => {
    const sql = "SELECT * FROM service";
    db.query(sql, callback);
  },
  readById: (id, callback) => {
    const sql = "SELECT * FROM service WHERE service_id = ?";
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

    const sql = `UPDATE service SET ${updates.join(", ")} WHERE service_id = ?`;
    values.push(id);
    db.query(sql, values, callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM service WHERE service_id = ?";
    db.query(sql, [id], callback);
  },
};

export default Service;
