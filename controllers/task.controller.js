// controllers/task.controller.js

import asyncHandler from "express-async-handler";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";


// admin actions

// create task and assign to member -> POST

export const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority, assignToEmail } = req.body;

    const taskData = {
        title,
        description,
        status,
        priority,
    };

    if (assignToEmail) {
        const member = await User.findOne({ email: assignToEmail });
        if (!member) {
            res.status(404);
            throw new Error("Assigned member not found");
        }
        taskData.assignedTo = member._id;
    }

    const task = await Task.create(taskData);
    res.status(201).json(task);
})