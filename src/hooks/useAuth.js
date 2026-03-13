import { useState, useEffect, useCallback } from 'react';
import { api, saveToken, clearToken } from '../lib/api.js';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to restore session from saved token
  useEffect(() => {
    const token = localStorage.getItem('sat_token');
    if (!token) { setLoading(false); return; }
    api.me()
      .then(data => setUser(data.user))
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (username, password) => {
    const data = await api.login(username, password);
    saveToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (username, password) => {
    const data = await api.register(username, password);
    saveToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const playAsGuest = useCallback(() => {
    clearToken();
    setUser(null);
    setLoading(false);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const data = await api.me();
      setUser(data.user);
    } catch { /* ignore */ }
  }, []);

  return { user, loading, login, register, logout, playAsGuest, refreshUser, setUser };
}
