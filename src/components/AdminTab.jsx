import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api.js';

export default function AdminTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(() => {
    setLoading(true);
    api.getUsers()
      .then(data => setUsers(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  async function handleReset(userId, username) {
    if (!confirm(`Reset ALL stats for "${username}"? Their account stays but scores wipe.`)) return;
    await api.resetUser(userId);
    loadUsers();
  }

  async function handleDelete(userId, username) {
    if (!confirm(`Permanently DELETE account "${username}"? This cannot be undone.`)) return;
    await api.deleteUser(userId);
    loadUsers();
  }

  async function handleNuclear() {
    if (!confirm('NUCLEAR: wipe ALL accounts (except admin) and the leaderboard?')) return;
    if (!confirm('Final confirmation — this cannot be undone.')) return;
    await api.resetAll();
    loadUsers();
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 900, marginBottom: 6 }}>Admin Panel</div>
        <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Manage accounts and leaderboard data.</div>
      </div>

      {/* Nuclear Option */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--red)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: 'var(--red)', marginBottom: 8 }}>⚠️ Nuclear Option</div>
        <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 16 }}>Wipe ALL accounts and the global leaderboard. Cannot be undone.</div>
        <button onClick={handleNuclear} style={{
          background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 10,
          padding: '12px 24px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer'
        }}>
          Reset Everything
        </button>
      </div>

      {/* Account Manager */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>🗂 Account Manager</div>
        <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 16 }}>Reset stats for a specific account or delete it entirely.</div>

        {loading ? (
          <div style={{ color: 'var(--muted)', textAlign: 'center', padding: 20 }}>Loading…</div>
        ) : users.length === 0 ? (
          <div style={{ color: 'var(--muted)', textAlign: 'center', padding: 20 }}>No accounts yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 400, overflowY: 'auto' }}>
            {users.map(u => (
              <div key={u.id} className="admin-account-row">
                <div className="aa-avatar">{u.username[0].toUpperCase()}</div>
                <div className="aa-info">
                  <div className="aa-name">{u.username}</div>
                  <div className="aa-stats">
                    Best streak: {u.best_streak} · Answered: {u.total_answered} · Points: {u.total_points.toLocaleString()}
                  </div>
                </div>
                <button className="admin-btn reset-stats" onClick={() => handleReset(u.id, u.username)}>Reset Stats</button>
                <button className="admin-btn delete-acct" onClick={() => handleDelete(u.id, u.username)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
