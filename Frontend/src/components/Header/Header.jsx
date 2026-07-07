// src/components/Header/Header.jsx
import { colors, btnPrimaryStyle } from '../../theme';

export default function Header({ onNavigate }) {
  const navLinks = [
    { label: 'How it works', href: '#how' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const loginOutlineStyle = {
    borderColor: colors.green,
    color: colors.green,
    fontWeight: 600,
    borderRadius: '8px',
    borderWidth: '2px',
    padding: '0.45rem 1.25rem',
    fontSize: '0.9rem',
    background: 'transparent',
  };

  return (
    <header
      className="sticky-top border-bottom bg-white"
      style={{
        borderColor: `${colors.border} !important`,
        zIndex: 100,
      }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
        <nav className="d-flex align-items-center justify-content-between gap-4" style={{ height: '80px' }}>
          <a href="#" className="text-decoration-none">
            <img
              src="/zerowaste-logo.png"
              alt="ZeroWaste — Smart choices. Less waste. Better tomorrow."
              style={{ height: 72, width: 'auto' }}
            />
          </a>

          <ul className="d-none d-lg-flex align-items-center gap-5 list-unstyled mb-0">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-decoration-none"
                  style={{ fontSize: '0.95rem', fontWeight: 500, color: colors.charcoal }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = colors.green; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = colors.charcoal; }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-success"
              style={loginOutlineStyle}
              onClick={() => onNavigate?.('login')}
            >
              Login
            </button>
            <button
              className="btn btn-primary"
              style={{ ...btnPrimaryStyle, fontWeight: 600, padding: '0.45rem 1.25rem', fontSize: '0.9rem' }}
              onClick={() => onNavigate?.('signup')}
            >
              Get Started
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
