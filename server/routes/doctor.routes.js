import express from "express";
import {
  createDoctor,
  readDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctor.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticateJWT, createDoctor);
router.get("/read", authenticateJWT, readDoctor);
router.patch("/update/:id", authenticateJWT, updateDoctor);
router.delete("/delete/:id", deleteDoctor);

export default router;
