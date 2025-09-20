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
