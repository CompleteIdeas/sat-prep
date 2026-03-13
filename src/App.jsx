import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './hooks/useAuth.js';
import { useGame } from './hooks/useGame.js';
import LoginOverlay from './components/LoginOverlay.jsx';
import SessionBar from './components/SessionBar.jsx';
import ModeSelector from './components/ModeSelector.jsx';
import StreakBar from './components/StreakBar.jsx';
import DifficultyBar from './components/DifficultyBar.jsx';
import FloorControl from './components/FloorControl.jsx';
import QuestionCard from './components/QuestionCard.jsx';
import StatsTab from './components/StatsTab.jsx';
import LeaderboardTab from './components/LeaderboardTab.jsx';
import AdminTab from './components/AdminTab.jsx';
import ComboFlash from './components/ComboFlash.jsx';
import VictoryFlash from './components/VictoryFlash.jsx';
import PointsPopup from './components/PointsPopup.jsx';
import { getDiffTier, getMultiplier } from './lib/constants.js';

export default function App() {
  const auth = useAuth();
  const { user, loading: authLoading } = auth;
  const game = useGame(user);
  const { state, queueCount, loadNextQuestion, answer, setMode, adjustFloor, fillQueue } = game;

  const [activeTab, setActiveTab] = useState('practice');
  const [showLogin, setShowLogin] = useState(true);
  const [combo, setCombo] = useState(null);
  const [victory, setVictory] = useState(null);
  const [pointsAnim, setPointsAnim] = useState(null);
  const initialLoad = useRef(true);

  // Hide login after auth
  useEffect(() => {
    if (!authLoading && (user || !showLogin)) {
      // Load first question
      if (initialLoad.current) {
        initialLoad.current = false;
        loadNextQuestion(state.mode, state.difficulty);
        fillQueue(state.mode, state.difficulty);
      }
    }
  }, [authLoading, user, showLogin]);

  // Trigger effects on answer
  useEffect(() => {
    if (!state._lastAnswer) return;
    const { isRight, earned } = state._lastAnswer;
    if (isRight) {
      const mult = getMultiplier(state.difficulty);
      const tier = getDiffTier(state.difficulty);
      setVictory({ color: tier.color, mult });
      setPointsAnim({ pts: earned, mult, color: tier.color });
      // Combo milestones
      if (state.streak === 3) setCombo('🔥 3 Streak!');
      else if (state.streak === 5) setCombo('⚡ 5 Streak!');
      else if (state.streak === 10) setCombo('🏆 10 Streak!');
      else if (state.streak === 20) setCombo('👑 20 Streak!');
    }
  }, [state.totalAnswered]);

  const handleLogin = useCallback(() => setShowLogin(false), []);
  const handleGuestPlay = useCallback(() => {
    auth.playAsGuest();
    setShowLogin(false);
  }, [auth]);

  const handleNext = useCallback(() => {
    loadNextQuestion(state.mode, state.difficulty);
  }, [loadNextQuestion, state.mode, state.difficulty]);

  if (authLoading) return null;

  return (
    <>
      <ComboFlash text={combo} onDone={() => setCombo(null)} />
      <VictoryFlash config={victory} onDone={() => setVictory(null)} />
      <PointsPopup config={pointsAnim} onDone={() => setPointsAnim(null)} />

      {/* Queue fill bar */}
      <div className="queue-fill-bar">
        <div className="queue-fill-bar-inner" style={{ width: `${(queueCount / 5) * 100}%` }} />
      </div>

      {showLogin && !user && (
        <LoginOverlay auth={auth} onLogin={handleLogin} onGuest={handleGuestPlay} />
      )}

      <div className="container">
        <header>
          <div className="logo">SAT<span>·</span>Prep</div>
          {user && (
            <div className="user-badge" onClick={() => { if (confirm('Sign out?')) { auth.logout(); setShowLogin(true); initialLoad.current = true; } }} title="Click to sign out">
              <div className="user-avatar">{user.username[0].toUpperCase()}</div>
              <span>{user.username}</span>
            </div>
          )}
          <div className="header-stats">
            <div className="stat-pill" title="Pre-loaded questions ready"
                 style={{ borderColor: queueCount >= 5 ? 'rgba(74,222,128,0.4)' : queueCount > 0 ? 'rgba(232,197,71,0.3)' : undefined }}>
              ⚡ Queue <span className="val">{queueCount}</span>/5
            </div>
          </div>
        </header>

        {/* Tab nav */}
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'practice' ? 'active' : ''}`} onClick={() => setActiveTab('practice')}>🎯 Practice</button>
          <button className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>📊 My Stats</button>
          <button className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}>🏆 Leaderboard</button>
          {user?.is_admin && (
            <button className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}>⚙️ Admin</button>
          )}
        </div>

        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <div>
            <SessionBar state={state} />
            <ModeSelector mode={state.mode} onSetMode={(m) => { setMode(m); loadNextQuestion(m, state.difficulty); }} />
            <StreakBar state={state} />
            <DifficultyBar state={state} />
            <FloorControl state={state} onAdjust={adjustFloor} />
            <QuestionCard state={state} onAnswer={answer} />
            {state.answered && (
              <button className="next-btn show" onClick={handleNext}>Next Question →</button>
            )}
          </div>
        )}

        {activeTab === 'stats' && <StatsTab state={state} />}
        {activeTab === 'leaderboard' && <LeaderboardTab user={user} />}
        {activeTab === 'admin' && user?.is_admin && <AdminTab />}
      </div>
    </>
  );
}
