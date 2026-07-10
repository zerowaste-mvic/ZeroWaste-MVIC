// src/components/Dashboard/pages/Settings.jsx
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { colors, fonts, btnPrimaryStyle } from '../../../theme';
import { userApi } from '../../../services/api';
import { getStoredUser, setStoredUser } from '../../../utils/auth';

const inputStyle = {
  borderColor: colors.border,
  borderWidth: '1.5px',
  borderRadius: 8,
  fontSize: '0.9rem',
  padding: '0.6rem 0.9rem',
  background: '#fbf8f2',
};

const labelStyle = {
  fontWeight: 500,
  fontSize: '0.88rem',
  color: colors.charcoal,
  marginBottom: '0.35rem',
};

const cardStyle = {
  background: '#f7f2df',
  border: `1px solid ${colors.border}`,
};

function SectionHeading({ children }) {
  return (
    <h5
      style={{
        fontFamily: fonts.display,
        fontWeight: 700,
        color: colors.charcoal,
        display: 'inline-block',
        borderBottom: `2px solid ${colors.green}`,
        paddingBottom: 4,
        marginBottom: '1.25rem',
      }}
    >
      {children}
    </h5>
  );
}

// Visual pill switch. Controlled via `checked`/`onChange`; `disabled` is used
// while a save request to the backend is in flight.
function ToggleSwitch({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      style={{
        width: 46,
        height: 26,
        borderRadius: 999,
        border: `1.5px solid ${checked ? colors.green : colors.border}`,
        background: checked ? colors.green : '#fff',
        position: 'relative',
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        flexShrink: 0,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: checked ? 22 : 2,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: checked ? '#fff' : colors.muted,
          transition: 'left 0.15s',
        }}
      />
    </button>
  );
}

function PreferenceRow({ title, description, checked, onChange, disabled }) {
  return (
    <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
      <div>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: colors.charcoal }}>{title}</div>
        {description && (
          <div style={{ fontSize: '0.8rem', color: colors.muted }}>{description}</div>
        )}
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  );
}

export default function Settings({ onProfileUpdated }) {
  // ---- Profile Information (backend-connected) ----
  const [profile, setProfile] = useState({ fullName: '', email: '', gender: '', address: '' });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });

  // ---- Privacy (backend-connected: only this toggle is functional) ----
  const [donationPublic, setDonationPublic] = useState(true);
  const [savingPrivacy, setSavingPrivacy] = useState(false);
  const [privacyMsg, setPrivacyMsg] = useState('');

  // ---- Security & Alerts (backend-connected: generate notifications on change) ----
  const [twoFactor, setTwoFactor] = useState(true);
  const [savingTwoFactor, setSavingTwoFactor] = useState(false);
  const [twoFactorMsg, setTwoFactorMsg] = useState('');

  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [savingExpiryAlerts, setSavingExpiryAlerts] = useState(false);
  const [expiryAlertsMsg, setExpiryAlertsMsg] = useState('');

  // ---- Replica-only toggle (no backend, local state only) ----
  const [donationUpdates, setDonationUpdates] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingProfile(true);
      try {
        const data = await userApi.getProfile();
        if (cancelled) return;
        setProfile({
          fullName: data.fullName || '',
          email: data.email || '',
          gender: data.gender || '',
          address: data.address || '',
        });
        setDonationPublic(data.donationPublic !== false);
        setTwoFactor(data.twoFactorEnabled !== false);
        setExpiryAlerts(data.expiryAlertsEnabled !== false);
      } catch (err) {
        if (!cancelled) setProfileMsg({ type: 'danger', text: err.message || 'Failed to load profile.' });
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profile.fullName.trim()) {
      setProfileMsg({ type: 'danger', text: 'Full name is required.' });
      return;
    }
    if (!profile.email.trim()) {
      setProfileMsg({ type: 'danger', text: 'Email is required.' });
      return;
    }

    setSavingProfile(true);
    setProfileMsg({ type: '', text: '' });
    try {
      const updated = await userApi.updateProfile({
        fullName: profile.fullName.trim(),
        email: profile.email.trim(),
        gender: profile.gender.trim(),
        address: profile.address.trim(),
      });
      setProfile({
        fullName: updated.fullName || '',
        email: updated.email || '',
        gender: updated.gender || '',
        address: updated.address || '',
      });
      // Keep the cached user (used by the dashboard header, etc.) in sync.
      const cached = getStoredUser();
      setStoredUser({ ...cached, ...updated });
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' });
      onProfileUpdated?.();
    } catch (err) {
      setProfileMsg({ type: 'danger', text: err.message || 'Failed to update profile.' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleTogglePrivacy = async (nextValue) => {
    const previous = donationPublic;
    setDonationPublic(nextValue); // optimistic
    setSavingPrivacy(true);
    setPrivacyMsg('');
    try {
      const updated = await userApi.updatePrivacy(nextValue);
      setDonationPublic(updated.donationPublic !== false);
      const cached = getStoredUser();
      setStoredUser({ ...cached, donationPublic: updated.donationPublic });
    } catch (err) {
      setDonationPublic(previous); // rollback
      setPrivacyMsg(err.message || 'Failed to update privacy setting.');
    } finally {
      setSavingPrivacy(false);
    }
  };

  const handleToggleTwoFactor = async (nextValue) => {
    const previous = twoFactor;
    setTwoFactor(nextValue); // optimistic
    setSavingTwoFactor(true);
    setTwoFactorMsg('');
    try {
      await userApi.updateTwoFactor(nextValue);
    } catch (err) {
      setTwoFactor(previous); // rollback
      setTwoFactorMsg(err.message || 'Failed to update two-factor authentication.');
    } finally {
      setSavingTwoFactor(false);
    }
  };

  const handleToggleExpiryAlerts = async (nextValue) => {
    const previous = expiryAlerts;
    setExpiryAlerts(nextValue); // optimistic
    setSavingExpiryAlerts(true);
    setExpiryAlertsMsg('');
    try {
      await userApi.updateExpiryAlerts(nextValue);
    } catch (err) {
      setExpiryAlerts(previous); // rollback
      setExpiryAlertsMsg(err.message || 'Failed to update expiry alerts.');
    } finally {
      setSavingExpiryAlerts(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 style={{ fontFamily: fonts.display, fontSize: '1.75rem', fontWeight: 700, color: colors.charcoal, marginBottom: '0.25rem' }}>
          Settings
        </h1>
        <p className="mb-0" style={{ color: colors.muted }}>
          Manage your profile, security, and notification preferences.
        </p>
      </div>

      <div className="row g-4">
        {/* ---- Left column: Profile Information ---- */}
        <div className="col-12 col-lg-6">
          <div className="rounded-4 p-4 h-100" style={cardStyle}>
            <SectionHeading>Profile Information</SectionHeading>

            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
                style={{ width: 90, height: 90, background: '#d7e6cf' }}
              >
                <User size={40} color={colors.muted} />
              </div>
              <div style={{ fontFamily: '"Roboto Mono", monospace', fontWeight: 700, color: colors.charcoal }}>
                {loadingProfile ? '...' : (profile.fullName || 'Your Name')}
              </div>
            </div>

            {profileMsg.text && (
              <div className={`alert alert-${profileMsg.type === 'success' ? 'success' : 'danger'} py-2 small`}>
                {profileMsg.text}
              </div>
            )}

            <form onSubmit={handleSaveProfile}>
              <div className="mb-3">
                <label className="form-label" style={labelStyle}>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  style={inputStyle}
                  value={profile.fullName}
                  onChange={handleProfileChange}
                  disabled={loadingProfile}
                  placeholder="Full name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={labelStyle}>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  style={inputStyle}
                  value={profile.email}
                  onChange={handleProfileChange}
                  disabled={loadingProfile}
                  placeholder="someone@gmail.com"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={labelStyle}>Gender:</label>
                <input
                  type="text"
                  name="gender"
                  className="form-control"
                  style={inputStyle}
                  value={profile.gender}
                  onChange={handleProfileChange}
                  disabled={loadingProfile}
                  placeholder="Male"
                />
              </div>

              <div className="mb-4">
                <label className="form-label" style={labelStyle}>Address:</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  style={inputStyle}
                  value={profile.address}
                  onChange={handleProfileChange}
                  disabled={loadingProfile}
                  placeholder="somewhere"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn px-4"
                  style={{ ...btnPrimaryStyle, background: colors.green, borderColor: colors.green }}
                  disabled={loadingProfile || savingProfile}
                >
                  {savingProfile ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ---- Right column ---- */}
        <div className="col-12 col-lg-6 d-flex flex-column gap-4">
          {/* Security — visual replica only, no backend function */}
          <div className="rounded-4 p-4" style={cardStyle}>
            <SectionHeading>Security</SectionHeading>

            <button
              type="button"
              className="btn mb-4"
              style={{ ...btnPrimaryStyle, background: '#c3d9b8', borderColor: '#c3d9b8', color: colors.charcoal, fontWeight: 700 }}
            >
              Change Password
            </button>

            {twoFactorMsg && <div className="alert alert-danger py-2 small mb-3">{twoFactorMsg}</div>}

            <PreferenceRow
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account."
              checked={twoFactor}
              onChange={handleToggleTwoFactor}
              disabled={savingTwoFactor || loadingProfile}
            />
          </div>

          {/* Privacy — the one functional toggle */}
          <div className="rounded-4 p-4" style={cardStyle}>
            <SectionHeading>Privacy</SectionHeading>

            {privacyMsg && <div className="alert alert-danger py-2 small mb-3">{privacyMsg}</div>}

            <PreferenceRow
              title="Make my donation public"
              description={
                donationPublic
                  ? 'Visible to everyone in Browse Food Item.'
                  : 'Only visible to you — hidden from everyone else.'
              }
              checked={donationPublic}
              onChange={handleTogglePrivacy}
              disabled={savingPrivacy || loadingProfile}
            />
          </div>

          {/* Notification Preferences — visual replicas only, no backend function */}
          <div className="rounded-4 p-4" style={cardStyle}>
            <SectionHeading>Notification Preferences</SectionHeading>

            {expiryAlertsMsg && <div className="alert alert-danger py-2 small mb-3">{expiryAlertsMsg}</div>}

            <PreferenceRow
              title="Expiry Alerts"
              description="Get notified about items being expiry"
              checked={expiryAlerts}
              onChange={handleToggleExpiryAlerts}
              disabled={savingExpiryAlerts || loadingProfile}
            />
            <PreferenceRow
              title="Donation Updates"
              description="Get updates about donation activities"
              checked={donationUpdates}
              onChange={setDonationUpdates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}