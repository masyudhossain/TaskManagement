// member.routes.js

import express from "express";
import {
    getMyTasks,
    getMyTaskById,
    updateMyTask
} from "../controllers/task.controller.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorize("member"));

router.get("/tasks", getMyTasks);
router.get("/taskById/:id", getMyTaskById);
router.put("/updateTask/:id", updateMyTask);

export default router;
