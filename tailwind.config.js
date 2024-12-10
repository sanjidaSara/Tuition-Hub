/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'full': '100%',
    }
    },
  },
  plugins: [
    require('daisyui'),

  ],
  daisyui: {
    themes: ["light", "dark", "cupcake","default","retro","cyberpunk","valentine","aqua","synthwave"],
  },
}

