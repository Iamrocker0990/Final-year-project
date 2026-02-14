/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo-600
          hover: '#4338CA',   // Indigo-700
          light: '#818CF8',   // Indigo-400
        },
        secondary: {
          DEFAULT: '#0F172A', // Slate-900
          hover: '#1E293B',   // Slate-800
          light: '#334155',   // Slate-700
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
