import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  colors,
  sectionHeadingStyle,
  sectionSubStyle,
  btnPrimaryStyle,
  sectionh1_style,
  shadows,
} from "../../theme";

const contactMethods = [
  {
    icon: <Mail size={24} strokeWidth={2} />,
    label: "Email us",
    value: "zerowaste@gmail.com",
  },
  {
    icon: <Phone size={24} strokeWidth={2} />,
    label: "Call us",
    value: "+01 12345678",
  },
  {
    icon: <MapPin size={24} strokeWidth={2} />,
    label: "Visit us",
    value: "MVIC, Gyaneshwor, Nepal",
  },
];

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const inputStyle = {
  borderColor: colors.border,
  borderWidth: "1.5px",
  borderRadius: 10,
  fontFamily: "inherit",
  fontSize: "0.9rem",
  padding: "0.7rem 1rem",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      setErrMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="py-5 contact-section" id="contact">
      <style>
        {`

          .contact-section{
            height: auto;
            align-content:center;
            position:relative;
            padding: 5rem 0;
            overflow:hidden;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);

          }

          .contact-section::before{
            content: "";
            position:absolute;
            inset:0;
            background-image: url(/images/background_grafitte.png);
            background-size:cover;
            background-position:center;
            background-repeat:no-repeat;
            opacity: 0.10;
            z-index:0;
            pointer-events: none;
          }
            .btn-send-msg {
            opacity: 0.75;
            transition: opacity 0.2s ease, background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          }

          .btn-send-msg:hover:not(:disabled) {
            opacity: 1 !important;
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
          }
        `}
      </style>
      <div
        className="container"
        style={{ maxWidth: "1180px", position: "relative", zIndex: 1 }}
      >
        <div className="row g-5 align-items-start">
          <div className="col-lg-5">
            <div
              className="label"
              style={{
                margin: "1rem 0",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                id="label"
                style={{
                  ...sectionh1_style,
                  position: "relative",
                }}
              >
                Get in touch
              </h1>
            </div>
            <h2
              style={{
                ...sectionHeadingStyle,
                fontFamily: "inherit",
                fontWeight: 800,
                marginBottom: "1rem",
              }}
            >
              We would love to hear from you
            </h2>
            <p style={{ ...sectionSubStyle, marginBottom: "2.5rem" }}>
              Whether you have a question about features, pricing, or anything
              else — our team is ready to answer all your questions.
            </p>

            <div className="d-flex flex-column gap-3">
              {contactMethods.map((m) => (
                <div key={m.label} className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      background: colors.showcase_green,
                      borderRadius: 8,
                      color: colors.green,
                    }}
                  >
                    {m.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: colors.muted,
                        marginBottom: 2,
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        color: colors.charcoal,
                      }}
                    >
                      {m.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="col-lg-7"
            style={{
              padding: 0,
            }}
          >
            <div
              className="p-4 p-lg-5 border"
              style={{
                background: colors.white,
                borderRadius: 20,
                boxShadow: shadows.sm,
              }}
            >
              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label
                    htmlFor="firstName"
                    className="form-label fw-semibold"
                    style={{ fontSize: "0.82rem", color: colors.charcoal }}
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="form-control"
                    style={inputStyle}
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6">
                  <label
                    htmlFor="lastName"
                    className="form-label fw-semibold"
                    style={{ fontSize: "0.82rem", color: colors.charcoal }}
                  >
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
                <label
                  htmlFor="email"
                  className="form-label fw-semibold"
                  style={{ fontSize: "0.82rem", color: colors.charcoal }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  style={inputStyle}
                  placeholder="johnsmith@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="phone"
                  className="form-label fw-semibold"
                  style={{ fontSize: "0.82rem", color: colors.charcoal }}
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  style={inputStyle}
                  placeholder="+977 012345678"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="message"
                  className="form-label fw-semibold"
                  style={{ fontSize: "0.82rem", color: colors.charcoal }}
                >
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

              {status === "error" && (
                <p className="text-danger small mb-3">{errMsg}</p>
              )}

              <button
                className="btn btn-send-msg w-100 d-inline-flex align-items-center justify-content-center gap-2"
                style={{
                  ...btnPrimaryStyle,
                  padding: "0.9rem",
                  fontSize: "1rem",
                  color: colors.white,
                  fontWeight: 600,
                  borderRadius: 10,
                }}
                onClick={handleSubmit}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
