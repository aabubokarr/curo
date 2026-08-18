import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import appointmentRoutes from "./routes/appointment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import requestRoutes from "./routes/request.routes.js"
import serviceRoutes from "./routes/service.routes.js";
import testRoutes from "./routes/test.routes.js";
import userRoutes from "./routes/user.routes.js"

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
dotenv.config();

app.use("/appointment", appointmentRoutes);
app.use("/auth", authRoutes);
app.use("/department", departmentRoutes);
app.use("/doctor", doctorRoutes);
app.use("/medicine", medicineRoutes);
app.use("/patient", patientRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/request", requestRoutes);
app.use("/service", serviceRoutes);
app.use("/test", testRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
