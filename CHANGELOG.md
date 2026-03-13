# Changelog

All notable changes to SAT Prep are documented here, in reverse chronological order.

---

## [Latest]

### Added
- **Floor difficulty control** — set a minimum difficulty level using 🔒 Floor `−`/`+` buttons. Wrong answers never drop you below the floor. Raising the floor above your current level immediately jumps you up and flushes the question queue.

---

## [Previous]

### Fixed
- **App not loading / buttons not working** — three root causes resolved:
  1. All top-level DOM calls (`generateQuestion`, `updateUI`, `fillQueue`) moved inside `DOMContentLoaded` so they fire after HTML exists
  2. Escaped backticks `` \` `` in admin template literals (Python string escaping artifact) replaced with real backticks
  3. Apostrophe inside single-quoted string (`'You're on a roll!'`) fixed to use double quotes

---

## [Previous]

### Changed
- Admin username changed from `PSATPREPADMIN` to `SATPREPADMIN`

---

## [Previous]

### Added
- **Admin panel** (⚙️ Admin tab, visible only to admin account)
  - Per-account stat reset (keeps account, wipes scores + leaderboard entry)
  - Per-account delete (removes account and leaderboard entry)
  - Nuclear Option: wipe all accounts + leaderboard; admin account preserved
- Admin account auto-seeded on every page load; cannot be registered; excluded from leaderboard
- Reset all accounts button **removed** from public login screen

---

## [Previous]

### Added
- **Three-tab layout**: 🎯 Practice / 📊 My Stats / 🏆 Leaderboard
- **Session stats bar** on Practice tab (Questions / Accuracy / Points / Streak)
- **My Stats tab** with 6 all-time stat cards + scrollable session question history
  - Each history entry shows: correct/wrong icon, question preview, difficulty tier, points earned, correct answer for misses
  - All-time stats persisted per user account in localStorage
- **Bigger, more energetic UI**: wider container (1080px), larger fonts, glowing text shadows, pulsing streak bar, bolder buttons, gold gradient Next button

### Changed
- Difficulty-calibrated AI prompts with explicit level descriptions per tier
- Question card padding increased; choice buttons taller and larger font

---

## [Previous]

### Added
- **Difficulty-linked multipliers** (slow build-up, 10 tiers):
  - Lv1 ×1.00 → Lv2 ×1.25 → Lv3 ×1.50 → Lv4 ×1.75 → Lv5 ×2.00
  - Lv6 ×2.50 → Lv7 ×3.00 → Lv8 ×3.50 → Lv9 ×4.00 → Lv10 ×5.00
- **Question queue flushes** on wrong answer, level-up, mode change, and logout (queue always matches current difficulty)
- **Difficulty resets to 1** (now: to floor) on wrong answer
- Points popup and victory flash color now derived from difficulty tier

---

## [Previous]

### Added
- **Login system**: Sign In / Create Account / Continue as Guest
- **User accounts** stored in localStorage with djb2-hashed passwords
- **Shared competitive leaderboard** via `window.storage` (cross-user, top 10 by streak)
- **Points system**: base 10 × difficulty × multiplier
- **Victory flash**: full-screen radial glow on correct answer
- **Points popup**: floating `+N ×M!` animation
- **Redesigned difficulty bar**: 5 color tiers, ghost flash on level-up, fills over 3 correct answers

---

## [Previous]

### Added
- **Question pre-load queue** (target: 5 questions)
  - Fast path: pop instantly from queue
  - Slow path: live fetch with spinner
  - Queue pill in header with color coding
  - Queue clears on mode switch
- **Built-in question bank** of 37 hand-crafted SAT questions (Math + English, difficulties 1–10)
  - Used ~50% of the time; AI used the other 50% for fresh variety
- **Two-pass AI question generation**: generate → verify/correct

---

## [Initial]

### Added
- Dark-themed single-file SAT practice tool
- Math / English / Both mode toggle
- AI-generated questions via Claude API
- Answer streak tracking with personal best
- Combo flash animations at streak milestones (🔥3, ⚡5, 🏆10, 👑20)
- Local leaderboard
