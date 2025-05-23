import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to secure routes by validating JWT token and authenticating user
const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Retrieve token from cookies

    // Check if token is present
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // Check if token verification was successful
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    // Find the user based on decoded token's user ID, excluding the password field
    const user = await User.findById(decoded.userId).select("-password");

    // If user not found, deny access
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    // Attach the user object to the request for use in subsequent middleware or route handlers
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("Error in secureRoute: ", error); // Log error for debugging
    res.status(500).json({ error: "Internal server error" }); // Return error response
  }
};

export default secureRoute;
