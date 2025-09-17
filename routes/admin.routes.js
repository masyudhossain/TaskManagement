// routes/admin.routes.js

import express from "express";

import { createTask, getAllTasks } from "../controllers/task.controller.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.post("/createtask", createTask);
router.get("/getAllTask", getAllTasks)

export default router;