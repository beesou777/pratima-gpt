/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary:'#0e1217',
        white: '#fff',
        secondary: '#1c1f26',
        'light-gray': '#182236',
      },
    }
  },
  plugins: []
};