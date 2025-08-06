// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import aiRoute from "./routes/ai.route.js";
// import userRoute from "./routes/user.route.js";
// import messageRoute from "./routes/message.route.js";
// // We are no longer importing app and server
// import { io, getReceiverSocketId } from "./SocketIO/server.js";
// import upload from "./middleware/multerConfig.js";
// import uploadRoute from "./routes/upload.route.js";

// const app = express();
// // middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));

// const PORT = process.env.PORT || 3000;
// const URI = process.env.MONGO_DB_URI;

// mongoose.connection.on("connected", () => {
//     console.log("Connected to MongoDB");
// });

// mongoose.connection.on("error", (err) => {
//     console.error("MongoDB connection error:", err);
// });

// if (mongoose.connection.readyState === 0) {
//     mongoose.connect(URI).catch((err) => {
//         console.error("Initial MongoDB connection error:", err);
//     });
// }

// //routes
// app.use("/api/user", userRoute);
// app.use("/api/message", messageRoute);
// app.use("/api/upload",uploadRoute);
// app.use("/uploads", express.static("uploads")); 
// app.use("/api/ai", aiRoute);

// server.listen(PORT, () => {
//     console.log(`Server is Running on port ${PORT}`);
// });

// module.exports = app;

// backend/index.js - CORRECTED FOR VERCEL

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Route Imports
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import aiRoutes from "./routes/ai.route.js";
import uploadRoutes from "./routes/upload.route.js";

// DB Connection
import connectDB from "./db/connectDB.js";

// Load environment variables
dotenv.config();

// Create a Vercel-compatible Express App
const app = express();

// --- Middleware ---
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON payloads
app.use(cookieParser()); // To parse cookies

// --- API Routes ---
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/upload", uploadRoutes);

// --- Database Connection ---
connectDB();

// --- Export the app for Vercel ---
// This is the crucial line that allows Vercel to run your code.
export default app;