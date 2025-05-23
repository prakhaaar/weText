import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// Function to handle sending a message
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // Extract message from request body
    const { id: receiverId } = req.params; // Extract receiver ID from request parameters
    const senderId = req.user._id; // Current logged-in user's ID as sender

    // Check if a conversation already exists between the sender and receiver
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    // Create a new message document
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Add message to conversation if it was created successfully
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save both the conversation and the new message in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // Retrieve the receiver's socket ID
    const receiverSocketId = getReceiverSocketId(receiverId);

    // If the receiver is online, send the new message in real-time via WebSocket
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Respond with the new message as JSON
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Return error response
  }
};

// Function to retrieve messages in a conversation
export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params; // Extract chat user ID from request parameters
    const senderId = req.user._id; // Current logged-in user's ID as sender

    // Find the conversation between the sender and chat user, and populate messages
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");

    // If no conversation exists, return an empty array
    if (!conversation) {
      return res.status(201).json([]);
    }

    // Respond with the list of messages in the conversation
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Return error response
  }
};
