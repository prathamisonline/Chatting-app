// /** @type {import('tailwindcss').Config}
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="night"]'],
  plugins: [
    daisyui,
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/image.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  daisyui: {
    themes: ["light", "dark",],
  },
}