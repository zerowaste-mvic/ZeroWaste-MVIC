import { colors } from "../../theme";

const stats = [
  { num: "123 kg", label: "of food saved from waste in our community" },
  { num: "123 +", label: "households actively reducing food waste" },
  { num: "123 +", label: "meals shared using ZeroWaste inventory" },
];

export default function ImpactStrip() {
  return (
    <section className="py-5 impact-strip-section">
      <style>
        {`

          .impact-strip-section{
            height:425px;
            align-content:center;
            position:relative;
            padding: 5rem 0;
            overflow:hidden;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);

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
