import Request from "../models/request.models.js";

export const readRequest = (req, res) => {
  Request.read((err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

export const acceptRequest = (req, res) => {
  const { id } = req.params;
  Request.readById(id, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!results.length)
      return res.status(404).json({ error: "Request not found" });

    const { name, email, password, role } = results[0];
    Request.insertAdmin({ name, email, password, role }, (err2, result2) => {
      if (err2) return res.status(500).json({ error: "Database error" });

      Request.delete(id, (err3) => {
        if (err3) return res.status(500).json({ error: "Database error" });
        res
          .status(201)
          .json({
            message: "Request accepted and transferred",
            adminId: result2.insertId,
          });
      });
    });
  });
};

export const deleteRequest = (req, res) => {
  Request.delete(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Request not found" });
    res.json({ message: "Request deleted successfully" });
  });
};
