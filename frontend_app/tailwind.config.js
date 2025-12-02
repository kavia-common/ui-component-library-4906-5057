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
        // App background gradient as requested: 87deg, #95bff0 20%, #ac7de9 80%
        'ocean-gradient': 'linear-gradient(87deg, #95bff0 20%, #ac7de9 80%)',
        // Main accent gradient: 45deg, #af2497 10%, #902d9a 20%, #1840a0 100%
        'ocean-main': 'linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)',
        // Subtle card glass gradient for dark/light
        'glass': 'linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))',
        'glass-dark': 'linear-gradient(180deg, rgba(17,24,39,0.6), rgba(17,24,39,0.4))'
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)",
        elevated: "0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl: "0.75rem"
      },
      ringColor: {
        'ocean': '#1840a0'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
}
