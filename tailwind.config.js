/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./taller3/users/tailwind/*.{html,js}", "./taller4/car-preferences/*.{html, js}", "./taller5/users/*.{html, js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
// npx tailwindcss -i ./taller3/users/tailwind/input.css -o ./taller3/users/tailwind/tailwind.css --watch
