import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import aiRoute from "./routes/ai.route.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";
import upload from "./middleware/multerConfig.js";
import uploadRoute from "./routes/upload.route.js";


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_DB_URI;

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

if (mongoose.connection.readyState === 0) {
    mongoose.connect(URI).catch((err) => {
        console.error("Initial MongoDB connection error:", err);
    });
}

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/upload",uploadRoute);
app.use("/uploads", express.static("uploads")); 
app.use("/api/ai", aiRoute);

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});