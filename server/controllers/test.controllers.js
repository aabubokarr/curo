import Test from "../models/test.models.js";

export const createTest = (req, res) => {
  Test.create(req.body, (err, results) => {
    if (err) {
      console.log("Error inserting data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(201).json({
      message: "Test created successfully",
      testId: results.insertId,
    });
  });
};

export const readTest = (req, res) => {
  Test.read((err, results) => {
    if (err) {
      console.log("Error reading data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(results);
  });
};

export const readTestById = (req, res) => {
  Test.readById(req.params.id, (err, results) => {
    if (err) {
      console.error("Error reading data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.status(200).json(results[0]);
  });
};

export const updateTest = (req, res) => {
  Test.update(req.params.id, req.body, (err, results) => {
    if (err) {
      console.log("Error updating data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Test not found" });
    }

    return res.json({
      message: "Test updated successfully",
    });
  });
};

export const deleteTest = (req, res) => {
  Test.delete(req.params.id, (err, results) => {
    if (err) {
      console.log("Error deleting data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Test not found" });
    }

    return res.json({
      message: "Test deleted successfully",
    });
  });
};
