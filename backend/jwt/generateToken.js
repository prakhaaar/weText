import jwt from "jsonwebtoken";

// Function to create a JWT token and save it as an HTTP-only cookie
const createTokenAndSaveCookie = (userId, res) => {
  // Generate a token with user ID and secret key from environment variables, valid for 10 days
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });

  // Set the token as a cookie with security configurations
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents JavaScript from accessing the cookie (XSS protection)
    secure: true, // Ensures the cookie is sent only over HTTPS
    sameSite: "strict", // Restricts the cookie to same-site requests (CSRF protection)
  });
};

export default createTokenAndSaveCookie;
