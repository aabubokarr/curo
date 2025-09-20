import Appointment from "../models/appointment.models.js";

export const createAppointment = (req, res) => {
  Appointment.create(req.body, (err, results) => {
    if (err) {
      console.log("Error inserting data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({
      message: "Appointment created successfully",
      appointmentId: results.insertId,
    });
  });
};

export const readAppointment = (req, res) => {
  Appointment.read((err, results) => {
    if (err) {
      console.log("Error reading data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};

export const updateAppointment = (req, res) => {
  Appointment.update(req.params.id, req.body, (err, results) => {
    if (err) {
      console.log("Error updating data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    return res.json({
      message: "Appointment updated successfully",
    });
  });
};

export const deleteAppointment = (req, res) => {
  Appointment.delete(req.params.id, (err, results) => {
    if (err) {
      console.log("Error deleting data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Appointment not found" });
    }

    res.json({
      message: "Appointment deleted successfully",
    });
  });
};
