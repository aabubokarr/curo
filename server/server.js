import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import testRoutes from "./routes/test.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import requestRoutes from "./routes/request.routes.js"

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// MIDDLEWARE
const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/department", departmentRoutes);
app.use("/test", testRoutes);
app.use("/service", serviceRoutes);
app.use("/medicine", medicineRoutes);
app.use("/request", requestRoutes);

// Get user by ID
app.get("/user", authenticateJWT, (req, res) => {
  const { userId, role } = req.user;

  let sql;
  if (role === "admin") {
    sql =
      "SELECT admin_id AS user_id, name, email FROM admin_details WHERE admin_id = ?";
  } else if (role === "doctor") {
    sql =
      "SELECT doctor_id AS user_id, name, email FROM doctor_details WHERE doctor_id = ?";
  } else if (role === "patient") {
    sql =
      "SELECT patient_id AS user_id, name, email FROM patient_details WHERE patient_id = ?";
  } else {
    return res.status(403).json({ error: "Invalid role" });
  }

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];
    console.log(user);
    return res.status(200).json({
      message: "User details retrieved successfully",
      user,
    });
  });
});

// Get user count
app.get("/user/count", authenticateJWT, (req, res) => {
  const sql =
    "SELECT SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS doc_male, SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS doc_female, (SELECT SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) FROM patient_details) AS pat_male, (SELECT SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) FROM patient_details) AS pat_female FROM doctor_details;";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Count not found" });
    }

    return res.status(200).json(results[0]);
  });
});

// PATIENT API's
// Get a patient by ID
app.get("/patient/:id", authenticateJWT, (req, res) => {
  const patientId = req.params.id;

  const sql = "SELECT * FROM patient_details WHERE patient_id = ?";

  db.query(sql, [patientId], (err, results) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(results[0]);
  });
});

// DOCTOR API's
// Get a doctor by ID
app.get("/doctor/:id", authenticateJWT, (req, res) => {
  const doctorId = req.params.id;

  const sql =
    "SELECT doctor_id, name, email, phone_no, address, gender, speciality, dept.dept_name, role FROM doctor_details d, department dept WHERE d.dept_id = dept.dept_id AND doctor_id = ?";

  db.query(sql, [doctorId], (err, results) => {
    if (err) {
      console.error("Error fetching data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(results[0]);
  });
});

// DEPARTMENT API's

// Get a department by ID
app.get("/department/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM department WHERE dept_id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0)
      return res.status(404).json({ message: "Department not found" });
    res.status(200).json(results[0]);
  });
});

// APPOINTMENT API's
// Create a new appointment
app.get("/appointment/doctor", authenticateJWT, (req, res) => {
  const doctorId = req.user.userId;
  const sql =
    "SELECT appointment_id, doc.name AS doctor_name, pat.name AS patient_name, appointment_date, appointment_time FROM appointment AS app, doctor_details AS doc, patient_details AS pat WHERE doc.doctor_id = app.doctor_id AND pat.patient_id = app.patient_id AND doc.doctor_id = ?";

  db.query(sql, [doctorId], (err, results) => {
    if (err) {
      console.error("Error fetching appointments: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
