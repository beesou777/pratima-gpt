/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary:'#6731EC',
        white: '#fff',
        'light-gray': '#182236',
      },
    }
  },
  plugins: []
};