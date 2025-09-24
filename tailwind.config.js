/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#4CAF50',
        primaryBlack: '#000000',
        primaryWhite: '#FFFFFF',
        brandPink: '#ec407a',
      },
    },
  },
  plugins: [],
}
