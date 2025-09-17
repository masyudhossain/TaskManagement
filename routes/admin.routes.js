// routes/admin.routes.js

import express from "express";

import { createTask } from "../controllers/task.controller.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.post("/createtask", createTask);

export default router;