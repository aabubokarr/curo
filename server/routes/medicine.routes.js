import express from "express";
import {
  createMedicine,
  readMedicine,
  readMedicineById,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicine.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticateJWT, createMedicine);
router.get("/read", authenticateJWT, readMedicine);
router.get("/read/:id", authenticateJWT, readMedicineById);
router.patch("/update/:id", authenticateJWT, updateMedicine);
router.delete("/delete/:id", authenticateJWT, deleteMedicine);

export default router;
