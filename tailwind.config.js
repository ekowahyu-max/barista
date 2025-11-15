// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // Pastikan Tailwind memindai semua file di folder 'src'
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Definisikan palet warna yang terinspirasi dari kopi
      colors: {
        'coffee-bean': '#3C2F2F', // Cokelat gelap
        'latte-cream': '#FFFBEB', // Putih gading
        'espresso-shot': '#8B4513', // Cokelat kopi
        'amber-focus': '#F59E0B', // Kuning/Oranye cerah untuk aksen
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

