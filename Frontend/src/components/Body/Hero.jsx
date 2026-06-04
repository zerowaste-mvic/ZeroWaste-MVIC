// src/components/Body/Hero/Hero.jsx
import { useEffect, useState } from 'react';
import { Utensils, ArrowRight, TrendingDown } from 'lucide-react';
import './Hero.css';
// import { statsApi } from '../../../services/api'; // ← uncomment to fetch live stats

export default function Hero() {
  // TODO: replace static data with API call
  const [stats, setStats] = useState({
    mealsRescued: '820K+',
    partnerBusinesses: '3,400',
    co2Prevented: '180t',
    savedToday: '2,140 kg rescued',
  });

  // useEffect(() => {
  //   statsApi.getGlobal().then(data => setStats(data)).catch(console.error);
  // }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">

          {/* ── Left copy ── */}
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Reducing food waste since 2021
            </span>

            <h1>
              Rescue food.<br />
              <em>Feed community.</em><br />
              Save the planet.
            </h1>

            <p className="hero-desc">
              SavePlate connects surplus food from restaurants, bakeries, and grocery
              stores to the people and charities who need it most — before it hits the bin.
            </p>

            <div className="hero-actions">
              {/* TODO: link to /browse */}
              <a href="#" className="btn btn-primary btn-lg">
                <Utensils size={17} strokeWidth={2.5} />
                Browse today's plates
              </a>
              <a href="#how" className="btn btn-outline btn-lg">
                See how it works
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">{stats.mealsRescued}</div>
                <div className="hero-stat-label">Meals rescued</div>
              </div>
              <div>
                <div className="hero-stat-num">{stats.partnerBusinesses}</div>
                <div className="hero-stat-label">Partner businesses</div>
              </div>
              <div>
                <div className="hero-stat-num">{stats.co2Prevented}</div>
                <div className="hero-stat-label">CO₂ prevented</div>
              </div>
            </div>
          </div>

          {/* ── Right visual ── */}
          <div className="hero-visual">
            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=900&q=80"
                alt="Colourful fresh produce at a market stall"
              />
            </div>

            <div className="hero-badge">
              <div className="hero-badge-icon">
                <TrendingDown size={20} strokeWidth={2} />
              </div>
              <div>
                <div className="hero-badge-label">Food saved today</div>
                {/* TODO: replace with live statsApi.getGlobal().savedToday */}
                <div className="hero-badge-value">{stats.savedToday}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave break */}
      <div className="hero-wave">
        <svg
          className="divider-wave"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
