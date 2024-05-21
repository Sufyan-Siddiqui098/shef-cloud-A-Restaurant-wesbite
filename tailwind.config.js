/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ec2044',
        'primaryLight': '#ec20440d',
        'greenLight': '#e0f4e1',
        'primaryGreen': '#48bb4e',
        'headGray': '#a0a3a7',
        'secondary': '#323232',
        'borderClr': '#e7e9eb',
        'primaryDark': '#9b001b',
        'grayBg': '#f7f7f7',
      },
      fontSize: {
        base: ['14px'],
        lg: ['16px'],
      }
    },
  },
  plugins: [],
}

