import express from "express";
import {
  createDepartment,
  readDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticateJWT, createDepartment);
router.get("/read", authenticateJWT, readDepartment);
router.patch("/update/:id", authenticateJWT, updateDepartment);
router.delete("/delete/:id", authenticateJWT, deleteDepartment);

export default router;
