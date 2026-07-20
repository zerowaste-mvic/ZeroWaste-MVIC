const STORAGE_KEY = "zerowaste_activity_log";
const MAX_ENTRIES = 20;

function readLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLog(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently
  }
}

/**
 * Record an activity entry. Call this right after a successful
 * add / use / donate / delete action.
 *
 * @param {string} title - e.g. "Added Milk", "Donated Orange"
 */
export function logActivity(title) {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    timestamp: new Date().toISOString(),
  };
  const entries = [entry, ...readLog()].slice(0, MAX_ENTRIES);
  writeLog(entries);
  window.dispatchEvent(
    new CustomEvent("zerowaste:activity-logged", { detail: entry }),
  );
  return entry;
}

/**
 * Subscribe to new activity as it's logged (e.g. from the Dashboard, so it
 * updates immediately instead of waiting for the next full data reload).
 * Returns an unsubscribe function.
 */
export function onActivityLogged(callback) {
  const handler = (e) => callback(e.detail);
  window.addEventListener("zerowaste:activity-logged", handler);
  return () => window.removeEventListener("zerowaste:activity-logged", handler);
}

/**
 * Get the most recent activity entries, newest first, with a
 * display-ready `time` string (e.g. "Today, 04:45 PM").
 */
export function getRecentActivity(limit = 4) {
  return readLog()
    .slice(0, limit)
    .map((entry) => ({ ...entry, time: formatActivityTime(entry.timestamp) }));
}

export function formatActivityTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isSameDay = (a, b) => a.toDateString() === b.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) return `Today, ${time}`;
  if (isSameDay(date, yesterday)) return `Yesterday, ${time}`;
  return `${date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}, ${time}`;
}
