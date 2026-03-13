# SAT Prep — Practice Mode

A fully self-contained, browser-based SAT practice tool with AI-generated questions, gamified difficulty progression, leaderboards, and an admin panel.

## Quick Start

Open `sat-prep.html` in any modern browser (Chrome, Firefox, Safari, Edge). No installation or internet server needed — just double-click the file.

> **Requires an internet connection** — the app calls the Anthropic Claude API to generate and verify questions in real time.

---

## Features

### Practice Mode
- **AI-generated SAT questions** across Math and English/Reading/Writing
- **Built-in question bank** of 37 hand-crafted questions (used ~50% of the time for instant delivery)
- **Question queue** — 5 questions are pre-loaded in the background so you almost never wait
- **Mode selector** — Math only, English only, or Both
- **Difficulty-calibrated questions** — the AI is explicitly prompted to match the current level:

| Level | Label | Description |
|-------|-------|-------------|
| 1–2 | Beginner | Simple arithmetic, basic vocab — a 6th grader can solve it |
| 3–4 | Easy | Pre-algebra, common grammar, direct inference |
| 5–6 | Medium | Algebra I/II, evidence-based reading — typical SAT |
| 7–8 | Hard | Advanced algebra, multi-step reasoning, complex analysis |
| 9–10 | Expert | Trig, non-linear systems, dense philosophical passages |

---

### Difficulty & Progression
- **Auto-progression** — answer 3 correct in a row to level up; wrong answers drop your level
- **Floor difficulty** — set a minimum level so a wrong answer never drops you below your chosen floor
  - Use the 🔒 Floor `−` / `+` buttons below the difficulty bar
  - Raising the floor above your current level jumps you up immediately
  - Floor resets to 1 on logout
- **Difficulty-based multipliers** — points multiplier scales with level:

| Level | Multiplier | Points per correct |
|-------|------------|-------------------|
| 1 | ×1.00 | 10 |
| 2 | ×1.25 | 25 |
| 3 | ×1.50 | 45 |
| 4 | ×1.75 | 70 |
| 5 | ×2.00 | 100 |
| 6 | ×2.50 | 150 |
| 7 | ×3.00 | 210 |
| 8 | ×3.50 | 280 |
| 9 | ×4.00 | 360 |
| 10 | ×5.00 | 500 |

---

### Gamification
- **Streak counter** — tracks consecutive correct answers
- **Points system** — base 10 × difficulty × multiplier, rounded to nearest integer
- **Victory flash** — full-screen radial glow on correct answer (color matches difficulty tier)
- **Points popup** — floating `+N ×M!` animation
- **Combo flash** — milestone banners at 3, 5, 10, and 20 streaks (🔥 ⚡ 🏆 👑)
- **Streak bar pulse** — the streak banner glows and pulses when on fire (streak ≥ 3)

---

### Tabs

#### 🎯 Practice
Main gameplay screen with:
- Session stats bar (Questions / Accuracy / Points / Streak)
- Mode selector
- Streak banner with multiplier badge
- Difficulty progress bar + floor control
- Question card with A/B/C/D choices
- Feedback with explanation after each answer

#### 📊 My Stats
- 6 all-time stat cards: Total Answered, Total Correct, All-Time Accuracy, All-Time Points, Best Streak, Session Questions
- Scrollable **question history** for the current session — shows correct/wrong, difficulty tier, points earned, and correct answer for misses
- Stats are persisted per user account in localStorage

#### 🏆 Leaderboard
- Top 10 players by best streak (shared across all users via `window.storage`)
- Current user's row highlighted in purple with a "YOU" tag
- Guests are not included

#### ⚙️ Admin *(admin account only)*
- Lists all non-admin accounts with stats
- **Reset Stats** — wipes a user's scores and removes them from the leaderboard (account kept)
- **Delete** — permanently removes an account and leaderboard entry
- **Nuclear Option** — wipes all accounts and the global leaderboard; admin account is preserved

---

### Accounts & Auth

- **Sign In / Create Account / Continue as Guest** on launch
- Passwords hashed with djb2 (fun leaderboard — not a bank)
- Username rules: 2–20 chars, alphanumeric + underscore only
- Password: min 6 characters
- All account data stored in `localStorage` (`sat_users` key)
- Global leaderboard stored in `window.storage` (shared, cross-session)

#### Admin Account
| Field | Value |
|-------|-------|
| Username | `SATPREPADMIN` |
| Password | `PSATclaudeiscool12345` |

The admin account is automatically seeded into localStorage on every page load. It cannot be registered, does not appear on the leaderboard, and is preserved when the Nuclear Option is used.

---

## Technical Details

### Architecture
- **Single HTML file** — all HTML, CSS, and JavaScript in one self-contained file (~2000 lines)
- **No build step, no dependencies, no server** — just open in a browser
- **Anthropic Claude API** — called directly from the browser via `fetch` to `https://api.anthropic.com/v1/messages`
  - Model: `claude-sonnet-4-5`
  - Two-pass question generation: generate → verify/correct
  - API key is injected by the claude.ai environment (no key needed when running from claude.ai)

> ⚠️ **If running outside claude.ai**, you will need to add your own API key to the `claudeCall()` function headers.

### Storage Keys
| Key | Scope | Contents |
|-----|-------|----------|
| `localStorage.sat_users` | Per-browser | Account credentials and all-time stats |
| `window.storage 'sat_leaderboard'` (shared) | Cross-user | Global top-10 leaderboard |

### State Shape
```js
state = {
  streak, bestStreak,
  totalCorrect, totalAnswered,
  difficulty,      // 1–10
  diffProgress,    // 0–2, fills bar; resets on level-up
  diffFloor,       // minimum difficulty after wrong answer
  points,
  mode,            // 'both' | 'math' | 'english'
  questionNum, answered,
  topStreaks,      // global leaderboard array
  currentQ,
  recentBankIds,   // last 10 bank question indices (dedup)
  currentUser,     // username string or null
  sessionHistory,  // [{question, correct, pts, diff, type, correctAnswer}]
  allTime,         // {answered, correct, points, bestStreak} — persisted
}
```

### Key Functions
| Function | Description |
|----------|-------------|
| `generateQuestion()` | Pops from queue (fast) or fetches live (slow path) |
| `fetchOneQuestion()` | 50% bank / 50% AI; runs generate + verify passes |
| `fillQueue()` | Background loop that keeps queue at 5 |
| `answer(chosen, btn)` | Handles scoring, streak, difficulty, history |
| `adjustFloor(delta)` | Raises/lowers the floor difficulty |
| `updateUI()` | Syncs all display elements to state |
| `switchTab(name, btn)` | Tab navigation |
| `populateAdminPanel()` | Renders admin account list |
| `adminResetUser(u)` | Wipes stats for one user |
| `adminDeleteUser(u)` | Deletes one account entirely |
| `adminResetAll()` | Nuclear wipe of all accounts |

---

## Known Limitations
- localStorage is browser/device-specific — accounts don't transfer between devices
- The `window.storage` leaderboard is shared only within the same claude.ai session context
- API calls require an internet connection; offline mode falls back to the built-in question bank only
- No HTTPS/auth on the API key — suitable for classroom/personal use, not production deployment
