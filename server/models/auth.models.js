import db from "../config/db.js";

const Auth = {
  login: (email, callback) => {
    const sql =
      "SELECT admin_id AS user_id, name, email, password, role FROM admin_details WHERE email = ? UNION ALL SELECT doctor_id AS user_id, name, email, password, role FROM doctor_details WHERE email = ? UNION ALL SELECT patient_id AS user_id, name, email, password, role FROM patient_details WHERE email = ?";
    db.query(sql, [email, email, email], callback);
  },
  register: (data, callback) => {
    const sql =
      "INSERT INTO admin_request (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [data.name, data.email, data.password, data.role], callback);
  },
};

export default Auth;
