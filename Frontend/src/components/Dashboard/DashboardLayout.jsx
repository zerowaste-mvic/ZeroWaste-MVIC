import { Menu, Bell, User } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import { colors } from '../../theme';
import { getStoredUser } from '../../utils/auth';

export default function DashboardLayout({ activePage, onPageChange, onNavigate, unreadCount = 0, children }) {
  const user = getStoredUser();

  return (
    <div className="d-flex min-vh-100" style={{ background: colors.cream }}>
      <DashboardSidebar
        activePage={activePage}
        onNavigate={onPageChange}
        onAppNavigate={onNavigate}
      />

      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <header
          className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom"
          style={{ background: colors.dashboardAccent, borderColor: 'rgba(255,255,255,0.15) !important' }}
        >
          <button
            type="button"
            className="btn btn-link p-0"
            style={{ color: '#fff' }}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-link p-0 position-relative"
              style={{ color: 'rgba(255,255,255,0.85)' }}
              onClick={() => onPageChange?.('notifications')}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span
                  className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    top: -6,
                    right: -8,
                    minWidth: 18,
                    height: 18,
                    padding: '0 4px',
                    background: '#e14b4b',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    lineHeight: 1,
                    border: '1.5px solid ' + colors.dashboardAccent,
                  }}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            <div className="d-flex align-items-center gap-2">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.2)', color: '#fff' }}
              >
                <User size={18} />
              </span>
              <span className="fw-semibold text-white">
                {user?.fullName || 'Username'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-grow-1 p-4 p-lg-5 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}