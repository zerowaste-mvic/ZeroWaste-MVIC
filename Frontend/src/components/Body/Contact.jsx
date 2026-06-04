// src/components/Body/Contact/Contact.jsx
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const contactMethods = [
  { icon: <Mail size={19} strokeWidth={2} />, label: 'Email us',  value: 'hello@saveplate.co' },
  { icon: <Phone size={19} strokeWidth={2} />, label: 'Call us',  value: '+44 20 7946 0831' },
  { icon: <MapPin size={19} strokeWidth={2} />, label: 'Visit us', value: '12 Bermondsey St, London SE1' },
];

const INITIAL = { firstName: '', lastName: '', email: '', role: '', message: '' };

export default function Contact() {
  const [form, setForm]       = useState(INITIAL);
  const [status, setStatus]   = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg]   = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      // ── LIVE: uncomment once backend is ready ──
      // await contactApi.submit(form);

      // ── MOCK: simulates a successful API call ──
      await new Promise((r) => setTimeout(r, 800));

      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      setErrMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-inner">

          {/* Info */}
          <div className="contact-info">
            <p className="section-tag">Get in touch</p>
            <h2 className="section-heading">We'd love to hear from you</h2>
            <p className="section-sub">
              Whether you're a business ready to reduce waste, a charity seeking
              donations, or just curious — our team responds within 24 hours.
            </p>

            <div className="contact-methods">
              {contactMethods.map((m) => (
                <div key={m.label} className="contact-method">
                  <div className="contact-method-icon">{m.icon}</div>
                  <div>
                    <div className="contact-method-label">{m.label}</div>
                    <div className="contact-method-value">{m.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">I'm a…</label>
              <select id="role" name="role" value={form.role} onChange={handleChange}>
                <option value="">Select one</option>
                <option>Business / Restaurant</option>
                <option>Charity / NGO</option>
                <option>Individual user</option>
                <option>Press / Media</option>
                <option>Investor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us a bit about your situation…"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {status === 'error' && (
              <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {errMsg}
              </p>
            )}

            <button
              className="btn btn-primary form-submit"
              onClick={handleSubmit}
              disabled={status === 'loading' || status === 'success'}
            >
              <Send size={16} strokeWidth={2.5} />
              {status === 'loading' ? 'Sending…'
                : status === 'success' ? '✓ Sent! We\'ll be in touch soon.'
                : 'Send message'}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
