// src/components/Body/Contact.jsx
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { colors, sectionHeadingStyle, sectionSubStyle, btnPrimaryStyle, shadows } from '../../theme';

const contactMethods = [
  { icon: <Mail size={19} strokeWidth={2} />, label: 'Email us', value: 'hello@zerowaste.co' },
  { icon: <Phone size={19} strokeWidth={2} />, label: 'Call us', value: '+44 20 7946 0831' },
  { icon: <MapPin size={19} strokeWidth={2} />, label: 'Visit us', value: '12 Bermondsey St, London SE1' },
];

const INITIAL = { firstName: '', lastName: '', email: '', phone: '', message: '' };

const inputStyle = {
  borderColor: colors.border,
  borderWidth: '1.5px',
  borderRadius: 10,
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  padding: '0.7rem 1rem',
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      setErrMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section
      className="py-5"
      id="contact"
      style={{ paddingTop: '5rem', paddingBottom: '5rem', background: '#f8fbf9' }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
        <div className="row g-5 align-items-start">
          <div className="col-lg-5">
            <h2 style={{ ...sectionHeadingStyle, fontFamily: 'inherit', fontWeight: 800, marginBottom: '1rem' }}>
              We would love to hear from you
            </h2>
            <p style={{ ...sectionSubStyle, marginBottom: '2.5rem' }}>
              Whether you have a question about features, pricing, or anything else —
              our team is ready to answer all your questions.
            </p>

            <div className="d-flex flex-column gap-3">
              {contactMethods.map((m) => (
                <div key={m.label} className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: 44, height: 44, background: '#eaf5ef', borderRadius: 12, color: colors.green }}
                  >
                    {m.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: colors.muted, marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 500, color: colors.charcoal }}>{m.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-7">
            <div
              className="p-4 p-lg-5 bg-white border"
              style={{ borderColor: colors.border, borderRadius: 20, boxShadow: shadows.sm }}
            >
              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label fw-semibold" style={{ fontSize: '0.82rem', color: colors.charcoal }}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="form-control"
                    style={inputStyle}
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label fw-semibold" style={{ fontSize: '0.82rem', color: colors.charcoal }}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="form-control"
                    style={inputStyle}
                    placeholder="Smith"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold" style={{ fontSize: '0.82rem', color: colors.charcoal }}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  style={inputStyle}
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-semibold" style={{ fontSize: '0.82rem', color: colors.charcoal }}>
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  style={inputStyle}
                  placeholder="+44 7700 900000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-semibold" style={{ fontSize: '0.82rem', color: colors.charcoal }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  style={{ ...inputStyle, minHeight: 120 }}
                  placeholder="Tell us how we can help…"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {status === 'error' && (
                <p className="text-danger small mb-3">{errMsg}</p>
              )}

              <button
                className="btn btn-primary w-100 d-inline-flex align-items-center justify-content-center gap-2"
                style={{ ...btnPrimaryStyle, padding: '0.9rem', fontSize: '1rem', fontWeight: 600, borderRadius: 10 }}
                onClick={handleSubmit}
                disabled={status === 'loading' || status === 'success'}
              >
                <Send size={16} strokeWidth={2.5} />
                {status === 'loading' ? 'Sending…'
                  : status === 'success' ? "✓ Sent! We'll be in touch soon."
                  : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
