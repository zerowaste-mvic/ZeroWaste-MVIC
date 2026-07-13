export const colors = {
  green: "#4ead77",
  greenL: "rgb(62, 160, 102)",
  greenD: "#1e5538",
  greenXd: "#143b28",
  authGreen: "rgba(62, 160, 102,0.05)",
  greenLrgb: "rgba(62, 160, 102,0.40)",
  registerBG: "rgba(161,188,152,0.9)",
  dashboardAccent: "#bbf8bb",
  authBg: "rgb(240, 244, 239)",
  authBgLeft: "rgb(240, 244, 239)",
  authBgRight: "rgb(240, 244, 239)",
  authBgSignup: "#F1F8F1",
  low_greenFade: "rgba(62, 160, 102, 0.15)",
  showcase_green: "rgba(62, 160, 102, 0.25)",
  authInputBg: "#E4E4E4",
  cream: "#faf7f2",
  warm: "#f5ede0",
  warmD: "#ecdcca",
  brown: "#7c5c3e",
  brownL: "#a07d5c",
  charcoal: "#1c1c1e",
  muted: "#6b7280",
  border: "#e3d9cc",
  white: "#ffffff",
};

export let fonts = {
  display: '"Playfair Display", Georgia, serif',
  body: '"DM Sans", system-ui, sans-serif',
};

export let shadows = {
  sm: "0 2px 10px rgba(0, 0, 0, 0.07)",
  md: "0 8px 32px rgba(0, 0, 0, 0.1)",
  lg: "0 24px 64px rgba(0, 0, 0, 0.14)",
};

export let sectionTagStyle = {
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: colors.green,
  marginBottom: "1rem",
};

export let sectionHeadingStyle = {
  fontFamily: fonts.display,
  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
  fontWeight: 700,
  lineHeight: 1.15,
  letterSpacing: "-0.025em",
  color: colors.charcoal,
  marginBottom: "1rem",
};

export let sectionSubStyle = {
  fontSize: "1.05rem",
  color: colors.muted,
  maxWidth: "520px",
  fontWeight: 300,
  lineHeight: 1.7,
};

export let btnPrimaryStyle = {
  backgroundColor: colors.green,
  borderColor: colors.green,
  fontFamily: fonts.body,
  fontWeight: 500,
  borderRadius: "6px",
};

export let btnOutlineStyle = {
  borderColor: colors.border,
  color: colors.charcoal,
  fontFamily: fonts.body,
  fontWeight: 500,
  borderRadius: "6px",
  borderWidth: "1.5px",
};
