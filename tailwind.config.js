/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Všechny soubory JS, TS, JSX, TSX v adresáři src
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)", // Modrá
        "text-primary": "var(--color-text-primary)", // Tmavě šedá
        "text-secondary": "var(--color-text-secondary)", // Světle šedá
        link: "var(--color-link)", // Odkazová modrá
        error: "var(--color-error)", // Červená
        success: "var(--color-success)", // Zelená
      },
    },
  },
  plugins: [],
}

