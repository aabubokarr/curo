import db from "../config/db.js";

const Doctor = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO doctor_details (name, email, phone_no, address, password, gender, speciality, dept_id, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        data.name,
        data.email,
        data.phone_no,
        data.address,
        data.password,
        data.gender,
        data.speciality,
        data.dept_id,
        data.role,
      ],
      callback
    );
  },
  read: (callback) => {
    const sql = "SELECT * FROM doctor_details";
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

    const sql = `UPDATE doctor_details SET ${updates.join(
      ", "
    )} WHERE doctor_id = ?`;
    values.push(id);
    db.query(sql, values, callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM doctor_details WHERE doctor_id = ?";
    db.query(sql, [id], callback);
  },
};

export default Doctor;
