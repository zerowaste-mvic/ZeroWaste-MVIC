// src/components/Body/About.jsx
import { Heart, Eye, Sprout, Handshake } from "lucide-react";
import heroImage from "../../../../Assets/image gallery/hero_image02.png";
import {
  colors,
  sectionHeadingStyle,
  btnPrimaryStyle,
  shadows,
} from "../../theme";

const values = [
  {
    icon: <Heart size={20} strokeWidth={2} />,
    title: "Community First",
    text: "Every decision is measured by its impact on people and planet.",
  },
  {
    icon: <Eye size={20} strokeWidth={2} />,
    title: "Full Transparency",
    text: "Open reporting on food rescued, carbon saved, and funds donated.",
  },
  {
    icon: <Sprout size={20} strokeWidth={2} />,
    title: "Sustainable Design",
    text: "Built to grow without extracting more than we give back.",
  },
  {
    icon: <Handshake size={20} strokeWidth={2} />,
    title: "Fair Distribution",
    text: "We succeed only when our community partners and members do too.",
  },
];

export default function About({ onNavigate }) {
  return (
    <section
      className="py-5 bg-white"
      id="about"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <div className="container" style={{ maxWidth: "1180px" }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div
              className="overflow-hidden"
              style={{
                borderRadius: 20,
                aspectRatio: "1/1",
                boxShadow: shadows.lg,
              }}
            >
              <img
                src={heroImage}
                alt="Fresh ingredients including broccoli, fruits, dairy, and vegetables"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>

          <div className="col-lg-6">
            <h2
              style={{
                ...sectionHeadingStyle,
                fontFamily: "inherit",
                fontWeight: 800,
              }}
            >
              We believe no good food should go waste
            </h2>

            <p
              style={{
                fontSize: "1.05rem",
                color: colors.muted,
                marginBottom: "2rem",
                lineHeight: 1.75,
              }}
            >
              We are convinced that the gap between food waste and food need can
              be closed. ZeroWaste exists to help households track what they
              have, plan smarter meals, and share surplus with neighbours —
              turning good food into shared value instead of landfill.
            </p>

            <div className="row g-3 mb-4">
              {values.map((v) => (
                <div key={v.title} className="col-sm-6">
                  <div className="d-flex gap-3 align-items-start">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: 40,
                        height: 40,
                        background: "#eaf5ef",
                        borderRadius: 10,
                        color: colors.green,
                      }}
                    >
                      {v.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          color: colors.charcoal,
                          marginBottom: 4,
                        }}
                      >
                        {v.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: colors.muted,
                          lineHeight: 1.55,
                        }}
                      >
                        {v.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary btn-lg"
              style={{
                ...btnPrimaryStyle,
                padding: "0.85rem 2rem",
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 10,
              }}
              onClick={() => onNavigate?.("signup")}
            >
              Join Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
