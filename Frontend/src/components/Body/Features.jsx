// src/components/Body/Features.jsx
import {
  ClipboardList,
  Search,
  Handshake,
  Calendar,
  BarChart2,
  Bell,
} from "lucide-react";
import {
  colors,
  sectionHeadingStyle,
  sectionSubStyle,
  shadows,
} from "../../theme";

const features = [
  {
    icon: <ClipboardList size={22} strokeWidth={2} />,
    title: "Smart Food Inventory",
    desc: "Track everything in your kitchen with expiry dates, quantities, and smart reminders.",
  },
  {
    icon: <Search size={22} strokeWidth={2} />,
    title: "Search & Claim Donations",
    desc: "Browse surplus food shared by your community and claim items before they go to waste.",
  },
  {
    icon: <Handshake size={22} strokeWidth={2} />,
    title: "Share food with community",
    desc: "List extra food you won't use and connect with neighbours who can put it to good use.",
  },
  {
    icon: <Calendar size={22} strokeWidth={2} />,
    title: "Weekly Meal Planner",
    desc: "Plan meals around what you already have and cut down on unnecessary grocery trips.",
  },
  {
    icon: <BarChart2 size={22} strokeWidth={2} />,
    title: "Food Impact Analytics",
    desc: "See how much food you've saved, money you've kept, and waste you've prevented.",
  },
  {
    icon: <Bell size={22} strokeWidth={2} />,
    title: "Real-time Notifications",
    desc: "Get alerts for expiring items, new donations nearby, and meal plan reminders.",
  },
];

export default function Features() {
  return (
    <section
      className="py-5"
      id="features"
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
        background: "#f8fbf9",
      }}
    >
      <div className="container" style={{ maxWidth: "1180px" }}>
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 680 }}>
          <h2
            style={{
              ...sectionHeadingStyle,
              fontFamily: "inherit",
              fontWeight: 800,
            }}
          >
            Everything you need to waste less, every day.
          </h2>
          <p
            className="mx-auto"
            style={{ ...sectionSubStyle, margin: "0 auto" }}
          >
            From tracking what&apos;s in your fridge to sharing surplus with
            your neighbors, ZeroWaste brings it all together in one simple app.
          </p>
        </div>

        <div className="row g-4">
          {features.map((f) => (
            <div key={f.title} className="col-md-6 col-lg-4">
              <div
                className="h-100 p-4 bg-white border"
                style={{
                  borderColor: colors.border,
                  borderRadius: 16,
                  padding: "2rem",
                  boxShadow: shadows.sm,
                  transition: "transform 0.28s ease, box-shadow 0.28s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = shadows.md;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = shadows.sm;
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    background: "#eaf5ef",
                    color: colors.green,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: colors.charcoal,
                    marginBottom: "0.7rem",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: colors.muted,
                    lineHeight: 1.65,
                    marginBottom: 0,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
