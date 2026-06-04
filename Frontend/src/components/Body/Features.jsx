// src/components/Body/Features/Features.jsx
import { MapPin, Bell, BarChart2, Users, ShieldCheck, Zap } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: <MapPin size={22} strokeWidth={2} />,
    color: 'feat-icon-green',
    title: 'Live local map',
    desc: 'See every available food rescue within your area in real time. Filter by cuisine, dietary needs, or collection time.',
  },
  {
    icon: <Bell size={22} strokeWidth={2} />,
    color: 'feat-icon-warm',
    title: 'Smart alerts',
    desc: 'Get notified the moment your favourite spots post surplus. Set preferences once and never miss a deal again.',
  },
  {
    icon: <BarChart2 size={22} strokeWidth={2} />,
    color: 'feat-icon-brown',
    title: 'Impact dashboard',
    desc: 'Track your personal CO₂ savings, meals rescued, and money saved — all in a beautiful at-a-glance snapshot.',
  },
  {
    icon: <Users size={22} strokeWidth={2} />,
    color: 'feat-icon-green',
    title: 'Charity integration',
    desc: 'Businesses can donate unsold stock directly to verified local charities with a single click — fully tracked.',
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={2} />,
    color: 'feat-icon-warm',
    title: 'Safe & certified',
    desc: 'All partners pass our food-hygiene checks. Every listing includes allergen info, preparation time, and expiry details.',
  },
  {
    icon: <Zap size={22} strokeWidth={2} />,
    color: 'feat-icon-brown',
    title: 'Instant checkout',
    desc: 'Frictionless in-app payment, digital receipt, and QR pickup code — the whole flow takes under 30 seconds.',
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-header">
          <p className="section-tag">Platform features</p>
          <h2 className="section-heading">Everything you need to fight food waste</h2>
          <p className="section-sub">
            From real-time inventory tools to community impact dashboards,
            SavePlate is built for everyone in the chain.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feat-card">
              <div className={`feat-icon ${f.color}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
