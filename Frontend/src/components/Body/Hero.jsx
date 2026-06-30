// src/components/Body/Hero.jsx
import { Recycle, Users, Calendar } from 'lucide-react';
import { colors, btnPrimaryStyle, shadows } from '../../theme';

const stats = [
  { icon: Recycle, label: 'Food Saved', value: '10 kg' },
  { icon: Users, label: 'Active Donors', value: '100 people' },
  { icon: Calendar, label: 'Meals Planned', value: '100+' },
];

const headingStyle = {
  fontSize: 'clamp(2.4rem, 4.8vw, 3.6rem)',
  fontWeight: 800,
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  color: colors.charcoal,
  marginBottom: '1.25rem',
};

export default function Hero() {
  return (
    <section
      className="position-relative overflow-hidden"
      style={{
        background: colors.white,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e8f0ea' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
        <div className="row align-items-stretch g-5" style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem' }}>
          <div className="col-lg-6 d-flex flex-column h-100">
            <h1 style={headingStyle}>
              Rescue <span style={{ color: colors.green }}>Food.</span>
              <br />
              Feed <span style={{ color: colors.green }}>Communities.</span>
              <br />
              Foster <span style={{ color: colors.green }}>Sustainability.</span>
            </h1>

            <p
              className="mb-4"
              style={{ fontSize: '1.05rem', color: colors.muted, maxWidth: 500, lineHeight: 1.7 }}
            >
              ZeroWaste helps households track, share, and plan around their food, so nothing goes to waste.
            </p>

            <div className="d-flex align-items-center flex-wrap gap-3 mb-4 mb-lg-0">
              <a
                href="#"
                className="btn btn-primary btn-lg"
                style={{
                  ...btnPrimaryStyle,
                  padding: '0.75rem 1.75rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  borderRadius: 10,
                }}
              >
                Browse today&apos;s plates
              </a>
              <a
                href="#how"
                className="btn btn-lg"
                style={{
                  background: colors.white,
                  border: `1.5px solid ${colors.border}`,
                  color: colors.charcoal,
                  padding: '0.75rem 1.75rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  borderRadius: 10,
                }}
              >
                See how it works
              </a>
            </div>

            <div
              className="mt-4 mt-lg-auto"
              style={{
                borderTop: '1px solid #d4e8db',
                paddingTop: '1.25rem',
              }}
            >
              <div className="d-flex flex-wrap gap-2">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="d-flex align-items-center gap-2 flex-grow-1"
                    style={{
                      background: '#eaf5ef',
                      borderRadius: 12,
                      padding: '0.85rem 1rem',
                      minWidth: 140,
                      flex: '1 1 0',
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ color: colors.green }}
                    >
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: colors.muted, marginBottom: 2 }}>
                        {label}
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: colors.charcoal }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6 d-flex align-items-stretch">
            <div
              className="overflow-hidden w-100 h-100"
              style={{ borderRadius: 16, boxShadow: shadows.lg, aspectRatio: '4/5' }}
            >
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80"
                alt="Fresh healthy food including vegetables, fruits, and proteins"
                className="w-100 h-100 object-fit-cover d-block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
