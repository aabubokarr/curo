import express from "express";
import {
  getUserProfile,
  getUserCount,
} from "../controllers/user.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateJWT, getUserProfile);
router.get("/count", authenticateJWT, getUserCount);

export default router;
