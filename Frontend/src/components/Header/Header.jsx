// src/components/Header/Header.jsx
import { Leaf, ArrowRight } from 'lucide-react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav>
          {/* Logo */}
          <a href="#" className="nav-logo">
            <span className="nav-logo-icon">
              <Leaf size={18} strokeWidth={2.5} />
            </span>
            SavePlate
          </a>

          {/* Nav links */}
          <ul className="nav-links">
            <li><a href="#how">How it works</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          {/* CTA buttons */}
          <div className="nav-cta">
            {/* TODO: connect to authApi.login() */}
            <a href="#" className="btn btn-outline">Log in</a>
            {/* TODO: connect to authApi.register() */}
            <a href="#" className="btn btn-primary">
              <ArrowRight size={15} strokeWidth={2.5} />
              Join free
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
