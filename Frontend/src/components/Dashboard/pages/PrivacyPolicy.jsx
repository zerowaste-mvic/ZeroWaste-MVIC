// src/components/Legal/PrivacyPolicy.jsx
import { ArrowLeft } from "lucide-react";
import { colors, fonts, sectionHeadingStyle } from "../../../theme.js";

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Account Information",
        text: "When you create a ZeroWaste account, we collect your full name, email address, and a hashed version of your password. We do not store your password in plain text.",
      },
      {
        subtitle: "Food Inventory Data",
        text: "We collect and store the food items you add to your inventory, including item names, quantities, expiry dates, categories, and any associated notes you enter. This data is essential to the core functionality of ZeroWaste.",
      },
      {
        subtitle: "Usage Information",
        text: "We collect information about how you interact with ZeroWaste — pages visited, features used, and actions performed — to improve the platform and personalise your experience. This data is anonymised where possible.",
      },
      {
        subtitle: "Device and Technical Data",
        text: "We automatically collect certain technical information when you access ZeroWaste, including your browser type, operating system, IP address, and session timestamps. This helps us maintain the security and performance of the platform.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    bullets: [
      "To provide and operate the ZeroWaste platform, including food inventory tracking, expiry alerts, meal planning, and donation facilitation.",
      "To send you notifications about food items approaching their expiry dates.",
      "To generate food consumption analytics and insights displayed on your dashboard.",
      "To communicate important service updates, security alerts, and account-related messages.",
      "To improve our platform features based on aggregated, anonymised usage patterns.",
      "To comply with applicable legal obligations.",
    ],
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing and Disclosure",
    content: [
      {
        subtitle: "We do not sell your personal data.",
        text: "ZeroWaste does not sell, rent, or trade your personal information to third parties for marketing purposes.",
      },
      {
        subtitle: "Service Providers",
        text: "We may share data with trusted third-party service providers who help us operate ZeroWaste (e.g., hosting, analytics). These providers are contractually obligated to handle your data securely and only for the purposes we specify.",
      },
      {
        subtitle: "Donation Features",
        text: "If you choose to list food items for donation, limited item details (such as food type, quantity, and general location if provided) may be visible to other registered users who are looking to receive donated food. Your account name may be shown to facilitate the exchange.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required to do so by law or in response to a valid legal process, to protect the rights and safety of ZeroWaste, our users, or the public.",
      },
    ],
  },
  {
    id: "data-security",
    title: "4. Data Security",
    text: "ZeroWaste implements industry-standard security measures to protect your personal data. These include encrypted data transmission (HTTPS/TLS), hashed password storage, input validation on both the frontend and backend, and session management controls powered by Spring Security. While we take reasonable precautions, no method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password and to enable two-factor authentication (2FA) from your account settings.",
  },
  {
    id: "data-retention",
    title: "5. Data Retention",
    text: "We retain your account information and food inventory data for as long as your account is active. If you delete your account, we will delete or anonymise your personal data within 30 days, except where retention is required by law. Aggregated, anonymised usage statistics may be retained indefinitely.",
  },
  {
    id: "your-rights",
    title: "6. Your Rights",
    bullets: [
      "Access: You can view and download the personal data we hold about you from your account settings.",
      "Correction: You can update inaccurate or incomplete information directly in your profile and account settings.",
      "Deletion: You can request deletion of your account and associated data at any time by contacting us or using the account deletion option in settings.",
      "Portability: You can export your food inventory data in a structured format from the ZeroWaste dashboard.",
      "Restriction: You may request that we limit the processing of your personal data in certain circumstances.",
    ],
  },
  {
    id: "cookies",
    title: "7. Cookies and Local Storage",
    text: "ZeroWaste uses browser session storage and cookies to maintain your login session and remember your preferences. We do not use third-party advertising cookies. You may configure your browser to reject cookies, but this may affect the functionality of the platform.",
  },
  {
    id: "childrens-privacy",
    title: "8. Children's Privacy",
    text: "ZeroWaste is not directed at children under the age of 13. We do not knowingly collect personal information from children. If we become aware that a child under 13 has provided us with personal data, we will take steps to delete it promptly.",
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    text: "We may update this Privacy Policy from time to time. When we make significant changes, we will notify you via email or a notice within the ZeroWaste platform. Your continued use of ZeroWaste after the effective date constitutes your acceptance of the updated policy.",
  },
  {
    id: "contact",
    title: "10. Contact Us",
    text: "If you have any questions about this Privacy Policy or how your data is handled, please contact us at privacy@zerowaste.app or through the Contact page on our website.",
  },
];

export default function PrivacyPolicy({ onNavigate }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.white,
        fontFamily: fonts.body,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: colors.white,
          borderBottom: `1px solid ${colors.border}`,
          padding: "1rem 0",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: 860,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              color: colors.charcoal,
              fontFamily: fonts.body,
              fontSize: "0.9rem",
              fontWeight: 600,
              padding: "0.25rem 0",
            }}
          >
            <ArrowLeft size={16} />
            Back to home
          </button>

          <img
            src="/images/zerowaste-logo.png"
            alt="ZeroWaste"
            style={{ height: 44, width: "auto" }}
          />
        </div>
      </div>

      {/* Hero strip */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.authGreen} 0%, rgba(78,173,119,0.08) 100%)`,
          borderBottom: `2px solid ${colors.greenLrgb}`,
          padding: "3.5rem 0 3rem",
        }}
      >
        <div className="container" style={{ maxWidth: 860 }}>
          <p
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: colors.green,
              marginBottom: "0.75rem",
            }}
          >
            Legal
          </p>
          <h1
            style={{
              ...sectionHeadingStyle,
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              marginBottom: "0.75rem",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: colors.muted, fontSize: "0.95rem", marginBottom: 0 }}>
            Last updated: July 16, 2026 &nbsp;·&nbsp; Effective: July 16, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="container"
        style={{ maxWidth: 860, padding: "3rem 1.25rem 5rem" }}
      >
        {/* Intro */}
        <p
          style={{
            fontSize: "1.05rem",
            color: colors.muted,
            lineHeight: 1.8,
            marginBottom: "2.5rem",
            paddingBottom: "2.5rem",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          ZeroWaste ("we", "us", or "our") is committed to protecting your
          personal information and your right to privacy. This Privacy Policy
          explains what information we collect, how we use it, and the choices
          you have regarding your data when you use the ZeroWaste platform —
          a smart food waste management and household food inventory web
          application.
        </p>

        {/* Table of contents */}
        <div
          style={{
            background: colors.authGreen,
            border: `1px solid ${colors.greenLrgb}`,
            borderRadius: 12,
            padding: "1.5rem 2rem",
            marginBottom: "3rem",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: "0.88rem",
              color: colors.greenD,
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Contents
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "0.35rem 2rem",
            }}
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  color: colors.greenD,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            style={{ marginBottom: "2.75rem" }}
          >
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: "1.35rem",
                fontWeight: 700,
                color: colors.charcoal,
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: `2px solid ${colors.greenLrgb}`,
              }}
            >
              {section.title}
            </h2>

            {/* Plain text section */}
            {section.text && (
              <p
                style={{
                  color: colors.muted,
                  fontSize: "0.97rem",
                  lineHeight: 1.8,
                }}
              >
                {section.text}
              </p>
            )}

            {/* Content with subtitle */}
            {section.content &&
              section.content.map((item, i) => (
                <div key={i} style={{ marginBottom: "1.25rem" }}>
                  <p
                    style={{
                      fontWeight: 700,
                      color: colors.charcoal,
                      fontSize: "0.97rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.subtitle}
                  </p>
                  <p
                    style={{
                      color: colors.muted,
                      fontSize: "0.97rem",
                      lineHeight: 1.8,
                      marginBottom: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}

            {/* Bulleted list */}
            {section.bullets && (
              <ul
                style={{
                  paddingLeft: "1.25rem",
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {section.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      color: colors.muted,
                      fontSize: "0.97rem",
                      lineHeight: 1.75,
                    }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Footer note */}
        <div
          style={{
            marginTop: "1rem",
            padding: "1.5rem 2rem",
            background: colors.authGreen,
            border: `1px solid ${colors.greenLrgb}`,
            borderRadius: 12,
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: "0.95rem",
                color: colors.greenD,
                marginBottom: "0.3rem",
              }}
            >
              Have a question about your privacy?
            </p>
            <p
              style={{
                color: colors.muted,
                fontSize: "0.9rem",
                marginBottom: 0,
              }}
            >
              We're happy to help. Reach us at{" "}
              <a
                href="mailto:privacy@zerowaste.app"
                style={{ color: colors.greenD }}
              >
                privacy@zerowaste.app
              </a>{" "}
              or visit our{" "}
              <button
                type="button"
                onClick={() => onNavigate?.("home")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: colors.greenD,
                  fontFamily: fonts.body,
                  fontSize: "0.9rem",
                  textDecoration: "underline",
                }}
              >
                Contact page
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
