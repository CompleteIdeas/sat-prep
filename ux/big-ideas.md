# Big Bold Ideas

## 1. Navigation & IA

### Idea 1: Fixed Bottom Tab Bar
- **Problem:** Tabs at top are unreachable by thumb on modern phones
- **Who benefits:** All mobile users
- **Before:** Horizontal tabs at top, scroll to reach
- **After:** iOS/Android-style bottom tab bar with 3-4 icons, always visible
- **Mobile mechanics:** Fixed bottom position, safe-area padding, haptic on tab switch, badge indicators
- **Desktop:** Keep horizontal tabs at top (bottom bar hidden on wide screens)
- **Complexity:** S — CSS media query + fixed positioning
- **Risks:** Must account for "Next Question" button competing for bottom space
- **Measure:** Time to switch tabs, tab discovery rate
- **Code:** `index.css:432-456`, `App.jsx:106-113`

### Idea 2: Swipe Between Tabs
- **Problem:** Requires precise tap on tab buttons
- **Who benefits:** One-handed mobile users
- **Before:** Tap tab to switch
- **After:** Swipe left/right to move between Practice/Stats/Leaderboard
- **Mobile mechanics:** Touch event handlers with horizontal swipe detection, animated transitions
- **Desktop:** Not applicable
- **Complexity:** M — touch handlers + transition animation
- **Risks:** Must not conflict with scrolling; needs dead zone for vertical scroll
- **Measure:** Tab switching frequency, gesture completion rate

---

## 2. Speed & "Feels Instant"

### Idea 3: Fixed "Next Question" Button
- **Problem:** Must scroll past explanation to find "Next" button
- **Who benefits:** All users, especially mobile
- **Before:** Button appears inline below explanation, often below fold
- **After:** Sticky button fixed at bottom of viewport, always one tap away
- **Mobile mechanics:** Fixed bottom position with safe-area inset, slide-up animation on answer
- **Desktop:** Can stay inline or use a keyboard shortcut (Enter/Space)
- **Complexity:** S — CSS only change
- **Risks:** May overlap with explanation text at bottom; add padding to content
- **Measure:** Time between answer and next question
- **Code:** `index.css:306-324`

### Idea 4: Keyboard Shortcut for Next (A/B/C/D + Enter)
- **Problem:** Mouse-only interaction on desktop
- **Who benefits:** Desktop power users, students with keyboards
- **Before:** Click answer, click Next
- **After:** Press A/B/C/D to select answer, Enter/Space for Next
- **Desktop mechanics:** `useEffect` keydown listener on Practice tab
- **Mobile:** N/A (but hardware keyboard on tablets would work)
- **Complexity:** S — event listener + state check
- **Risks:** Must not fire during login form input
- **Measure:** Questions per minute

### Idea 5: Skeleton Loading Instead of Spinner
- **Problem:** Blank card with spinner feels slow and uncertain
- **Who benefits:** All users
- **Before:** Spinning circle with "Generating your question..."
- **After:** Pulsing skeleton placeholders matching question card layout (type badge, text lines, 4 choice blocks)
- **Mobile mechanics:** CSS-only shimmer animation, no extra JS
- **Desktop:** Same
- **Complexity:** S — replace loading state JSX + add shimmer CSS
- **Risks:** None
- **Measure:** Perceived load time (user satisfaction)
- **Code:** `QuestionCard.jsx:12-20`

### Idea 6: Preload Next Question While Reading Explanation
- **Problem:** Queue already exists but next question loads after tapping "Next"
- **Who benefits:** All users wanting instant transitions
- **Before:** Tap Next → brief loading state while shifting queue
- **After:** Queue shift happens immediately on answer (not on Next tap), so next question is already in state
- **Complexity:** S — move queue shift to `answer()` callback, store in a `nextQ` ref
- **Risks:** If user changes mode after answering, preloaded question may be wrong type
- **Measure:** Zero-delay transitions between questions

---

## 3. Creation Flows & Smart Defaults

### Idea 7: Quick Mode Toggle on Question Card
- **Problem:** Mode selector is above the question card — easy to miss, takes vertical space
- **Who benefits:** Students wanting to switch between Math and English
- **Before:** Three buttons above the question card
- **After:** Tap the type badge (Math/English) on the question card itself to filter to that type — or show a small toggle at the top of the card
- **Mobile mechanics:** Tap existing UI element = less visual noise, more discoverable
- **Complexity:** S — click handler on `.q-type` badge
- **Risks:** Users might not discover it; keep mode selector too but make it collapsible
- **Measure:** Mode switch frequency

### Idea 8: Smart Floor Recommendation
- **Problem:** Users may not know what floor to set
- **Who benefits:** New students
- **Before:** Manual +/- to set floor
- **After:** After 10 questions, suggest a floor based on accuracy at each level ("You're getting 90% at Lv.3 — raise your floor?")
- **Mobile mechanics:** Toast-style suggestion card, dismiss with tap
- **Complexity:** M — accuracy tracking per difficulty + suggestion logic
- **Risks:** Annoying if too frequent; limit to once per session
- **Measure:** Floor adjustment adoption rate

---

## 4. Personalization by Role

### Idea 9: Streaks-Focused Compact Mode
- **Problem:** Too much UI chrome between question and answer choices
- **Who benefits:** Competitive learners going for speed
- **Before:** SessionBar + ModeSelector + StreakBar + DifficultyBar + FloorControl + QuestionCard
- **After:** Toggle "Focus Mode" that hides everything except streak counter + question + choices
- **Mobile mechanics:** One-tap toggle, remembers preference in localStorage
- **Desktop:** Same
- **Complexity:** S — conditional rendering based on state flag
- **Risks:** Users might lose context about difficulty/mode
- **Measure:** Questions per minute, session length

### Idea 10: Post-Session Summary
- **Problem:** Session stats disappear when you leave or refresh
- **Who benefits:** SAT Students, Parents
- **Before:** Stats tab shows session data that vanishes on refresh
- **After:** After 10+ questions, show a beautiful summary card: accuracy, streak peak, difficulty reached, weak areas (math vs english accuracy)
- **Mobile mechanics:** Full-screen card with share button (screenshot-friendly)
- **Desktop:** Same card, centered
- **Complexity:** M — summary calculation + new component + optional share
- **Risks:** When to show it? On tab switch? On idle? Make it accessible from Stats tab
- **Measure:** Screenshot/share rate, return sessions

---

## 5. Trust, Safety & Clarity

### Idea 11: Explanation Quality Indicator
- **Problem:** Some AI-generated explanations may be wrong or unclear
- **Who benefits:** All learners
- **Before:** Explanation shown as-is
- **After:** Small thumbs-up/thumbs-down on each explanation. If thumbs-down, flag for review
- **Mobile mechanics:** Two small icon buttons below explanation
- **Complexity:** M — new API endpoint + simple UI
- **Risks:** Need a review queue for flagged questions
- **Measure:** Flag rate, user trust (repeat sessions)

### Idea 12: Visual Difficulty Onboarding
- **Problem:** New users don't understand the difficulty/floor/multiplier system
- **Who benefits:** First-time users
- **Before:** Thrown into the game with no explanation of mechanics
- **After:** First-time tooltip overlay explaining: "Answer 3 right to level up. Miss one and you drop to your floor."
- **Mobile mechanics:** Step-through tooltip pointing at each element, tap to advance
- **Complexity:** S — conditional render on first visit (localStorage flag)
- **Risks:** Annoying on repeat visits; must be dismissible and one-time only
- **Measure:** Completion rate, first-session retention

---

## Priority Matrix

| Idea | Impact | Effort | Priority |
|------|--------|--------|----------|
| 3. Fixed Next Button | HIGH | S | DO NOW |
| 1. Bottom Tab Bar | HIGH | S | DO NOW |
| 2. Container/Card Padding Fix | HIGH | S | DO NOW |
| 5. Skeleton Loading | MEDIUM | S | DO NOW |
| 4. Keyboard Shortcuts | MEDIUM | S | DO NEXT |
| 9. Focus Mode | MEDIUM | S | DO NEXT |
| 6. Preload on Answer | MEDIUM | S | DO NEXT |
| 7. Quick Mode Toggle | LOW | S | LATER |
| 12. Onboarding Tooltips | MEDIUM | S | LATER |
| 10. Post-Session Summary | MEDIUM | M | LATER |
| 8. Smart Floor Rec | LOW | M | LATER |
| 11. Explanation Quality | LOW | M | LATER |
| 2. Swipe Between Tabs | LOW | M | LATER |
