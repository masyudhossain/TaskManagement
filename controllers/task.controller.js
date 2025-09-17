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

// get all tasks(admin)

export const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find().populate("assignedTo", "name email role");
    res.json(tasks);
});

// get task by ID ( admin)

export const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id).populate("assignedTo", "name email role");
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    res.json(task);
});

// Update any task (Admin)

export const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    if (req.body.assignedToEmail) {
        const member = await User.findOne({ email: req.body.assignedToEmail });
        if (!member) {
            res.status(404);
            throw new Error("Assigned member not found");
        }
        req.body.assignedTo = member._id;
    }

    Object.assign(task, req.body);
    const updatedTask = await task.save();
    res.json(updatedTask);
});
