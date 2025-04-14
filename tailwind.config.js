/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#F7F7F7',
          100: '#E5E5E5',
        },
        primary: '#2563EB',
        owed: '#F87171',
        receivable: '#34D399',
      },
      fontFamily: {
        sans: ['Nunito', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};