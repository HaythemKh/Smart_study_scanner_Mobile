// theme/tokens.ts
// ═══════════════════════════════════════════════
// SMART STUDY SCANNER — Design Tokens
// ═══════════════════════════════════════════════

export const colors = {
  // Brand
  primary: "#4B36CC",
  coral: "#FF7A59",
  mint: "#6EE7C7",
  sun: "#FFD166",
  grape: "#9B5DE5",
  sky: "#6BC5F8",

  // Semantic
  success: "#6EE7C7",
  successText: "#0A7D6B",
  error: "#FF7A59",
  errorText: "#CC4A25",
  warning: "#FFD166",
  warningText: "#8B5E00",

  // Surfaces
  background: "#FAFAFC",
  card: "#FFFFFF",
  foreground: "#1A1530",
  muted: "#6B6685",
  border: "rgba(107,102,133,0.12)",

  // Dark mode equivalents
  dark: {
    background: "#0F0D1A",
    card: "#1A1730",
    foreground: "#F5F3FF",
    muted: "#8B87A8",
    border: "rgba(255,255,255,0.08)",
  },
} as const;

// Easing curves for animations
export const easing = {
  // Bouncy pop-in effect
  popIn: [0.34, 1.56, 0.64, 1] as const,
  // Smooth deceleration
  smooth: [0.22, 1, 0.36, 1] as const,
} as const;

export const gradients = {
  hero: ["#6B4DE6", "#C84DD9", "#FF7A59"] as const,
  heroAngle: 135,
  mint: ["#7EE8C9", "#6BC5F8"] as const,
  sun: ["#FFD980", "#FFA94D"] as const,
  coral: ["#FF9472", "#FF6B5C"] as const,
  grape: ["#A36BFF", "#6B4DE6"] as const,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  card: 16,
  button: 24,
  hero: 28,
  xl: 32,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  screen: 20, // horizontal screen padding
} as const;

export const typography = {
  displayH1: {
    fontSize: 30,
    fontWeight: "800" as const,
    letterSpacing: -0.6,
    lineHeight: 36,
    fontFamily: "PlusJakartaSans_800ExtraBold",
  },
  h2: {
    fontSize: 22,
    fontWeight: "700" as const,
    letterSpacing: -0.3,
    lineHeight: 28,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  h3: {
    fontSize: 17,
    fontWeight: "700" as const,
    lineHeight: 22,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  body: {
    fontSize: 14,
    fontWeight: "500" as const,
    lineHeight: 22,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  caption: {
    fontSize: 11,
    fontWeight: "600" as const,
    letterSpacing: 1.1,
    textTransform: "uppercase" as const,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
} as const;

export const shadows = {
  card: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  button: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
  hero: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 12,
  },
} as const;

export const animation = {
  // Bouncy spring for pop interactions
  spring: {
    damping: 15,
    stiffness: 200,
    mass: 0.8,
  },
  // Smooth deceleration for slides
  smooth: {
    damping: 25,
    stiffness: 180,
    mass: 1,
  },
  durations: {
    fast: 200,
    normal: 350,
    slow: 500,
  },
} as const;
