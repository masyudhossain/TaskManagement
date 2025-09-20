// auth.controllers.js

import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"


//Register User(admin or member)
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const adminExists = await User.findOne({ role: "admin" });

    // Case 1: If no admin exists yet, allow creating an admin
    if (!adminExists && role === "admin") {
        const user = await User.create({ name, email, password, role: "admin" });
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    }

    // Case 2: Admin exists, but only admin can create members
    if (!req.user || req.user.role !== "admin") {
        res.status(403);
        throw new Error("Only admins can register new members");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({ name, email, password, role });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    });
});

// login user 

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid credientials");
    }
});