/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4B36CC",
        coral: "#FF7A59",
        mint: "#6EE7C7",
        sun: "#FFD166",
        grape: "#9B5DE5",
        sky: "#6BC5F8",
        bg: "#FAFAFC",
        fg: "#1A1530",
        card: "#FFFFFF",
        muted: "#6B6685",
        border: "rgba(107,102,133,0.12)",
        success: "#6EE7C7",
        "success-text": "#0A7D6B",
        error: "#FF7A59",
        "error-text": "#CC4A25",
      },
      fontFamily: {
        display: ["PlusJakartaSans_800ExtraBold"],
        heading: ["PlusJakartaSans_700Bold"],
        semibold: ["PlusJakartaSans_600SemiBold"],
        body: ["PlusJakartaSans_500Medium"],
        base: ["PlusJakartaSans_400Regular"],
      },
      borderRadius: {
        card: "16px",
        button: "24px",
        hero: "28px",
        pill: "999px",
      },
      spacing: {
        screen: "20px",
      },
    },
  },
  plugins: [],
};
