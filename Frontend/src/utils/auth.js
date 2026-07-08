export function getStoredUser() {
  const raw = localStorage.getItem('zw_user') || sessionStorage.getItem('zw_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Updates whichever storage (local/session) currently holds the user,
// so the header and other components pick up profile changes right away.
export function setStoredUser(user) {
  const json = JSON.stringify(user);
  if (localStorage.getItem('zw_user')) {
    localStorage.setItem('zw_user', json);
  } else if (sessionStorage.getItem('zw_user')) {
    sessionStorage.setItem('zw_user', json);
  } else {
    sessionStorage.setItem('zw_user', json);
  }
}

export function getStoredToken() {
  return localStorage.getItem('zw_token') || sessionStorage.getItem('zw_token');
}

export function clearAuth() {
  localStorage.removeItem('zw_token');
  localStorage.removeItem('zw_user');
  sessionStorage.removeItem('zw_token');
  sessionStorage.removeItem('zw_user');
}

export function isLoggedIn() {
  return Boolean(getStoredToken() && getStoredUser());
}