// src/components/Dashboard/pages/Notifications.jsx
import { useEffect, useMemo, useState } from 'react';
import { colors, fonts, btnPrimaryStyle, btnOutlineStyle } from '../../../theme';
import { notificationApi } from '../../../services/api';

const TABS = ['All', 'Alerts', 'Donations', 'Reminders', 'System'];

function timeAgo(isoString) {
  if (!isoString) return '';
  const then = new Date(isoString).getTime();
  const diffMs = Date.now() - then;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  return new Date(isoString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function Notifications({ onUnreadCountChange }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [actioningId, setActioningId] = useState(null);
  const [actionErr, setActionErr] = useState('');

  const load = async () => {
    setLoading(true);
    setErrMsg('');
    try {
      const data = await notificationApi.getAll();
      const list = Array.isArray(data) ? data : [];
      // Keep each item's original read/unread flag so the list can still
      // highlight what's new — but the badge itself is cleared the moment
      // this page opens (matches the bell-icon "seen it" behavior).
      setNotifications(list);
      onUnreadCountChange?.(0);

      const hadUnread = list.some((n) => !n.read);
      if (hadUnread) {
        // Persist the "seen" state in the background so a future reload
        // doesn't bring the badge count back.
        notificationApi.markAllRead().catch(() => {
          // Non-critical — worst case the badge reappears next time.
        });
      }
    } catch (err) {
      setErrMsg(err.message || 'Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === 'All') return notifications;
    return notifications.filter((n) => n.category === activeTab);
  }, [notifications, activeTab]);

  const handleMarkAllRead = async () => {
    try {
      await notificationApi.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      onUnreadCountChange?.(0);
    } catch (err) {
      setErrMsg(err.message || 'Failed to mark notifications as read.');
    }
  };

  const handleAccept = async (id) => {
    setActioningId(id);
    setActionErr('');
    try {
      await notificationApi.accept(id);
      await load();
    } catch (err) {
      setActionErr(err.message || 'Failed to accept this request.');
    } finally {
      setActioningId(null);
    }
  };

  const handleDecline = async (id) => {
    setActioningId(id);
    setActionErr('');
    try {
      await notificationApi.decline(id);
      await load();
    } catch (err) {
      setActionErr(err.message || 'Failed to decline this request.');
    } finally {
      setActioningId(null);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 style={{ fontFamily: fonts.display, fontSize: '1.75rem', fontWeight: 700, color: colors.charcoal, marginBottom: '0.25rem' }}>
          Notification
        </h1>
        <p className="mb-0" style={{ color: colors.muted }}>
          Real-time updates about your donations, expiry alerts, and account activity.
        </p>
      </div>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div className="d-flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className="btn btn-sm"
              onClick={() => setActiveTab(tab)}
              style={
                activeTab === tab
                  ? { ...btnPrimaryStyle, background: colors.green, borderColor: colors.green }
                  : { ...btnOutlineStyle, borderColor: colors.border, color: colors.charcoal }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-sm"
          style={{ ...btnPrimaryStyle, background: colors.green, borderColor: colors.green }}
          onClick={handleMarkAllRead}
        >
          Mark all as read
        </button>
      </div>

      {errMsg && <div className="alert alert-danger py-2 small">{errMsg}</div>}
      {actionErr && <div className="alert alert-danger py-2 small">{actionErr}</div>}

      <div className="d-flex flex-column gap-2">
        {loading ? (
          <div className="text-center py-5" style={{ color: colors.muted }}>Loading notifications…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5" style={{ color: colors.muted }}>
            No notifications here yet.
          </div>
        ) : (
          filtered.map((n) => {
            const isActionable = n.claimRequestId && !n.resolved;
            return (
              <div
                key={n.id}
                className="d-flex align-items-start justify-content-between gap-3 rounded-3 p-3"
                style={{
                  background: n.read ? '#fbfaf4' : '#f7f2c8',
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div className="fw-bold" style={{ color: colors.charcoal }}>{n.title}</div>
                  <div className="small" style={{ color: colors.muted }}>{n.message}</div>

                  {isActionable && (
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={{ ...btnPrimaryStyle, background: colors.authGreen, borderColor: colors.authGreen }}
                        disabled={actioningId === n.id}
                        onClick={() => handleAccept(n.id)}
                      >
                        {actioningId === n.id ? 'Working…' : 'Accept'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={btnOutlineStyle}
                        disabled={actioningId === n.id}
                        onClick={() => handleDecline(n.id)}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>

                <span
                  className="flex-shrink-0 rounded-pill px-3 py-1 small fw-semibold"
                  style={{ background: '#dcead2', color: colors.charcoal, whiteSpace: 'nowrap' }}
                >
                  {timeAgo(n.createdAt)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}