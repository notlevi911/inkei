/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#121826',
          light: '#1a2236',
        },
        accent: {
          primary: '#4f46e5',
          secondary: '#818cf8',
          muted: '#6366f1',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#94a3b8',
          muted: '#64748b',
        }
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}