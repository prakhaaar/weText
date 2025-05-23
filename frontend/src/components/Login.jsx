import axios from "axios"; // Import axios for making HTTP requests
import React from "react"; // Import React
import { useForm } from "react-hook-form"; // Import useForm hook from react-hook-form for form handling
import { useAuth } from "../context/AuthProvider"; // Import custom authentication context
import { Link } from "react-router-dom"; // Import Link for navigation
import toast from "react-hot-toast"; // Import toast for notifications

function Login() {
  const [authUser, setAuthUser] = useAuth(); // Access authentication state and setter function

  const {
    register,
    handleSubmit,
    formState: { errors }, // Extract form errors
  } = useForm(); // Initialize the useForm hook

  // Function to handle form submission
  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    // Send login request to the server
    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful"); // Show success notification
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data)); // Store user data in local storage
        setAuthUser(response.data); // Update authentication context with user data
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error); // Show error notification
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        {" "}
        {/* Center the login form vertically and horizontally */}
        <form
          onSubmit={handleSubmit(onSubmit)} // Handle form submission
          className="border border-white px-6 py-2 rounded-md space-y-3 w-96" // Style the form
        >
          <h1 className="text-2xl text-center">
            {" "}
            {/* Main title */}
            We<span className="text-green-500 font-semibold">Text</span>
          </h1>
          <h2 className="text-xl text-white font-bold">Login</h2>{" "}
          {/* Subtitle */}
          {/* Email Field */}
          <label className="input input-bordered flex items-center gap-2">
            {" "}
            {/* Label with icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg" // Email icon
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow" // Grow to fill available space
              placeholder="Email" // Placeholder text
              {...register("email", { required: true })} // Register email input with validation
            />
          </label>
          {errors.email && ( // Show error message if email field is invalid
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
          {/* Password Field */}
          <label className="input input-bordered flex items-center gap-2">
            {" "}
            {/* Label with icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg" // Password icon
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow" // Grow to fill available space
              placeholder="password" // Placeholder text
              {...register("password", { required: true })} // Register password input with validation
            />
          </label>
          {errors.password && ( // Show error message if password field is invalid
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
          {/* Text & Button */}
          <div className="flex justify-between">
            {" "}
            {/* Flex container for layout */}
            <p>
              New user?
              <Link
                to="/signup" // Link to signup page
                className="text-blue-500 underline cursor-pointer ml-1" // Styled link
              >
                Signup
              </Link>
            </p>
            <input
              type="submit" // Submit button
              value="Login"
              className="text-white bg-green-500 px-2 py-1 cursor-pointer rounded-lg" // Styled button
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login; // Export the Login component for use in other parts of the application
