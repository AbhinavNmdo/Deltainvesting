module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extends:{
      '3xl': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    },
    borderRadius: {
      '2xl': '1rem',
      '3xl': '1.5rem',
      '4xl': '2rem',
      '5xl': '2.5rem',
      '6xl': '3rem',
      'rounded-r-full': '9999px',
      'full': '9999px'
    },
    minHeight: {
      '18': '18rem',
    },
  },
  plugins: [],
}
