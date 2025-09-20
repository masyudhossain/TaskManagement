// routes/admin.routes.js

import express from "express";

import { createTask, getAllTasks, getTaskById, updateTask, deleteTask, getTasksByEmail } from "../controllers/task.controller.js";
import { getAllMembers, deleteMember } from "../controllers/admin.controller.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.post("/createtask", createTask); // done 
router.get("/getAllTask", getAllTasks); // done
router.get("/getTaskById/:id", getTaskById); //done
router.put("/updateTask/:id", updateTask); //done
router.delete("/deleteTaskById/:id", deleteTask); //done
router.get("/getTaskByEmail/:email", getTasksByEmail); //done
router.get("/getAllMember", getAllMembers); // done
router.delete("/deleteMemberById/:id", deleteMember)
export default router;