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

    // task = await task.populate("assignedTo", "name email role");

    res.status(201).json(task);
})

// get all tasks(admin) -> GET

export const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find().populate("assignedTo", "name email role");
    res.json(tasks);
});

// get task by ID ( admin) -> GET

export const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id).populate("assignedTo", "name email role");
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    res.json(task);
});

// Update any task (Admin) -> PUT

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

//  Delete task (Admin) -> DELETE

export const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
});

// Get tasks by user email (Admin)

export const getTasksByEmail = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const tasks = await Task.find({ assignedTo: user._id }).populate("assignedTo", "name email");
    res.json(tasks);
});


//member

// Get logged-in member's tasks

export const getMyTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ assignedTo: req.user._id });
    res.json(tasks);
});

// Get single task assigned to logged-in member

export const getMyTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    if (!task.assignedTo || task.assignedTo.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Forbidden - Not your task");
    }
    res.json(task);
});

// Member update allowed fields of their task

export const updateMyTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    if (!task.assignedTo || task.assignedTo.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Forbidden - Not your task");
    }

    // Only allow updating status and description

    const allowedFields = ["status", "description"];
    allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            task[field] = req.body[field];
        }
    });

    const updatedTask = await task.save();
    res.json(updatedTask);
});