import { Store, UtensilsCrossed, Handshake } from "lucide-react";
import {
  colors,
  sectionh1_style,
  sectionHeadingStyle,
  sectionSubStyle,
} from "../../theme";

const steps = [
  {
    num: "01",
    icon: <Store size={32} strokeWidth={2} />,
    title: "Log Your Food",
    desc: "List the food items in your kitchen to keep track of what you have and avoid double buying.",
  },
  {
    num: "02",
    icon: <UtensilsCrossed size={32} strokeWidth={2} />,
    title: "Plan Your Meals",
    desc: "Use our meal planning tool to create delicious recipes with what you already have, reducing waste.",
  },
  {
    num: "03",
    icon: <Handshake size={32} strokeWidth={2} />,
    title: "Share What's Left",
    desc: "Too much food? Share it with your local community and help those in need, all with a simple click.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-5 bg-white how-it-works-section" id="how">
      <style>
        {`
          .how-it-works-section{
            position:relative;
            padding: 5rem 0;
            overflow:hidden;
          }

          .how-it-works-section::before{
            content: "";
            position:absolute;
            inset:0;
            background-image: url(/images/background_grafitte.png);
            background-size:cover;
            background-position:center;
            background-repeat:no-repeat;
            opacity: 0.13;
            z-index:0;
            pointer-events: none;
          }

          .how-it-works-section .container{
            position:relative;
            z-index:1;
          }

          #label::before{
          content: "";
          position: absolute;
          bottom: -2px;
          width: 100%;
          height: 2px;
          background: ${colors.greenD};
          }

          .h3_label::before{
          content: "";
          position: absolute;
          bottom: -2px;
          width: 100%;
          height: 2px;
          border-radius: 12px;
          background: ${colors.greenL};
        }

        .three-process:hover .h3_label, .num-sw{
          opacity: 1 !important;
        }
          `}
      </style>
      <div className="container" style={{ maxWidth: "1180px" }}>
        <div className="how-it-works-content">
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
              How it works
            </h1>
          </div>

          <div className="text-center mx-auto mb-5" style={{ width: "800px" }}>
            <h2
              style={{
                ...sectionHeadingStyle,
                fontFamily: "inherit",
                fontWeight: 800,
              }}
            >
              Reduce food waste in 3 simple steps
            </h2>
            <p
              className="mx-auto mb-0"
              style={{ ...sectionSubStyle, margin: "0 auto" }}
            >
              Getting started takes less than a minute. No complicated setup,
              just log, plan, and share.
            </p>
          </div>

          <div className="row g-4">
            {steps.map((step) => (
              <div key={step.num} className="col-lg-4">
                <div
                  className="bg-white border three-process"
                  style={{
                    height: "auto",
                    width: "auto",
                    border: "none",
                    borderRadius: 12,
                    padding: "0.85rem",
                    boxShadow: "0 0px 15px rgba(169, 169, 169, 0.30)",
                  }}
                >
                  <div
                    className="num-sw"
                    style={{
                      textAlign: "end",
                      fontSize: "5rem",
                      fontWeight: 800,
                      color: "#d4e8db",
                      lineHeight: 1,
                      marginBottom: "1rem",
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-center text-white mb-4"
                    style={{
                      borderRadius: 12,
                      width: 56,
                      height: 56,
                      background: colors.green,
                      border: `2px solid ${colors.greenL}`,
                    }}
                  >
                    {step.icon}
                  </div>

                  <div
                    className="content-container"
                    style={{
                      textAlign: "center",
                      boxShadow: "0 0px 15px rgba(169, 169, 169, 0.20)",
                      borderRadius: 8,
                      padding: "2px 8px",
                      alignContent: "center",
                      height: "170px",
                      width: "auto",
                      background: `${colors.low_greenFade}`,
                    }}
                  >
                    <h3
                      className="h3_label"
                      style={{
                        opacity: 0.75,
                        display: "inline-block",
                        position: "relative",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: colors.greenD,
                        marginBottom: "0.75rem",
                        transition: "all 0.25s ease",
                        cursor: "default",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        textAlign: "start",
                        fontSize: "1.1rem",
                        color: colors.muted,
                        lineHeight: 1.65,
                        marginBottom: 0,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
