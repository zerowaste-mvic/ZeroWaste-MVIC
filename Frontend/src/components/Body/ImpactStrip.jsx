// src/components/Body/ImpactStrip/ImpactStrip.jsx
import { useEffect, useState } from 'react';
import './ImpactStrip.css';

const SPRING_BOOT_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const STATIC = [
  { num: '820,000+', label: 'Meals rescued to date' },
  { num: '3,400',   label: 'Partner businesses' },
  { num: '47',      label: 'Cities covered' },
  { num: '180t',    label: 'CO₂ equivalent saved' },
];

export default function ImpactStrip() {
  const [stats, setStats] = useState(STATIC);

  useEffect(() => {
    // Calls GET http://localhost:8080/api/stats/impact
    // Spring Boot should return: { mealsRescued, partnerBusinesses, citiesCovered, co2Saved }
    fetch(`${SPRING_BOOT_URL}/api/stats/impact`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => setStats([
        { num: data.mealsRescued,      label: 'Meals rescued to date' },
        { num: data.partnerBusinesses, label: 'Partner businesses' },
        { num: data.citiesCovered,     label: 'Cities covered' },
        { num: data.co2Saved,          label: 'CO₂ equivalent saved' },
      ]))
      .catch(() => { /* keeps static fallback values */ });
  }, []);

  return (
    <section className="impact">
      <div className="container">
        <div className="impact-grid">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="impact-item-num">{s.num}</div>
              <div className="impact-item-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}