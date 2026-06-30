// src/components/Body/Hero.jsx
import { Package, Users, UtensilsCrossed } from 'lucide-react';
import { colors, btnPrimaryStyle, btnOutlineStyle, shadows } from '../../theme';

const stats = [
  { icon: Package, label: 'Food Saved', value: '123 kg' },
  { icon: Users, label: 'Active Users', value: '123 people' },
  { icon: UtensilsCrossed, label: 'Meals Shared', value: '123 meals' },
];

const headingStyle = {
  fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
  fontWeight: 800,
  lineHeight: 1.15,
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
        <div className="row align-items-center g-5 py-5" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="col-lg-6">
            <h1 style={headingStyle}>
              Rescue <span style={{ color: colors.green }}>Food.</span>{' '}
              Feed <span style={{ color: colors.green }}>Communities.</span>{' '}
              Foster <span style={{ color: colors.green }}>Sustainability.</span>
            </h1>

            <p
              className="mb-4"
              style={{ fontSize: '1.05rem', color: colors.muted, maxWidth: 480, lineHeight: 1.7 }}
            >
              ZeroWaste helps you reduce food waste, save money and support local communities.
            </p>

            <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
              <a
                href="#"
                className="btn btn-primary btn-lg"
                style={{ ...btnPrimaryStyle, padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 600, borderRadius: 10 }}
              >
                Start Saving Today
              </a>
              <a
                href="#how"
                className="btn btn-outline-secondary btn-lg"
                style={{ ...btnOutlineStyle, padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 600, borderRadius: 10 }}
              >
                See how it works
              </a>
            </div>

            <div className="d-flex flex-wrap gap-3">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="d-flex align-items-center gap-2"
                  style={{
                    background: '#eaf5ef',
                    borderRadius: '100px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: colors.greenD,
                  }}
                >
                  <Icon size={16} strokeWidth={2.5} style={{ color: colors.green }} />
                  <span>{label}: {value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="overflow-hidden"
              style={{ borderRadius: 20, aspectRatio: '4/5', boxShadow: shadows.lg }}
            >
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80"
                alt="Fresh healthy food including vegetables, fruits, and proteins"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
