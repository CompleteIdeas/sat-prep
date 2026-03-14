# Routes & Screens Inventory

## Architecture
Single-page React app (Vite + React 18). No router — navigation is tab-based within `App.jsx` using `activeTab` state.

## Screens

| Screen | Purpose | Primary Actions | Entry Point | Auth Required | API Calls |
|--------|---------|-----------------|-------------|---------------|-----------|
| **Login Overlay** | Sign in / Register / Guest play | Login, Register, Continue as Guest | Auto-shown on load | No | `POST /auth/login`, `POST /auth/register` |
| **Practice Tab** | Answer SAT questions | Select answer, Next question, Change mode, Adjust floor | Default tab, tab nav | No | `GET /questions/random`, `POST /questions/generate`, `POST /stats/update`, `POST /leaderboard/submit` |
| **My Stats Tab** | View session + all-time stats | Review history | Tab nav | No (session data) | None (client state) |
| **Leaderboard Tab** | View streak rankings | View entries | Tab nav | No (view), Yes (submit) | `GET /leaderboard` |
| **Admin Tab** | Manage accounts | Reset stats, Delete user, Nuclear reset | Tab nav (admin only) | Admin | `GET /admin/users`, `POST /admin/reset-user`, `POST /admin/delete-user`, `POST /admin/reset-all` |

## Components (Practice Tab layout, top to bottom)
1. `SessionBar` — 4-stat grid (Questions, Accuracy, Points, Streak)
2. `ModeSelector` — 3-button row (Both, Math, English)
3. `StreakBar` — Current streak + motivational message + multiplier badge + best streak
4. `DifficultyBar` — Progress bar with level badge
5. `FloorControl` — +/- buttons to set minimum difficulty
6. `QuestionCard` — Passage (if English) + question text + 4 answer choices + feedback
7. Next Question button (visible after answering)

## Overlays
- `LoginOverlay` — Full-screen modal, dismissible via Escape or backdrop click
- `ComboFlash` — Centered text animation on streak milestones (3, 5, 10, 20)
- `VictoryFlash` — Full-screen radial gradient flash on correct answer
- `PointsPopup` — Centered floating "+pts" animation

## Code References
- Tab navigation: `App.jsx:106-113`
- Practice layout: `App.jsx:115-128`
- Login: `components/LoginOverlay.jsx`
- Question: `components/QuestionCard.jsx`
- Animations: `ComboFlash.jsx`, `VictoryFlash.jsx`, `PointsPopup.jsx`
