/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)", // Přidáno secondary
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        link: "var(--color-link)",
        error: "var(--color-error)",
        success: "var(--color-success)",
      },
    },
  },
  plugins: [],
}

