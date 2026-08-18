import express from "express";
import {
  createAppointment,
  readAppointment,
  getDoctorAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticateJWT, createAppointment);
router.get("/read", authenticateJWT, readAppointment);
router.get("/doctor", authenticateJWT, getDoctorAppointment); // NEW: Get doctor's appointments
router.patch("/update/:id", authenticateJWT, updateAppointment);
router.delete("/delete/:id", authenticateJWT, deleteAppointment);

export default router;