import db from "../config/db.js";

const Request = {
  read: (callback) => {
    const sql = "SELECT * FROM admin_request";
    db.query(sql, callback);
  },
  readById: (id, callback) => {
    const sql = "SELECT * FROM admin_request WHERE request_id = ?";
    db.query(sql, [id], callback);
  },
  insertAdmin: (data, callback) => {
    const sql =
      "INSERT INTO admin_details (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [data.name, data.email, data.password, data.role],
      callback
    );
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM admin_request WHERE request_id = ?";
    db.query(sql, [id], callback);
  },
};

export default Request;
