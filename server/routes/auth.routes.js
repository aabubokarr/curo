import express from "express";
import { loginUser } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", loginUser);

export default router;
