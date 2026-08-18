import User from "../models/user.models.js";

export const getUserProfile = (req, res) => {
  const { userId, role } = req.user;

  User.getUserByIdAndRole(userId, role, (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(403).json({ error: err.message || "Invalid role" });
    }

    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];
    return res.status(200).json({
      message: "User details retrieved successfully",
      user,
    });
  });
};

export const getUserCount = (_, res) => {
  User.getUserCount((err, results) => {
    if (err) {
      console.error("Error fetching user count:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Count not found" });
    }

    return res.status(200).json(results[0]);
  });
};
