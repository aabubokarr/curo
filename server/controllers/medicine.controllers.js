import Medicine from "../models/medicine.models.js";

export const createMedicine = (req, res) => {
  Medicine.create(req.body, (err, results) => {
    if (err) {
      console.log("Error inserting data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({
      message: "Medicine created successfully",
      medicineId: results.insertId,
    });
  });
};

export const readMedicine = (req, res) => {
  Medicine.read((err, results) => {
    if (err) {
      console.log("Error reading data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};

export const readMedicineById = (req, res) => {
  Medicine.readById(req.params.id, (err, results) => {
    if (err) {
      console.log("Error reading data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!results.length) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json(results[0]);
  });
};

export const updateMedicine = (req, res) => {
  Medicine.update(req.params.id, req.body, (err, results) => {
    if (err) {
      console.log("Error updating data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json({ message: "Medicine updated successfully" });
  });
};

export const deleteMedicine = (req, res) => {
  Medicine.delete(req.params.id, (err, results) => {
    if (err) {
      console.log("Error deleting data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json({ message: "Medicine deleted successfully" });
  });
};
