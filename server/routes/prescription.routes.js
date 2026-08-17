import express from "express";
import {
  createPrescription,
  getDoctorPrescriptions,
  getPatientPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
} from "../controllers/prescription.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticateJWT, createPrescription);
router.get("/doctor", authenticateJWT, getDoctorPrescriptions);
router.get("/patient", authenticateJWT, getPatientPrescriptions);
router.get("/:id", authenticateJWT, getPrescriptionById);
router.patch("/update/:id", authenticateJWT, updatePrescription);
router.delete("/delete/:id", authenticateJWT, deletePrescription);

export default router;
