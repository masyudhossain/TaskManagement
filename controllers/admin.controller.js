import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

// Admin: Get all team members

export const getAllMembers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password"); // hide password

    res.status(200).json({
        count: users.length,
        members: users,
    });
});


export const deleteMember = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (req.user.id === id) {
        res.status(400);
        throw new Error("You cannot delete yourself");
    }

    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error("Member not found");
    }

    // Delete tasks if assigned, else skip
    // const deletedTasks = await Task.deleteMany({ assignedTo: id });

    await user.deleteOne();

    res.status(200).json({
        message: "Member deleted successfully"
        // , tasksDeleted: deletedTasks.deletedCount || 0
    });
});