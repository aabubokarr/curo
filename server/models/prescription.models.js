import db from "../config/db.js";

const Prescription = {
  create: (data, callback) => {
    const { patient_id, doctor_id, medicines } = data;

    const insertPrescriptionSql =
      "INSERT INTO prescription (patient_id, doctor_id) VALUES (?, ?)";

    db.query(insertPrescriptionSql, [patient_id, doctor_id], (err, result) => {
      if (err) {
        return callback(err);
      }

      const prescriptionId = result.insertId;

      // Insert medicines
      const medicineInserts = medicines.map((medicineName) => {
        const sql =
          "INSERT INTO prescription_medicines (prescription_id, medicine_name) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
          db.query(sql, [prescriptionId, medicineName], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      });

      Promise.all(medicineInserts)
        .then(() => {
          callback(null, {
            prescriptionId,
            patient_id,
            doctor_id,
            medicines,
          });
        })
        .catch((err) => {
          callback(err);
        });
    });
  },

  getByDoctor: (doctorId, callback) => {
    const sql = "SELECT * FROM prescription WHERE doctor_id = ?";
    db.query(sql, [doctorId], callback);
  },

  getByPatient: (patientId, callback) => {
    const sql = "SELECT * FROM prescription WHERE patient_id = ?";
    db.query(sql, [patientId], callback);
  },

  getById: (prescriptionId, callback) => {
    const sql = `
      SELECT 
        p.prescription_id, 
        p.patient_id, 
        p.doctor_id, 
        pd.name AS patient_name,
        dd.name AS doctor_name, 
        pm.medicine_name
      FROM prescription p
      JOIN patient_details pd ON p.patient_id = pd.patient_id
      JOIN doctor_details dd ON p.doctor_id = dd.doctor_id
      LEFT JOIN prescription_medicines pm ON p.prescription_id = pm.prescription_id
      WHERE p.prescription_id = ?
    `;
    db.query(sql, [prescriptionId], callback);
  },

  update: (id, data, callback) => {
    const updates = [];
    const values = [];

    if (data.patient_id) {
      updates.push("patient_id = ?");
      values.push(data.patient_id);
    }
    if (data.doctor_id) {
      updates.push("doctor_id = ?");
      values.push(data.doctor_id);
    }

    if (updates.length === 0) {
      return callback({ message: "No fields to update" });
    }

    const sql = `UPDATE prescription SET ${updates.join(
      ", "
    )} WHERE prescription_id = ?`;
    values.push(id);
    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM prescription WHERE prescription_id = ?";
    db.query(sql, [id], callback);
  },

  // Additional method to update medicines separately if needed
  updateMedicines: (prescriptionId, medicines, callback) => {
    // First delete existing medicines
    const deleteSql =
      "DELETE FROM prescription_medicines WHERE prescription_id = ?";

    db.query(deleteSql, [prescriptionId], (err) => {
      if (err) return callback(err);

      // Then insert new medicines
      const medicineInserts = medicines.map((medicineName) => {
        const sql =
          "INSERT INTO prescription_medicines (prescription_id, medicine_name) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
          db.query(sql, [prescriptionId, medicineName], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      });

      Promise.all(medicineInserts)
        .then(() =>
          callback(null, { message: "Medicines updated successfully" })
        )
        .catch((err) => callback(err));
    });
  },
};

export default Prescription;
