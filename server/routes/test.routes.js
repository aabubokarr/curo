import express from "express";
import {
  createTest,
  readTest,
  readTestById,
  updateTest,
  deleteTest,
} from "../controllers/test.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticateJWT, createTest);
router.get("/read", authenticateJWT, readTest);
router.get("/read/:id", authenticateJWT, readTestById);
router.patch("/update/:id", authenticateJWT, updateTest);
router.delete("/delete/:id", authenticateJWT, deleteTest);

export default router;
