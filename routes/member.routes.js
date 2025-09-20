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

router.get("/mytasks", getMyTasks); //done
router.get("/taskById/:id", getMyTaskById); // done
router.put("/updateTask/:id", updateMyTask);

export default router;
