import mongoose from "mongoose";
import User from "../models/user.model.js";
import Message from "./message.model.js";

// Define the schema for a conversation
const conversationSchema = new mongoose.Schema(
  {
    // Array of members involved in the conversation, each referenced by their user ID
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, // Reference to the User model
      },
    ],
    // Array of messages in the conversation, each referenced by its message ID
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message, // Reference to the Message model
        default: [], // Initialize messages array as empty by default
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create the Conversation model from the schema
const Conversation = mongoose.model("conversation", conversationSchema);

export default Conversation;
