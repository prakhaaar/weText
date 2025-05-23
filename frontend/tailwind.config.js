module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjusted for your React components
    "./public/index.html", // Includes your index.html file
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
