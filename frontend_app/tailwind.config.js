/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          primary: "#2563EB",
          secondary: "#F59E0B",
          success: "#F59E0B",
          error: "#EF4444",
          bg: "#f9fafb",
          surface: "#ffffff",
          text: "#111827"
        }
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, rgba(59,130,246,0.1), #f9fafb)'
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)"
      },
      borderRadius: {
        xl: "0.75rem"
      }
    }
  },
  plugins: []
}
