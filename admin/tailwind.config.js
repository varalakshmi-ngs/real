export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#545F71",
        secondary: "#0048F9",
      },

      // colors: {
      //   ...colors,
      //   primary: "#E60023",
      //   secondary: "#0048F9",
      //   bgPrimary: "#E9E9E9",
      // },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
        medium: "0 4px 12px rgba(0, 0, 0, 0.1)",
        strong: "0 6px 20px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
