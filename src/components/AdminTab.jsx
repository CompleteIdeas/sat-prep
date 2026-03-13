import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api.js';

export default function AdminTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionPending, setActionPending] = useState(null); // userId or 'nuclear'

  const loadUsers = useCallback(() => {
    setLoading(true);
    setError('');
    api.getUsers()
      .then(data => setUsers(data))
      .catch(() => setError('Failed to load accounts. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  async function handleReset(userId, username) {
    if (!window.confirm(`Reset ALL stats for "${username}"? Their account stays but scores wipe.`)) return;
    setActionPending(userId);
    setError('');
    try {
      await api.resetUser(userId);
      loadUsers();
    } catch {
      setError(`Failed to reset stats for "${username}".`);
    } finally {
      setActionPending(null);
    }
  }

  async function handleDelete(userId, username) {
    if (!window.confirm(`Permanently DELETE account "${username}"? This cannot be undone.`)) return;
    setActionPending(userId);
    setError('');
    try {
      await api.deleteUser(userId);
      loadUsers();
    } catch {
      setError(`Failed to delete "${username}".`);
    } finally {
      setActionPending(null);
    }
  }

  async function handleNuclear() {
    if (!window.confirm('NUCLEAR: wipe ALL accounts (except admin) and the leaderboard?')) return;
    if (!window.confirm('Final confirmation — this cannot be undone.')) return;
    setActionPending('nuclear');
    setError('');
    try {
      await api.resetAll();
      loadUsers();
    } catch {
      setError('Failed to reset everything.');
    } finally {
      setActionPending(null);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 900, marginBottom: 6 }}>Admin Panel</div>
        <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Manage accounts and leaderboard data.</div>
      </div>

      {error && (
        <div role="alert" style={{ background: 'rgba(255,94,125,0.1)', border: '1px solid var(--red)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: 'var(--red)', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      {/* Nuclear Option */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--red)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: 'var(--red)', marginBottom: 8 }}>Nuclear Option</div>
        <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 16 }}>Wipe ALL accounts and the global leaderboard. Cannot be undone.</div>
        <button onClick={handleNuclear} disabled={actionPending === 'nuclear'} style={{
          background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 10,
          padding: '12px 24px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          opacity: actionPending === 'nuclear' ? 0.6 : 1,
        }}>
          {actionPending === 'nuclear' ? 'Resetting…' : 'Reset Everything'}
        </button>
      </div>

      {/* Account Manager */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Account Manager</div>
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
                <button className="admin-btn reset-stats" onClick={() => handleReset(u.id, u.username)} disabled={actionPending === u.id}>
                  {actionPending === u.id ? '…' : 'Reset Stats'}
                </button>
                <button className="admin-btn delete-acct" onClick={() => handleDelete(u.id, u.username)} disabled={actionPending === u.id}>
                  {actionPending === u.id ? '…' : 'Delete'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
