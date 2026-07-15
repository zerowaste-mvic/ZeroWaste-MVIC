import { useState } from "react";
import { Menu, X, Bell, User } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import { colors } from "../../theme";
import { getStoredUser } from "../../utils/auth";

export default function DashboardLayout({
  activePage,
  onPageChange,
  onNavigate,
  unreadCount = 0,
  children,
}) {
  const user = getStoredUser();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="d-flex min-vh-100 position-sticky" draggable="false">
      <DashboardSidebar
        activePage={activePage}
        onNavigate={onPageChange}
        onAppNavigate={onNavigate}
        collapsed={collapsed}
      />

      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <header
          className="d-flex align-items-center justify-content-between px-4 py-3"
          style={{
            borderBottom: `2px solid ${colors.greenL}`,
            background: colors.showcase_green,
          }}
        >
          <button
            type="button"
            className="btn btn-link p-0 d-flex align-items-center justify-content-center"
            style={{
              color: colors.greenD,
              width: 36,
              height: 36,
              borderRadius: 6,
              transition: "background-color 0.15s ease",
            }}
            onClick={() => setCollapsed((prev) => !prev)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                colors.low_greenFade || "rgba(0,0,0,0.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
          >
            {collapsed ? <Menu size={22} /> : <X size={22} />}
          </button>

          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-link p-0 position-relative"
              style={{ color: colors.greenD }}
              onClick={() => onPageChange?.("notifications")}
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
                    padding: "0 4px",
                    background: "#e14b4b",
                    color: "#fff",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    border: "1.5px solid " + colors.dashboardAccent,
                  }}
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            <div className="d-flex align-items-center gap-2">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 36,
                  height: 36,
                  background: colors.green,
                  color: colors.white,
                }}
              >
                <User size={20} />
              </span>
              <span
                style={{
                  fontSize: "1.05rem",
                  color: colors.muted,
                  fontWeight: "bolder",
                  maxWidth: "auto",
                  lineHeight: 1.7,
                }}
              >
                {user?.fullName || "Username"}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-grow-1 p-4 p-lg-5 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
