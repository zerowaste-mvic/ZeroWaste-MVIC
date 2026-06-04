// src/components/Body/HowItWorks/HowItWorks.jsx
import { Store, Search, PackageCheck } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    icon: <Store size={22} strokeWidth={2} />,
    title: 'Partners list surplus',
    desc: 'Restaurants, bakeries, and grocers post same-day surplus items at reduced prices — easily via our dashboard or mobile app.',
  },
  {
    num: '02',
    icon: <Search size={22} strokeWidth={2} />,
    title: 'Customers discover & reserve',
    desc: 'Browse mystery bags or specific items nearby. Reserve in one tap and pay securely through the app — no cash needed.',
  },
  {
    num: '03',
    icon: <PackageCheck size={22} strokeWidth={2} />,
    title: 'Pick up & enjoy',
    desc: 'Collect your bag during the pickup window. Every transaction automatically offsets carbon and donates to a local charity.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="container">
        <div className="how-header">
          <div>
            <p className="section-tag">How it works</p>
            <h2 className="section-heading">Three simple steps to zero waste</h2>
          </div>
          <p className="section-sub">
            Whether you're a business with surplus stock or someone looking for an
            affordable, sustainable meal — getting started takes under two minutes.
          </p>
        </div>

        <div className="how-steps">
          {steps.map((step) => (
            <div key={step.num} className="how-step">
              <div className="how-step-num">{step.num}</div>
              <div className="how-step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
