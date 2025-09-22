import db from "../config/db.js";

const Appointment = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO appointment (doctor_id, patient_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [
        data.doctor_id,
        data.patient_id,
        data.appointment_date,
        data.appointment_time,
      ],
      callback
    );
  },
  read: (callback) => {
    const sql =
      "SELECT appointment_id, doc.name AS doctor_name, pat.name AS patient_name, appointment_date, appointment_time FROM appointment AS app, doctor_details AS doc, patient_details AS pat WHERE doc.doctor_id = app.doctor_id AND pat.patient_id = app.patient_id";
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

    if(updates.length === 0){
      return callback({message: "No fields to update"})
    }

    const sql = `UPDATE appointment SET ${updates.join(
      ", "
    )} WHERE appointment_id = ?`;
    values.push(id);
    db.query(sql, values, callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM appointment WHERE appointment_id = ?";
    db.query(sql, [id], callback);
  },
};

export default Appointment;
