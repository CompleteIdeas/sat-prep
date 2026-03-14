# Mobile-First Blueprint

## Design Principles
1. **Thumb zone first** — Primary actions (answer, next) must be in the bottom 60% of the screen
2. **Content over chrome** — Minimize UI overhead between the user and the question
3. **Instant feedback** — Every tap produces visible feedback within 100ms
4. **Progressive information** — Show the essential, reveal the details on demand
5. **One-handed flow** — The entire practice loop should work with one thumb
6. **Dark and focused** — The dark theme is a strength; lean into it with OLED blacks and vibrant accents

## Proposed Mobile IA

```
[Fixed Header: Logo + User Badge]     <- Slim, 48px max
[Content Area]                         <- Scrollable, full-width
  Practice: Question + Choices
  Stats: Cards + History
  Leaderboard: Ranked list
  Admin: Account manager
[Fixed Next Button]                    <- Only when answered, above tab bar
[Fixed Bottom Tab Bar]                 <- Practice | Stats | Board | (Admin)
[Queue fill bar]                       <- 3px at very bottom
```

## Key Screen Templates

### Practice Screen (Mobile Portrait)
```
+---------------------------+
| SAT·Prep          [avatar]|  <- 48px header
+---------------------------+
|  [Math] #42               |
|                           |
|  Question text here that  |
|  may wrap to multiple     |
|  lines on mobile...       |
|                           |
|  +---------------------+  |
|  | A) First choice      |  |
|  +---------------------+  |
|  | B) Second choice     |  |  <- 1-column always on mobile
|  +---------------------+  |
|  | C) Third choice      |  |
|  +---------------------+  |
|  | D) Fourth choice     |  |
|  +---------------------+  |
|                           |
|  [Explanation box]        |  <- After answering
|                           |
+---------------------------+
| [  Next Question ->     ] |  <- Fixed, sticky
+---------------------------+
| Practice | Stats | Board  |  <- Fixed bottom tabs
+===========================+
```

### Stats Screen (Mobile Portrait)
```
+---------------------------+
| SAT·Prep          [avatar]|
+---------------------------+
| [Answered] [Correct]      |
| [Accuracy] [Points ]      |  <- 2x2 grid, compact
+---------------------------+
| [Best Streak] [Session Q] |
+---------------------------+
| Question History          |
| +- Correct: Q text... +  |
| +- Wrong: Q text...   +  |
| +- Correct: Q text... +  |
+---------------------------+
| Practice | Stats | Board  |
+===========================+
```

## Phased Roadmap

### Phase 1: Quick Wins (1-2 days)
These are CSS-only or near-CSS changes:

1. **Fix container padding** — 28px → 12px on mobile
2. **Fix question card padding** — 40px → 16px on mobile
3. **Fix choice grid** — 1-column at 700px (not 600px)
4. **Fixed "Next Question" button** — sticky at bottom of viewport
5. **Hide queue pill on mobile** — the bottom bar is enough
6. **Reduce streak bar font size** — 4rem → 2.8rem on mobile
7. **Add tap highlight control** — `-webkit-tap-highlight-color: transparent`
8. **Compact session bar** — smaller padding and font on mobile
9. **Streak bar stacking** — flex-direction column on mobile

### Phase 2: Core Flow Redesign (1-2 weeks)
1. **Bottom tab bar** — Move navigation to fixed bottom, with icon + label
2. **Skeleton loading** — Replace spinner with shimmer placeholders
3. **Keyboard shortcuts** — A/B/C/D to answer, Enter for next (desktop)
4. **Focus Mode toggle** — Hide chrome, show only streak + question
5. **Preload next question on answer** — Zero-delay transitions
6. **Admin styles extraction** — Inline → CSS classes for responsive

### Phase 3: Best-in-Class (1-2 months)
1. **Post-session summary card** — Shareable achievement card
2. **Onboarding tooltips** — First-visit walkthrough
3. **Explanation feedback** — Thumbs up/down on explanations
4. **Smart floor recommendation** — Suggest floor based on performance
5. **Swipe gestures** — Between tabs and questions
6. **PWA support** — Add manifest, service worker, offline question cache

## Measurement Plan

| Event | What It Tells Us |
|-------|-----------------|
| `question_answered` | Core engagement, questions per session |
| `streak_milestone` | Gamification effectiveness |
| `tab_switched` | Feature discovery, navigation ease |
| `mode_changed` | Content preference |
| `floor_adjusted` | Difficulty tuning engagement |
| `session_duration` | Overall stickiness |
| `next_button_time` | Friction between questions (should decrease with fixes) |
| `guest_to_signup` | Conversion funnel |
| `return_session` | Retention (did they come back?) |
