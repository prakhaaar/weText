import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

// Function to handle user signup
export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;
  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if a user with the given email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Hash the password before storing it
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname,
      email,
      password: hashPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // If user is successfully created, generate and save a JWT token as a cookie
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Return error response
  }
};

// Function to handle user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if password matches the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }

    // If credentials are valid, generate and save a JWT token as a cookie
    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Return error response
  }
};

// Function to handle user logout
export const logout = async (req, res) => {
  try {
    // Clear the JWT cookie to log the user out
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Return error response
  }
};

// Function to retrieve all users except the logged-in user
export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id; // Current logged-in user's ID

    // Retrieve all users except the logged-in user, excluding password field
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    // Respond with the list of filtered users
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Return error response
  }
};
