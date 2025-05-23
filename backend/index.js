import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config(); // Load environment variables from .env file

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies from requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

const PORT = process.env.PORT || 3001; // Define the port from environment variable or default to 3001
const URI = process.env.MONGODB_URI; // MongoDB connection URI from environment variables

try {
  // Connect to MongoDB
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  // Log any errors encountered during connection
  console.log(error);
}

// Define API routes
app.use("/api/user", userRoute); // User-related routes
app.use("/api/message", messageRoute); // Message-related routes

// Start the server and listen for incoming requests
server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
