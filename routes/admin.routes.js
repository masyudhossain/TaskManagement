// routes/admin.routes.js

import express from "express";

import { createTask, getAllTasks, getTaskById, updateTask, deleteTask, getTasksByEmail } from "../controllers/task.controller.js";
import { getAllMembers } from "../controllers/admin.controller.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.post("/createtask", createTask);
router.get("/getAllTask", getAllTasks);
router.get("/getTaskById/:id", getTaskById);
router.put("/updateTask/:id", updateTask);
router.delete("/deleteTaskById/:id", deleteTask);
router.get("/getTaskByEmail/:email", getTasksByEmail);
router.get("/getAllTeamMember", getAllMembers);
export default router;