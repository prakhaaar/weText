import mongoose from "mongoose";

// Define the schema for a message
const messageSchema = new mongoose.Schema(
  {
    // ID of the user sending the message
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    // ID of the user receiving the message
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    // The message content
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create the Message model from the schema
const Message = mongoose.model("message", messageSchema);

export default Message;
