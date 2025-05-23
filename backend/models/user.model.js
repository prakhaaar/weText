import mongoose from "mongoose";

// Define the schema for a user
const userSchema = mongoose.Schema(
  {
    // Full name of the user
    fullname: {
      type: String,
      required: true,
    },
    // User's email address, unique to each user
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Hashed password for authentication
    password: {
      type: String,
      required: true,
    },
    // Optional field for password confirmation (not stored securely)
    confirmPassword: {
      type: String,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

export default User;
