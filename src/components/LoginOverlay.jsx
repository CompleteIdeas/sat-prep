import { useState } from 'react';

export default function LoginOverlay({ auth, onLogin, onGuest }) {
  const [view, setView] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!username || !password) { setError('Please enter username and password.'); return; }
    setLoading(true);
    try {
      await auth.login(username, password);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!username || username.length < 2) { setError('Username must be at least 2 characters.'); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) { setError('Only letters, numbers, and underscores.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      await auth.register(username, password);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-logo">SAT<span>·</span>Prep</div>
        <div className="login-sub">Sign in to compete on the leaderboard</div>

        {view === 'login' ? (
          <form onSubmit={handleLogin}>
            <label className="login-label">Username</label>
            <input className="login-input" value={username} onChange={e => { setUsername(e.target.value); setError(''); }}
              placeholder="e.g. alex_sat" maxLength={20} autoComplete="username" />
            <label className="login-label">Password</label>
            <input className="login-input" type="password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="••••••••" autoComplete="current-password" />
            <div className="login-error">{error}</div>
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
            <div className="login-divider">or</div>
            <button className="login-btn secondary" type="button" onClick={() => { setView('register'); setError(''); }}>Create Account</button>
            <button className="login-btn secondary" type="button" onClick={onGuest} style={{ marginTop: 4 }}>Continue as Guest</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <label className="login-label">Choose a Username</label>
            <input className="login-input" value={username} onChange={e => { setUsername(e.target.value); setError(''); }}
              placeholder="e.g. alex_sat" maxLength={20} autoComplete="username" />
            <label className="login-label">Password</label>
            <input className="login-input" type="password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Min. 6 characters" autoComplete="new-password" />
            <label className="login-label">Confirm Password</label>
            <input className="login-input" type="password" value={confirm} onChange={e => { setConfirm(e.target.value); setError(''); }}
              placeholder="Repeat password" autoComplete="new-password" />
            <div className="login-error">{error}</div>
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'Creating…' : 'Create Account'}
            </button>
            <div className="login-divider">or</div>
            <button className="login-btn secondary" type="button" onClick={() => { setView('login'); setError(''); }}>Back to Sign In</button>
          </form>
        )}
      </div>
    </div>
  );
}
