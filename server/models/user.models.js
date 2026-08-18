import db from "../config/db.js";

const User = {
  getUserByIdAndRole: (userId, role, callback) => {
    let sql;
    if (role === "admin") {
      sql =
        "SELECT admin_id AS user_id, name, email FROM admin_details WHERE admin_id = ?";
    } else if (role === "doctor") {
      sql =
        "SELECT doctor_id AS user_id, name, email FROM doctor_details WHERE doctor_id = ?";
    } else if (role === "patient") {
      sql =
        "SELECT patient_id AS user_id, name, email FROM patient_details WHERE patient_id = ?";
    } else {
      return callback({ message: "Invalid role" });
    }

    db.query(sql, [userId], callback);
  },

  getUserCount: (callback) => {
    const sql =
      "SELECT SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS doc_male, SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS doc_female, (SELECT SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) FROM patient_details) AS pat_male, (SELECT SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) FROM patient_details) AS pat_female FROM doctor_details;";
    db.query(sql, callback);
  },
};

export default User;
