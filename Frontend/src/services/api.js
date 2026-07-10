import { getStoredToken } from '../utils/auth';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

function buildHeaders(extra = {}) {
  const token = getStoredToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

async function parseError(response) {
  try {
    const data = await response.json();
    return data.message || data.error || `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: buildHeaders(options.headers),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  if (response.status === 204) return null;

  // Some endpoints (claim, accept, decline, mark-all-read, etc.) return 200
  // with an empty body rather than 204 — read as text first so we don't
  // crash trying to JSON-parse nothing.
  const text = await response.text();
  if (!text) return null;
  return JSON.parse(text);
}
export const foodApi = {
  getAll() {
    return request('/api/food-items', { method: 'GET' });
  },

  create(item) {
    return request('/api/food-items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  update(id, item) {
    return request(`/api/food-items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  },

  browse() {
    return request('/api/food-items/browse', { method: 'GET' });
  },

  donate(id, details) {
    return request(`/api/food-items/${id}/donate`, {
      method: 'POST',
      body: details ? JSON.stringify(details) : undefined,
    });
  },

  claim(id) {
    return request(`/api/food-items/${id}/claim`, { method: 'POST' });
  },

  markUsed(id) {
    return request(`/api/food-items/${id}/use`, { method: 'POST' });
  },

  delete(id) {
    return request(`/api/food-items/${id}`, { method: 'DELETE' });
  },
};

export const userApi = {
  getProfile() {
    return request('/api/users/me', { method: 'GET' });
  },

  updateProfile(data) {
    return request('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  updatePrivacy(donationPublic) {
    return request('/api/users/me/privacy', {
      method: 'PUT',
      body: JSON.stringify({ donationPublic }),
    });
  },

  updateTwoFactor(enabled) {
    return request('/api/users/me/two-factor', {
      method: 'PUT',
      body: JSON.stringify({ enabled }),
    });
  },

  updateExpiryAlerts(enabled) {
    return request('/api/users/me/expiry-alerts', {
      method: 'PUT',
      body: JSON.stringify({ enabled }),
    });
  },
};

export const notificationApi = {
  getAll() {
    return request('/api/notifications', { method: 'GET' });
  },

  getUnreadCount() {
    return request('/api/notifications/unread-count', { method: 'GET' });
  },

  markAllRead() {
    return request('/api/notifications/read-all', { method: 'PUT' });
  },

  markRead(id) {
    return request(`/api/notifications/${id}/read`, { method: 'PUT' });
  },

  accept(id) {
    return request(`/api/notifications/${id}/accept`, { method: 'POST' });
  },

  decline(id) {
    return request(`/api/notifications/${id}/decline`, { method: 'POST' });
  },
};
export const analyticsApi = {
  getSummary(period) {
    return request(`/api/analytics/summary?period=${encodeURIComponent(period)}`, { method: 'GET' });
  },

  getInventoryOverview() {
    return request('/api/analytics/inventory-overview', { method: 'GET' });
  },

  getFoodSavedBreakdown(period) {
    return request(`/api/analytics/food-saved-breakdown?period=${encodeURIComponent(period)}`, { method: 'GET' });
  },
};