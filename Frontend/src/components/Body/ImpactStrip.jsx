// src/components/Body/ImpactStrip.jsx
import { colors } from '../../theme';

const stats = [
  { num: '123 kg', label: 'of food saved from waste in our community' },
  { num: '123 +', label: 'households actively reducing food waste' },
  { num: '123 +', label: 'meals shared using ZeroWaste inventory' },
];

export default function ImpactStrip() {
  return (
    <section
      className="py-5"
      style={{
        background: colors.white,
        paddingTop: '3rem',
        paddingBottom: '3rem',
      }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
        <div className="row g-4">
          {stats.map((s) => (
            <div key={s.label} className="col-lg-4">
              <div
                className="text-center h-100"
                style={{
                  background: '#eaf5ef',
                  borderRadius: 16,
                  padding: '2.5rem 1.5rem',
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: colors.greenD,
                    lineHeight: 1,
                    marginBottom: '0.75rem',
                  }}
                >
                  {s.num}
                </div>
                <div style={{ fontSize: '0.95rem', color: colors.charcoal, lineHeight: 1.5 }}>
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
