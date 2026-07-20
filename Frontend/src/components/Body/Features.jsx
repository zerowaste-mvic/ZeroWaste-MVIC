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
  sectionh1_style,
  sectionHeadingStyle,
  sectionSubStyle,
  shadows,
} from "../../theme";

const features = [
  {
    tag: "Track Food",
    icon: <ClipboardList size={32} strokeWidth={2} />,
    title: "Smart Food Inventory",
    desc: "Track everything in your kitchen with expiry dates, quantities, and smart reminders.",
  },
  {
    tag: "Find Food",
    icon: <Search size={32} strokeWidth={2} />,
    title: "Search & Claim Donations",
    desc: "Browse surplus food shared by your community and claim items before they go to waste.",
  },
  {
    tag: "Give Food",
    icon: <Handshake size={32} strokeWidth={2} />,
    title: "Share food with community",
    desc: "List extra food you won't use and connect with neighbours who can put it to good use.",
  },
  {
    tag: "Plan Meals",
    icon: <Calendar size={32} strokeWidth={2} />,
    title: "Weekly Meal Planner",
    desc: "Plan meals around what you already have and cut down on unnecessary grocery trips.",
  },
  {
    tag: "Measure Impact",
    icon: <BarChart2 size={32} strokeWidth={2} />,
    title: "Food Impact Analytics",
    desc: "See how much food you've saved, money you've kept, and waste you've prevented.",
  },
  {
    tag: "Stay Informed",
    icon: <Bell size={32} strokeWidth={2} />,
    title: "Real-time Notifications",
    desc: "Get alerts for expiring items, new donations nearby, and meal plan reminders.",
  },
];

export default function Features() {
  return (
    <section
      className="py-5 feature-section"
      id="features"
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <style>
        {`

      .feature-section{
        position: relative;
        overflow: hidden;
      }

      .feature-section::before{
        content: "";
        position: absolute;
        inset: 0;
        background: ${colors.authGreen};
        z-index: 0;
        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
      }

      .feature-section .container {
        position: relative;
        z-index: 1;
      }

      .feature-card {
        justify-content: space-between;
        background: ${colors.white};
        border: "none";
        border-radius: 12px;
        padding: 1.5rem;
        height: 300px;
        margin: 0;
        display: flex;
        flex-direction: column;
        transition: all 0.28s ease;
        box-shadow: 0 0px 15px rgba(195, 194, 194, 0.25);
          }
        
      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: ${shadows.md};
      }

      .feature-tag {
        opacity: 0.85;
        display: inline-block;
        border-left: 1px solid ${colors.greenL};
        border-right: 1px solid ${colors.greenL};
        padding: 2px 10px;
        font-size: 0.75rem;
        color: ${colors.muted};
        line-height: 1.4;
      }
      .feature-icon-circle {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        border: 2px solid ${colors.greenLrgb};
        color: ${colors.green};
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .feature-title-wrap {
        text-align: center;
        margin: 1.25rem 0 0.75rem;
      }
      .feature-title {
        display: inline-block;
        font-size: 1.2rem;
        font-weight: 700;
        color: ${colors.greenD};
        cursor: default;
      }

      .feature-desc {
        text-align: start;
        font-size: 1.1rem;
        color: ${colors.muted};
        line-height: 1.65;
        margin:0;
      }
        `}
      </style>
      <div className="container" style={{ maxWidth: "1180px" }}>
        <div
          className="label"
          style={{
            margin: "1rem 0",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            id="label"
            style={{
              ...sectionh1_style,
              position: "relative",
            }}
          >
            Platform features
          </h1>
        </div>
        <div
          className="text-center mx-auto mb-5"
          style={{ maxWidth: 800, width: "100%", padding: "0 1rem" }}
        >
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
            From tracking what's in your fridge to sharing surplus with your
            neighbors, ZeroWaste brings it all together in one simple app.
          </p>
        </div>

        <div className="row g-4">
          {features.map((f) => (
            <div key={f.title} className="col-md-6 col-lg-4">
              <div className="feature-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <span className="feature-tag">{f.tag}</span>
                  <div className="feature-icon-circle">{f.icon}</div>
                </div>

                <div className="feature-title-wrap">
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
