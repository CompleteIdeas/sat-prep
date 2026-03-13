const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('sat_token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  // Auth
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  register: (username, password) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify({ username, password }) }),
  me: () => request('/auth/me'),

  // Questions
  generateQuestion: (mode, difficulty) =>
    request('/questions/generate', { method: 'POST', body: JSON.stringify({ mode, difficulty }) }),

  // Stats
  updateStats: (correct, points, best_streak) =>
    request('/stats/update', { method: 'POST', body: JSON.stringify({ correct, points, best_streak }) }),

  // Leaderboard
  getLeaderboard: () => request('/leaderboard'),
  submitStreak: (streak, mode) =>
    request('/leaderboard/submit', { method: 'POST', body: JSON.stringify({ streak, mode }) }),

  // Admin
  getUsers: () => request('/admin/users'),
  resetUser: (userId) =>
    request('/admin/reset-user', { method: 'POST', body: JSON.stringify({ userId }) }),
  deleteUser: (userId) =>
    request('/admin/delete-user', { method: 'POST', body: JSON.stringify({ userId }) }),
  resetAll: () => request('/admin/reset-all', { method: 'POST' }),
};

export function saveToken(token) {
  localStorage.setItem('sat_token', token);
}

export function clearToken() {
  localStorage.removeItem('sat_token');
}
