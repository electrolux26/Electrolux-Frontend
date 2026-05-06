/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae3fd',
          300: '#7cc8fc',
          400: '#36aff8',
          500: '#0d95f6',
          600: '#0577d8',
          700: '#055ac4',
          800: '#0a47a0',
          900: '#0d3a80',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's preflight to avoid conflicts with Ant Design
  },
}
