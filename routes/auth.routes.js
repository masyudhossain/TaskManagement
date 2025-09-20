//auth.routes.js

import express from "express";
import { authUser, registerUser } from "../controllers/auth.controller.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", protect, authorize("admin"), registerUser);
router.post("/login", authUser)

export default router;