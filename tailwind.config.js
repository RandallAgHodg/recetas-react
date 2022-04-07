module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "index-image": "url('/bg-recetas.png')",
      },
      colors: {
        Claret: "#590d22",
        Claret2: "#800f2f",
        BigDipOruby: "#a4133c",
        BrightMaroon: "#c9184a",
        FieryRose: "#ff4d6d",
        UltraRed: "#ff758f",
        SalmonPink: "#ff8fa3",
        CherryBlossomPink: "#ffb3c1",
        Pink: "#ffccd5",
        LavenderBlush: "#fff0f3",
        Linen: "#edf6f9",
      },
      fontFamily: {
        B612: ["B612", "sans - serif"],
        Roboto: ["Roboto", "sans-serif"],
        Nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
