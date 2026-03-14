# User Flows

## Flow 1: First-Time Play (Guest)

**Personas:** SAT Student, anyone trying the app
**Trigger:** Visit the app URL

### Happy Path
1. Login overlay appears automatically
2. User clicks "Continue as Guest"
3. Practice tab loads with first question (from queue)
4. User reads question, selects answer
5. Feedback appears (correct/wrong + explanation)
6. User scrolls down, clicks "Next Question"
7. Repeat

### Alternate Paths
- User clicks backdrop or presses Escape → same as Guest
- User registers first → gets persistent stats + leaderboard

### Failure Modes
- If queue is empty AND DB is down AND AI fails → loading spinner indefinitely with 3s retry loop
- No timeout or "try again" button visible to user

### Mobile Pain Points
- Login card animation (`slideIn`) works well on mobile
- After answering, user must scroll past explanation to reach "Next" button
- No keyboard dismissal UX on login form (virtual keyboard covers fields)

---

## Flow 2: Answer a Question

**Personas:** All
**Trigger:** Question card is displayed

### Happy Path
1. See question type badge (Math/English) and question number
2. Read passage (if English type)
3. Read question text
4. Tap one of 4 choices
5. Immediate feedback: choice highlights green/red, correct answer revealed
6. Explanation box appears below choices
7. Points popup animation plays (if correct)
8. Victory flash (if correct) or streak resets (if wrong)
9. "Next Question" button appears below explanation

### Mobile Pain Points
- Choices in 2-column grid above 600px — buttons can be very narrow with long answer text
- At 600px, switches to 1-column — much better for mobile
- But 600px breakpoint means iPad Mini (768px) still gets cramped 2-column
- Explanation can be long, pushing "Next" button way below fold
- No swipe gesture to advance to next question

---

## Flow 3: Build a Streak

**Personas:** Competitive Learner
**Trigger:** Get 3+ correct in a row

### Happy Path
1. Answer correctly → streak counter increments
2. At streak 3: ComboFlash "3 Streak!"
3. Multiplier increases with difficulty level
4. Difficulty auto-advances after 3 correct at current level
5. At streak 5, 10, 20: bigger combo flashes
6. If authenticated, streak submitted to leaderboard when broken

### Alternate Path
- Wrong answer → streak resets to 0, difficulty drops to floor
- Queue is flushed and rebuilt for new difficulty

### Mobile Pain Points
- ComboFlash and PointsPopup are fixed-center overlays — on small screens they can overlap the question card
- No haptic feedback on milestone streaks
- Streak bar at top of practice tab may be scrolled out of view

---

## Flow 4: Sign In / Register

**Personas:** Returning student, new student
**Trigger:** App loads or user wants to track progress

### Happy Path (Login)
1. Enter username + password
2. Tap "Sign In"
3. JWT saved to localStorage
4. Overlay dismisses, practice loads with restored stats

### Happy Path (Register)
1. Click "Create Account"
2. Enter username (2+ chars, alphanumeric), password (6+ chars), confirm
3. Tap "Create Account"
4. Auto-logged in

### Failure Modes
- Wrong credentials → error message below form
- Duplicate username → error message
- Network error → error message

### Mobile Pain Points
- Virtual keyboard pushes up the entire overlay, can cut off top of login card
- No `inputmode` optimization (e.g., `inputmode="text"` for username)

---

## Flow 5: Check Stats

**Personas:** SAT Student, Parent/Tutor
**Trigger:** Tap "My Stats" tab

### Happy Path
1. See 6 stat cards: Total Answered, Total Correct, Accuracy, Points, Best Streak, Session Questions
2. Scroll down to "Question History" — reverse-chronological list of this session's questions
3. Each history item shows: correct/wrong, question preview, difficulty, type, points earned

### Mobile Pain Points
- Stat cards grid (`auto-fit, minmax(200px, 1fr)`) → 2 columns on most phones, but last card sits alone
- History items have truncated question text (`text-overflow: ellipsis`) — useful but no way to expand
- No all-time history (only session) — confusing for returning users

## Code References
- Question loading: `useGame.js:126-153`
- Answer handling: `useGame.js:155-226`
- Streak milestones: `App.jsx:54-57`
- Login form: `LoginOverlay.jsx:26-53`
- Stats display: `StatsTab.jsx`
