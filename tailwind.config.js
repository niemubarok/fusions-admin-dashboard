module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // screens: {
    //   'sm': '320px',
    //   'md': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'lg': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'xl': '1280px',
    //   // => @media (min-width: 1280px) { ... }
    // },
    fontFamily: {
      'sans': ['roboto']
    },
    backgroundColor: theme => ({
      ...theme("colors"),
      primary: "#DC5C4B"
    }),
    borderColor: theme => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      primary: "#DC5C4B"
    }),
    ringColor: theme => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      primary: "#DC5C4B"
    }),
    textColor: theme => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      primary: "#DC5C4B"
    }),
    extend: {
      zIndex: {
        "-1": "-1"
      },
      flexGrow: {
        5: "5"
      },
      maxHeight: {
        "screen-menu": "calc(100vh - 3.5rem)",
        modal: "calc(100vh - 160px)"
      },
      minWidth: {
        "0": "0",
        "1/2": "50%",
        "3/4": "75%"
      },
      transitionProperty: {
        position: "right, left, top, bottom, margin, padding"
      }
    },
    boxShadow: {
      lg:
        "2px 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.03)"
    },

  },
  variants: {
    extend: {
      margin: ["last"],
      backgroundColor: ["checked", "active", "focus"],
      borderColor: ["hover", "focus", "focus-within", "checked"],
      scale: ["group-hover", "active"],
      overflow: ['hover'],
      inset: ["hover"],
      padding: ["hover"],
    }
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")]
};
