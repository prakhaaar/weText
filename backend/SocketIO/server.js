import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Allow CORS for the specified origin
    methods: ["GET", "POST"], // Allow specified HTTP methods
  },
});

// Function to get the socket ID of a connected receiver by their user ID
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId]; // Returns the socket ID of the receiver
};

// Store connected users with their user IDs as keys and socket IDs as values
const users = {};

// Handle new socket connections
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Get userId from the socket's handshake query
  const userId = socket.handshake.query.userId;

  // If userId is provided, add the user to the users object
  if (userId) {
    users[userId] = socket.id;
    console.log("Connected users:", users);
  }

  // Emit a list of online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(users));

  // Listen for 'disconnect' events when a user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    // Remove the user from the users object
    delete users[userId];

    // Emit the updated list of online users
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
