import express from "express";
import {
  createTest,
  readTest,
  updateTest,
  deleteTest,
} from "../controllers/test.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticateJWT, createTest);
router.get("/read", authenticateJWT, readTest);
router.patch("/update/:id", authenticateJWT, updateTest);
router.delete("/delete/:id", authenticateJWT, deleteTest);

export default router;
