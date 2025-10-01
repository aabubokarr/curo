import Service from "../models/service.models.js";

export const createService = (req, res) => {
  Service.create(req.body, (err, results) => {
    if (err) {
      console.log("Error inserting data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({
      message: "Service created successfully",
      serviceId: results.insertId,
    });
  });
};

export const readService = (req, res) => {
  Service.read((err, results) => {
    if (err) {
      console.log("Error reading data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};

export const readServiceById = (req, res) => {
  Service.readById(req.params.id, (err, results) => {
    if (err) {
      console.log("Error reading data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!results.length) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(results[0]);
  });
};

export const updateService = (req, res) => {
  Service.update(req.params.id, req.body, (err, results) => {
    if (err) {
      console.log("Error updating data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service updated successfully" });
  });
};

export const deleteService = (req, res) => {
  Service.delete(req.params.id, (err, results) => {
    if (err) {
      console.log("Error deleting data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  });
};
