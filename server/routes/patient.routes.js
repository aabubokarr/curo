import express from "express";
import {
  createPatient,
  readPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticateJWT, createPatient);
router.get("/read", authenticateJWT, readPatient);
router.patch("/update/:id", authenticateJWT, updatePatient);
router.delete("/delete/:id", authenticateJWT, deletePatient);

export default router;
