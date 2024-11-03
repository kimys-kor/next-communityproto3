import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    variants: {
      extends: {
        display: ["group-hover"],
        boxShadow: {
          "custom-shadow": "0 0 20px 1px rgba(200, 200, 200, 0.1)",
        },
      },
    },
    screens: {
      sm: "480px",
      mmd: "835px",
      md: "872px",
      lg: "1135px",
      xl: "1440px",
      xxl: "1620px",
    },
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      gridTemplateColumns: {
        "auto-fit-minmax": "repeat(auto-fit, minmax(240px, 1fr))",
      },
      height: {
        "calc-100": "calc(100vh - 4rem)",
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        blue: "#3384F5",
        deepblue: "#046cf5",
        mediumblue: "#395DDB",
        semiblue: "#E9EEFF",
        normalblue: "#5171E2",
        lightblue: "#F7F8FB",
        bgblue: "#E7EBFF",
        sideblue: "#3767FB",
        lightcyan: "#E0FFFF",
        lightskyblue: "##87CEFA",
        deepsky: "#808BAB",
        description: "#888888",
        cpurple: "#8800FF",
        csemipubple: "#EDC9FF",
        cpink: "#FED4E7",
        semiblack: "#2f3438",
        subtext: "#6c757d",
        subtext2: "#828c94",
        subtext3: "#999999",
        warnigtext: "#ff7777",
        bordercolor: "#EAEDEF",
        bordercolor2: "#f5f5f5",
        bordercolor3: "#dee2e6",
        buttoncolor: "#FAFAFA",
        subgray: "#F8F9FA",
        // pink: "#ff49db",
        // orange: "#ff7849",
        // green: "#13ce66",
        // yellow: "#ffc82c",
        // "gray-dark": "#273444",
        // gray: "#8492a6",
        // "gray-light": "#d3dce6",
        "gradient-start": "#00daef",
        "gradient-end": "#bc67ff",
      },
      animation: {
        moveGrad: "MoveGrad 5s ease infinite",
      },
      keyframes: {
        MoveGrad: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      backgroundImage: {
        "guide-intro": "url('/images/intro1.JPG')",
        "gradient-to-top": "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
