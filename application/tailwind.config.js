/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A162F7",
        "primary-light": "#E0E4E7",
        "primary-dark": "#242731",
        "title-dark": "#E0E4E7",
        "title-light": "#242731",
        gray: "#A4A5A6",
        "gray-light": "#E0E4E7",
        "gray-dark": "#5F6165",
        "app-background-light": "#F5F4F6",
        "app-background-dark": "#1F2128",
        error: "#FF6370",
        warning: "#FF764C",
        success: "#70CF97",
        sidebar: {
          "background-light": "white",
          "background-dark": "#242731",
        },
        sidebarItem: {
          "text-light": "#5F6165",
          "text-dark": "#808191",
          "hover-light": "#F3F5F8",
          "hover-dark": "#292E3D",
        },
        navbar: {
          "background-light": "white",
          "background-dark": "#1F2128",
          input: {
            "background-light": "#F5F4F6",
            "background-dark": "#1F2128",
          },
        },
        table: {
          "title-light": "#72767C",
          "title-dark": "#7C7C8D",
          "text-light": "#242731",
          "text-dark": "#E0E4E7",
        },
      },
      transitionProperty: {
        width: "width",
        opacity: "opacity",
      },
    },
  },
  plugins: [require("tailwindcss-scrollbar")],
};
