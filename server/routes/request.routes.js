import express from "express";
import {
  readRequest,
  acceptRequest,
  deleteRequest,
} from "../controllers/request.controllers.js";
import authenticateJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/read", authenticateJWT, readRequest);
router.post("/accept/:id", authenticateJWT, acceptRequest);
router.delete("/reject/:id", authenticateJWT, deleteRequest);

export default router;
