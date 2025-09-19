import Doctor from "../models/doctor.models.js";

export const createDoctor = (req, res) => {
  Doctor.create(req.body, (err, results) => {
    if (err) {
      console.log("Error inserting data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({
      message: "Doctor created successfully",
      doctorId: results.insertId,
    });
  });
};

export const readDoctor = (req, res) => {
  Doctor.read((err, results) => {
    if (err) {
      console.log("Error reading data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};

export const updateDoctor = (req, res) => {
  Doctor.update(req.params.id, req.body, (err, results) => {
    if (err) {
      console.log("Error updating data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({
      message: "Doctor updated successfully",
    });
  });
};

export const deleteDoctor = (req, res) => {
  Doctor.delete(req.params.id, (err, results) => {
    if (err) {
      console.log("Error deleting data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({
      message: "Doctor deleted successfully",
    });
  });
};
