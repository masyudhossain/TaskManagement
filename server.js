// server.js 
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/admin.routes.js"
import memberRoutes from "./routes/member.routes.js"
import User from "./models/user.model.js";

dotenv.config();
connectDB();

const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "admin" });
        if (!adminExists) {
            await User.create({
                name: "Super Admin",
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                role: "admin"
            });
            console.log("Default admin created from .env");
        }
    } catch (error) {
        console.error("Error creating default admin:", error.message);
    }
};

createDefaultAdmin();

const app = express();
app.use(express.json());

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/member", memberRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
