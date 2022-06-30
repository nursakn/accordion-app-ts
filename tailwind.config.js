module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "transparent-black": "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
