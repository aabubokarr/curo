import Auth from "../models/auth.models.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  Auth.login(email, async (err, results) => {
    if (err) {
      console.log("Database error during login: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    try {
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        role: user.role,
      });
    } catch (error) {
      console.log("Error during login: ", error);
      return res.status(500).json({ error: "Server error" });
    }
  });
};
