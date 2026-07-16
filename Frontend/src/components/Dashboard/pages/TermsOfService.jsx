// src/components/Legal/TermsOfService.jsx
import { ArrowLeft } from "lucide-react";
import { colors, fonts, sectionHeadingStyle } from "../../../theme.js";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    text: 'By creating a ZeroWaste account or accessing any part of the ZeroWaste platform, you confirm that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please do not use ZeroWaste. These Terms constitute a legally binding agreement between you ("User") and ZeroWaste ("we", "us", "our").',
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    bullets: [
      "You must be at least 13 years of age to create a ZeroWaste account.",
      "By registering, you represent that all information you provide is accurate and that you have the authority to agree to these Terms.",
      "ZeroWaste is currently designed for use in a personal, non-commercial household context.",
    ],
  },
  {
    id: "account",
    title: "3. Your Account",
    content: [
      {
        subtitle: "Registration",
        text: "You must provide a valid email address and a strong password when registering. You are responsible for maintaining the confidentiality of your login credentials. We strongly recommend enabling two-factor authentication (2FA) from your account settings.",
      },
      {
        subtitle: "Account Security",
        text: "You are solely responsible for all activity that occurs under your account. You agree to notify us immediately at support@zerowaste.app if you suspect any unauthorised access to your account.",
      },
      {
        subtitle: "Account Accuracy",
        text: "You agree to keep your account information up to date. ZeroWaste reserves the right to suspend or terminate accounts that are found to contain false or misleading information.",
      },
    ],
  },
  {
    id: "acceptable-use",
    title: "4. Acceptable Use",
    intro:
      "You agree to use ZeroWaste only for lawful purposes and in a manner that does not infringe the rights of others. You must not:",
    bullets: [
      "Use the platform to upload or share any content that is unlawful, harmful, abusive, defamatory, or otherwise objectionable.",
      "Attempt to gain unauthorised access to any part of the ZeroWaste system, servers, or databases.",
      "Reverse-engineer, decompile, or otherwise attempt to extract source code from the ZeroWaste application.",
      "Use automated means (bots, scrapers, crawlers) to access or collect data from ZeroWaste without our express written permission.",
      "Use ZeroWaste for any commercial purpose, including reselling access or data, without prior written authorisation from ZeroWaste.",
      "Upload malicious code, viruses, or any other software that may harm the platform or its users.",
      "Impersonate another person or entity, or misrepresent your affiliation with any person or entity.",
    ],
  },
  {
    id: "food-data",
    title: "5. Food Inventory Data",
    content: [
      {
        subtitle: "Your Data, Your Responsibility",
        text: "All food inventory data you enter into ZeroWaste — including item names, quantities, and expiry dates — is your own content. You are responsible for its accuracy. ZeroWaste is a management tool only; we do not verify the safety, edibility, or suitability of any food item you record.",
      },
      {
        subtitle: "Meal Planning and Suggestions",
        text: "Meal planning suggestions provided by ZeroWaste are generated based on the data in your inventory and are for informational purposes only. They do not constitute dietary, nutritional, or health advice.",
      },
      {
        subtitle: "Donation Listings",
        text: "If you use the donation feature to list food items for other users, you warrant that items listed are safe to consume and legal to share. ZeroWaste is not a party to any food exchange and accepts no liability for any disputes, harm, or losses arising from user-to-user food donations.",
      },
    ],
  },
  {
    id: "notifications",
    title: "6. Notifications and Communications",
    text: "By creating an account, you agree to receive service-related notifications, including expiry alerts and account security messages. These communications are essential to the service and cannot be opted out of while your account remains active. You may manage optional communications (such as product updates) from your account settings.",
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property",
    text: 'ZeroWaste and all of its content — including the platform design, logo, text, features, and code — are owned by ZeroWaste and are protected by applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable licence to use ZeroWaste for its intended purpose. Nothing in these Terms grants you any rights to use ZeroWaste\'s trademarks, logos, or branding without prior written consent. "ZeroWaste" and the ZeroWaste logo are trademarks of ZeroWaste.',
  },
  {
    id: "disclaimers",
    title: "8. Disclaimers",
    content: [
      {
        subtitle: "No Food Safety Guarantee",
        text: "ZeroWaste provides expiry-date tracking as a convenience tool based on data you enter. We do not guarantee the safety or quality of any food item. Always rely on your own judgement and applicable food safety guidelines.",
      },
      {
        subtitle: 'Platform "As Is"',
        text: 'ZeroWaste is provided on an "as is" and "as available" basis. We do not guarantee that the platform will be uninterrupted, error-free, or free from bugs or security vulnerabilities. We reserve the right to modify, suspend, or discontinue any part of the service at any time.',
      },
    ],
  },
  {
    id: "limitation-of-liability",
    title: "9. Limitation of Liability",
    text: "To the fullest extent permitted by applicable law, ZeroWaste shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the platform — including, but not limited to, loss of data, food spoilage, or any harm arising from the donation feature. Our total liability to you for any claim arising from these Terms or your use of ZeroWaste shall not exceed the amount you paid, if any, to access the service in the twelve months preceding the claim.",
  },
  {
    id: "termination",
    title: "10. Termination",
    content: [
      {
        subtitle: "By You",
        text: "You may delete your account at any time from your account settings. Upon deletion, your personal data will be removed in accordance with our Privacy Policy.",
      },
      {
        subtitle: "By ZeroWaste",
        text: "We reserve the right to suspend or terminate your account without notice if we reasonably believe you have violated these Terms or if your account has been involved in fraudulent, abusive, or illegal activity.",
      },
    ],
  },
  {
    id: "changes",
    title: "11. Changes to These Terms",
    text: "We may revise these Terms of Service from time to time. When we make material changes, we will notify you by email or through a prominent notice on the ZeroWaste platform. The updated Terms will take effect on the date specified in the notice. Your continued use of ZeroWaste after that date constitutes your acceptance of the revised Terms.",
  },
  {
    id: "governing-law",
    title: "12. Governing Law",
    text: "These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in the applicable territory.",
  },
  {
    id: "contact",
    title: "13. Contact",
    text: "For any questions about these Terms of Service, please contact us at legal@zerowaste.app or through the Contact page on our website.",
  },
];

export default function TermsOfService({ onNavigate }) {
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
            Terms of Service
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
          Welcome to ZeroWaste. These Terms of Service govern your access to
          and use of the ZeroWaste web application — a smart food waste
          management and household food inventory platform. Please read them
          carefully before creating an account or using any of our features.
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

            {/* Intro paragraph before bullets */}
            {section.intro && (
              <p
                style={{
                  color: colors.muted,
                  fontSize: "0.97rem",
                  lineHeight: 1.8,
                  marginBottom: "0.75rem",
                }}
              >
                {section.intro}
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
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: colors.greenD,
              marginBottom: "0.3rem",
            }}
          >
            Questions about these Terms?
          </p>
          <p
            style={{
              color: colors.muted,
              fontSize: "0.9rem",
              marginBottom: 0,
            }}
          >
            Contact us at{" "}
            <a
              href="mailto:legal@zerowaste.app"
              style={{ color: colors.greenD }}
            >
              legal@zerowaste.app
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
  );
}
