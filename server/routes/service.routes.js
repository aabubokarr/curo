import express from "express";
import {
  createService,
  readService,
  readServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticateJWT, createService);
router.get("/read", authenticateJWT, readService);
router.get("/read/:id", authenticateJWT, readServiceById);
router.patch("/update/:id", authenticateJWT, updateService);
router.delete("/delete/:id", authenticateJWT, deleteService);

export default router;
