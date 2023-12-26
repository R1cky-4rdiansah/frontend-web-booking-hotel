/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#F79613",
        "prmary-blue": "#0A30B3",
        "secondary-gray": "#718096",
        "primary-dark": "#1A202C",
      },
    },
  },
  plugins: [],
  blocklist: ["collapse"],
};

