import { useEffect, useState } from "react";
import { colors } from "../../theme";
import { analyticsApi } from "../../services/api";

export default function ImpactStrip() {
  const [impact, setImpact] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [summaryData, impactData] = await Promise.all([
          analyticsApi.getSummary("month"),
          analyticsApi.getCommunityImpact(),
        ]);
        if (!cancelled) {
          setSummary(summaryData);
          setImpact(impactData);
        }
      } catch {
        if (!cancelled) {
          setSummary(null);
          setImpact({
            foodSavedCount: 0,
            activeHouseholds: 0,
            mealsSharedCount: 0,
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const formatCount = (value) =>
    new Intl.NumberFormat("en-US").format(value ?? 0);

  const stats = [
    {
      num: `${formatCount(summary?.foodSavedCount ?? impact?.foodSavedCount ?? 0)}+`,
      label: "food saved from waste in our community",
    },
    {
      num: `${formatCount(impact?.activeHouseholds ?? 0)}+`,
      label: "households actively reducing food waste",
    },
    {
      num: `${formatCount(impact?.mealsSharedCount ?? 0)}+`,
      label: "meals shared using ZeroWaste inventory",
    },
  ];
  return (
    <section className="py-5 impact-strip-section">
      <style>
        {`

          .impact-strip-section{
            min-height: 425px;
            align-content:center;
            position:relative;
            padding: 5rem 0;
            overflow:hidden;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);

          }

          @media (max-width: 767px) {
            .impact-strip-section {
              padding: 3rem 0;
            }
          }

          .impact-strip-section::before{
            content: "";
            position:absolute;
            inset:0;
            background-image: url(/images/background_grafitte.png);
            background-size:cover;
            background-position:center;
            background-repeat:no-repeat;
            opacity: 0.10;
            z-index:0;
            pointer-events: none;
          }
        `}
      </style>
      <div className="container" style={{ maxWidth: "1180px" }}>
        <div className="row g-4">
          {stats.map((s) => (
            <div key={s.label} className="col-lg-4">
              <div
                className="text-center h-100"
                style={{
                  cursor: "default",
                  background: colors.showcase_green,
                  borderRadius: 6,
                  padding: "2.5rem 1.5rem",
                  boxShadow: "0 0px 5px rgb(169, 169, 169)",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    color: colors.greenD,
                    lineHeight: 1,
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    color: colors.charcoal,
                    lineHeight: 1.5,
                  }}
                >
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
