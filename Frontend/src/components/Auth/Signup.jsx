// src/components/Auth/Signup.jsx
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { colors, fonts } from "../../theme";

const SPRING_BOOT_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const INITIAL = { fullName: "", email: "", password: "", confirmPassword: "" };

const cardStyle = {
  overflow: "hidden",
  maxWidth: 1350,
  minHeight: "min(860px, calc(100vh - 3rem))",
  borderRadius: 20,
  boxShadow: "0 0px 12px rgba(0, 0, 0, 0.20)",
};

const illustrationFrameStyle = {
  background: colors.greenLrgb,
  borderRadius: "130px 10px 130px 10px",
  position: "relative",
};

const inputStyle = {
  background: colors.white,
  border: `1px solid ${colors.border}`,
  fontFamily: fonts.body,
  fontSize: "1rem",
  color: colors.charcoal,
  height: "3rem",
  padding: "0.375rem 0.75rem",
};

const bodyTextStyle = {
  fontFamily: fonts.body,
  color: colors.charcoal,
};

export default function Signup({ onNavigate }) {
  const [form, setForm] = useState(INITIAL);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [fieldErrors, setFieldErrors] = useState({});
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = "Full name is required.";
    if (!form.email.includes("@"))
      errors.email = "Enter a valid email address.";
    if (form.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    return Object.keys(errors).length ? errors : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors) {
      setFieldErrors(validationErrors);
      setErrMsg("");
      setStatus("error");
      return;
    }

    setFieldErrors({});
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch(`${SPRING_BOOT_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          err.message || "Registration failed. Please try again.",
        );
      }

      const data = await res.json();
      sessionStorage.setItem("zw_token", data.token);
      sessionStorage.setItem("zw_user", JSON.stringify(data.user));
      setForm(INITIAL);
      onNavigate?.("dashboard");
    } catch (err) {
      setErrMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-5"
      style={{ background: colors.white }}
    >
      <div
        className="signup-card row g-0 w-100"
        style={{
          ...cardStyle,
          minHeight: "min(860px, calc(100vh - 3rem))",
          background: "transparent",
        }}
      >
        <style>{`
          .back-to-home {
            position: relative;
            overflow: visible;
          }
          .back-to-home::before,
          .back-to-home::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            border-radius: 5px;
            background: ${colors.greenD};
            transition: width 0.25s ease;
          }

          .back-to-home:hover::before,
          .back-to-home:hover::after {
            width: 100%;
          }

          .signup-btn {
            opacity: 0.75;
            transition: opacity 0.2s ease, background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          }

          .signup-btn:hover:not(:disabled) {
            opacity: 1 !important;
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
          }

          .login-btn:hover{
            border-bottom: 1px solid ${colors.greenD};
          }
        `}</style>
        <div
          className="col-12 col-lg-6 order-lg-1 d-flex align-items-center justify-content-center px-4 px-xl-5 py-4 py-xl-5 border-end border-2 h-100"
          style={{
            background: colors.authGreen,
          }}
        >
          <div className="mx-auto" style={{ maxWidth: 400, width: "100%" }}>
            <button
              type="button"
              className="btn back-to-home btn-link p-1 text-dark d-inline-flex align-items-center mb-4"
              style={{
                ...bodyTextStyle,
                fontSize: "0.9rem",
                textDecoration: "none",
                fontWeight: 600,
                color: colors.charcoal,
              }}
              onClick={() => onNavigate?.("home")}
            >
              <ArrowLeft size={16} className="me-2" />
              Back to home
            </button>

            <div className="text-center mb-4">
              <img
                draggable="false"
                src="/images/zerowaste-logo.png"
                alt="ZeroWaste"
                className="img-fluid"
                style={{ maxWidth: 130 }}
              />
            </div>

            <h1
              className="text-center fw-bold text-dark mb-2"
              style={{ fontSize: "1.45rem" }}
            >
              Create your account
            </h1>
            <p
              className="text-center text-dark mb-4 mb-xl-5"
              style={{
                ...bodyTextStyle,
                fontSize: "0.95rem",
                color: colors.muted,
              }}
            >
              Start reducing food waste in under a minute.
            </p>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              {errMsg && !Object.keys(fieldErrors).length && (
                <div
                  className="alert alert-danger py-2 mb-0"
                  style={{ fontSize: "0.9rem" }}
                >
                  {errMsg}
                </div>
              )}

              <div>
                <label
                  htmlFor="fullName"
                  className="form-label fw-medium text-dark mb-1"
                  style={{ fontSize: "0.95rem" }}
                >
                  Full Name:
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="form-control signup-input rounded-3"
                  placeholder="John Doe"
                  style={inputStyle}
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.fullName && (
                  <p className="text-danger small mt-2 mb-0">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="form-label fw-medium text-dark mb-1"
                  style={{ fontSize: "0.95rem" }}
                >
                  Email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control signup-input rounded-3"
                  placeholder="someone@gmail.com"
                  style={inputStyle}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.email && (
                  <p className="text-danger small mt-2 mb-0">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="form-label fw-medium text-dark mb-1"
                  style={{ fontSize: "0.95rem" }}
                >
                  Password:
                </label>
                <div className="position-relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control signup-input rounded-3 pe-5"
                    style={inputStyle}
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y p-0 me-3 border-0 text-secondary"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-danger small mt-2 mb-0">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="form-label fw-medium text-dark mb-1"
                  style={{ fontSize: "0.95rem" }}
                >
                  Confirm Password:
                </label>
                <div className="position-relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control signup-input rounded-3 pe-5"
                    style={inputStyle}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y p-0 me-3 border-0 text-secondary"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-danger small mt-2 mb-0">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn w-100 text-white fw-bold text-uppercase rounded-3 py-2 signup-btn"
                style={{
                  ...bodyTextStyle,
                  marginTop: "0.5rem",
                  height: "3.5rem",
                  opacity: "0.75",
                  background: colors.greenL,
                  fontSize: "0.95rem",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  transition:
                    "background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                }}
                disabled={status === "loading"}
              >
                Register
              </button>

              <p
                className="text-center text-dark mb-0"
                style={{ fontSize: "0.95rem" }}
              >
                By signing up you agree to our{" "}
                <a href="#" className="text-dark text-decoration-underline">
                  terms &amp; privacy policy
                </a>
                .
              </p>
            </form>

            <p
              className="text-center text-dark mt-4 mb-0"
              style={{ ...bodyTextStyle, fontSize: "0.95rem" }}
            >
              Already have an account?{" "}
              <button
                type="button"
                className="btn login-btn btn-link"
                style={{
                  borderRadius: 0,
                  textDecoration: "none",
                  padding: "0 0 1px 0",
                  ...bodyTextStyle,
                  fontSize: "0.95rem",
                  color: colors.greenD,
                }}
                onClick={() => onNavigate?.("login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>

        {/* Hero panel */}
        <div
          className="col-lg-6 order-lg-2 d-none d-lg-flex flex-column justify-content-between px-5 py-5"
          style={{
            background: colors.authGreen,
            borderLeft: `2px solid ${colors.greenD}`,
            minHeight: "100%",
          }}
        >
          <div>
            <p
              className="mb-3 mb-xl-4 text-dark"
              style={{ ...bodyTextStyle, fontSize: "0.8rem", fontWeight: 600 }}
            >
              A Quiet Revolution
            </p>
            <h2
              className="fw-bold text-dark lh-sm mb-0"
              style={{
                fontFamily: fonts.display,
                fontSize: "clamp(2rem, 3vw, 2.8rem)",
                maxWidth: 420,
              }}
            >
              Every saved plate is a small kindness.
            </h2>
            <p
              className="mt-3 mb-0 text-dark"
              style={{
                ...bodyTextStyle,
                fontSize: "1rem",
                maxWidth: 420,
                lineHeight: 1.75,
              }}
            >
              Join thousands of households turning surplus into shared meals.
            </p>
          </div>

          <div className="d-flex align-items-center justify-content-center flex-grow-1 py-4 px-3">
            <div
              className="w-100 d-flex align-items-center justify-content-center p-4 p-xl-5 signup-illustration"
              style={{
                ...illustrationFrameStyle,
                maxWidth: 380,
                maxHeight: 480,
                boxShadow: "0 0px 10px rgba(0,0,0, 0.15)",
              }}
            >
              <img
                draggable="false"
                src="/images/signup-characters.png"
                alt="3d characters illustration"
                className="img-fluid"
                style={{ maxWidth: 365, position: "relative", zIndex: 1 }}
              />
            </div>
          </div>

          <p
            className="text-center text-muted mb-0"
            style={{ ...bodyTextStyle, fontSize: "1rem" }}
          >
            © 2026 ZeroWaste Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
