// src/components/Header/Header.jsx
import { colors, btnPrimaryStyle } from "../../theme";

export default function Header({ onNavigate }) {
  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="sticky-top border-bottom bg-white"
      style={{
        borderColor: `${colors.border} !important`,
        zIndex: 100,
      }}
    >
      <style>
        {`.btn-register {
            opacity: 0.75;
            transition: opacity 0.2s ease, background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          }

          .btn-register:hover:not(:disabled) {
            opacity: 1 !important;
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
          }

          .btn-outline{
            transition: all 0.25s ease;
          }

          .btn-outline:hover{
            opacity: 1 !important;
            background:${colors.green};
            border-color: transparent;
          }

          
          `}
      </style>
      <div className="container" style={{ maxWidth: "1180px" }}>
        <nav
          className="d-flex align-items-center justify-content-between gap-4"
          style={{ height: "80px" }}
        >
          <a href="#" className="text-decoration-none">
            <img
              draggable="false"
              src="/images/zerowaste-logo.png"
              alt="ZeroWaste logo"
              style={{ height: 63, width: "auto" }}
            />
          </a>

          <ul className="d-none d-lg-flex align-items-center gap-5 list-unstyled mb-0">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-decoration-none"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: colors.charcoal,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.green;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.charcoal;
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline btn-lg"
              style={{
                opacity: 0.75,
                borderColor: colors.green,
                color: colors.charcoal,
                fontWeight: 600,
                borderRadius: "6px",
                borderWidth: "2px",
                padding: "0.45rem 1.25rem",
                fontSize: "0.9rem",
              }}
              onClick={() => onNavigate?.("login")}
            >
              Login
            </button>
            <button
              className="btn btn-primary btn-register"
              style={{
                ...btnPrimaryStyle,
                fontWeight: 600,
                padding: "0.45rem 1.15rem",
                fontSize: "0.9rem",
              }}
              onClick={() => onNavigate?.("signup")}
            >
              Get Started
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
