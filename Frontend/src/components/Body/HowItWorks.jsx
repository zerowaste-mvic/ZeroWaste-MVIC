// src/components/Body/HowItWorks.jsx
import { Store, UtensilsCrossed, Handshake } from 'lucide-react';
import { colors, sectionHeadingStyle, sectionSubStyle, shadows } from '../../theme';

const steps = [
  {
    num: '01',
    icon: <Store size={24} strokeWidth={2} />,
    title: 'Log Your Food',
    desc: 'List the food items in your kitchen to keep track of what you have and avoid double buying.',
  },
  {
    num: '02',
    icon: <UtensilsCrossed size={24} strokeWidth={2} />,
    title: 'Plan Your Meals',
    desc: 'Use our meal planning tool to create delicious recipes with what you already have, reducing waste.',
  },
  {
    num: '03',
    icon: <Handshake size={24} strokeWidth={2} />,
    title: "Share What's Left",
    desc: 'Too much food? Share it with your local community and help those in need, all with a simple click.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-5 bg-white" id="how" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 640 }}>
          <h2 style={{ ...sectionHeadingStyle, fontFamily: 'inherit', fontWeight: 800 }}>
            Reduce food waste in 3 simple steps
          </h2>
          <p className="mx-auto mb-0" style={{ ...sectionSubStyle, margin: '0 auto' }}>
            Getting started takes less than a minute. No complicated setup, just log, plan, and share.
          </p>
        </div>

        <div className="row g-4">
          {steps.map((step) => (
            <div key={step.num} className="col-lg-4">
              <div
                className="h-100 p-4 bg-white border"
                style={{
                  borderColor: colors.border,
                  borderRadius: 16,
                  padding: '2rem',
                  boxShadow: shadows.sm,
                }}
              >
                <div
                  style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: '#d4e8db',
                    lineHeight: 1,
                    marginBottom: '1rem',
                  }}
                >
                  {step.num}
                </div>
                <div
                  className="d-flex align-items-center justify-content-center text-white mb-4"
                  style={{ width: 56, height: 56, background: colors.green, borderRadius: 14 }}
                >
                  {step.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: colors.charcoal, marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: colors.muted, lineHeight: 1.65, marginBottom: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
