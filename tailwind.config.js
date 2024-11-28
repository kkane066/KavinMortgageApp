/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          blue: '#232F3E',
          orange: '#FF9900',
          yellow: '#FFD814',
          'yellow-hover': '#F7CA00',
          light: '#F5F5F5',
          link: '#007185',
          'link-hover': '#C7511F',
        },
      },
      fontFamily: {
        'amazon': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}