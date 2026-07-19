import { colors, fonts } from "../../../theme";

export default function DashboardHome() {
  return (
    <div>
      <h1
        style={{
          fontFamily: fonts.body,
          fontSize: "1.60rem",
          fontWeight: 700,
          color: colors.charcoal,
          opacity: 0.75,
        }}
      >
        Dashboard
      </h1>
      <p style={{ color: colors.muted }}>
        Use the sidebar to manage your food inventory and reduce waste.
      </p>
    </div>
  );
}
