# Product Intent — SAT Prep

## Product Summary
SAT Prep is a gamified SAT practice quiz app with a dark, neon-accented UI. Users answer SAT Math and English questions at increasing difficulty levels, building streaks and earning points with multipliers. Questions come from a 270-question database (70%), a built-in question bank (15%), and AI-generated questions via Claude API (15%). The app supports guest play and authenticated accounts, with a leaderboard for competitive streaking and an admin panel for account management.

The core loop is addictive by design: answer correctly to build streaks, climb difficulty levels, earn multiplied points — miss one and you drop back to your floor level.

## Top User Goals (JTBD)
1. **Practice SAT questions** at my current skill level and improve over time
2. **Track my progress** (accuracy, points, best streak) across sessions
3. **Compete with others** on the leaderboard via streak records
4. **Focus on weak areas** by filtering Math vs English questions
5. **Set a challenge floor** so questions don't drop below my comfort zone

## Personas

### 1. SAT Student (Primary)
- **Goal:** Improve SAT score through repeated practice
- **Context:** Studying at home, on the bus, in study hall — phone in portrait mode
- **Device situation:** iPhone/Android, portrait, possibly one-handed
- **Success metric:** Sustained streak, improving accuracy over sessions
- **Mobile frictions:** Long passages hard to read on small screens, 2-column choices cramped, lots of vertical scrolling to reach "Next" button

### 2. Parent/Tutor
- **Goal:** Monitor student progress, manage accounts
- **Context:** Checking in on a desktop or tablet
- **Success metric:** Can see student's stats, reset accounts if needed
- **Mobile frictions:** Admin panel inline styles make mobile layout unpredictable

### 3. Competitive Learner
- **Goal:** Top the leaderboard, flex longest streak
- **Context:** Quick sessions between activities, wants fast question delivery
- **Success metric:** #1 on leaderboard
- **Mobile frictions:** Queue status is visible but not actionable; leaderboard loads separately from practice

## Roles Matrix
| Role | Practice | Stats | Leaderboard | Admin |
|------|----------|-------|-------------|-------|
| Guest | Yes | Session only | View only | No |
| Authenticated | Yes | All-time + session | Submit + view | No |
| Admin | Yes | All-time + session | Submit + view | Full |

## Evidence
- Auth/roles: `src/hooks/useAuth.js`, `user.is_admin` check in `App.jsx:110`
- Game logic: `src/hooks/useGame.js` (streak, difficulty, points, multipliers)
- Question sourcing: `useGame.js:78-105` (70/15/15 split DB/bank/AI)
- Routes: Single-page app with tab nav (`App.jsx:106-113`)
- DB schema: `server/db/schema.sql`
