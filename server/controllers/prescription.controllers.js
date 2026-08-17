import Prescription from "../models/prescription.models.js";

export const createPrescription = (req, res) => {
  const { patient_id, doctor_id, medicines } = req.body;

  if (!Array.isArray(medicines) || medicines.length === 0) {
    return res.status(400).json({
      error: "At least one medicine must be provided.",
    });
  }

  Prescription.create({ patient_id, doctor_id, medicines }, (err, results) => {
    if (err) {
      console.error("Error creating prescription:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(201).json({
      message: "Prescription created successfully",
      prescription_id: results.prescriptionId,
      patient_id: results.patient_id,
      doctor_id: results.doctor_id,
      medicines: results.medicines,
    });
  });
};

export const getDoctorPrescriptions = (req, res) => {
  const doctorId = req.user.userId;

  Prescription.getByDoctor(doctorId, (err, results) => {
    if (err) {
      console.error("Error fetching prescriptions:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json(results);
  });
};

export const getPatientPrescriptions = (req, res) => {
  const patientId = req.user.userId;

  Prescription.getByPatient(patientId, (err, results) => {
    if (err) {
      console.error("Error fetching prescriptions:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json(results);
  });
};

export const getPrescriptionById = (req, res) => {
  const { prescriptionId } = req.params;

  Prescription.getById(prescriptionId, (err, results) => {
    if (err) {
      console.error("Error fetching prescription details:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    const prescription = {
      prescription_id: results[0].prescription_id,
      patient_id: results[0].patient_id,
      doctor_id: results[0].doctor_id,
      patient_name: results[0].patient_name,
      doctor_name: results[0].doctor_name,
      medicines: results
        .map((row) => row.medicine_name)
        .filter((name) => name !== null),
    };

    res.status(200).json(prescription);
  });
};

export const updatePrescription = (req, res) => {
  const { id } = req.params;

  Prescription.update(id, req.body, (err, results) => {
    if (err) {
      console.error("Error updating prescription:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    return res.status(200).json({
      message: "Prescription updated successfully",
    });
  });
};

export const deletePrescription = (req, res) => {
  const { id } = req.params;

  Prescription.delete(id, (err, results) => {
    if (err) {
      console.error("Error deleting prescription:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    return res.status(200).json({
      message: "Prescription deleted successfully",
    });
  });
};
