# Mobile Portrait Mode Audit

## Critical Issues

### 1. "Next Question" Button Below the Fold (Severity: HIGH)
**Problem:** After answering, the explanation box expands below the choices, and the "Next Question" button appears below that. On mobile portrait, users must scroll past the explanation to find it.
**Screens:** Practice tab after answering
**Fix:** Make the "Next Question" button fixed at the bottom of the viewport (above the queue bar), or add swipe-right to advance.
```css
/* Proposed fix */
.next-btn.show {
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 60;
  margin: 0;
}
```
**Files:** `index.css:306-324`, `App.jsx:125`

### 2. Container Padding Too Large (Severity: HIGH)
**Problem:** `.container` has `padding: 28px 28px 80px`. On a 375px-wide phone, that leaves only 319px for content. Every pixel matters in portrait mode.
**Fix:** Reduce to 12-16px on mobile.
```css
@media (max-width: 600px) {
  .container { padding: 12px 12px 80px; }
}
```
**File:** `index.css:39-45`

### 3. Question Card Padding Excessive (Severity: HIGH)
**Problem:** `.question-card` has `padding: 40px`. Combined with container padding, that's 68px per side consumed by padding alone on a 375px screen — 36% of width wasted.
**Fix:** Reduce to 16-20px on mobile.
```css
@media (max-width: 600px) {
  .question-card { padding: 16px; border-radius: 16px; }
}
```
**File:** `index.css:164-173`

### 4. Tab Navigation at Top — Hard to Reach (Severity: MEDIUM)
**Problem:** Tab buttons are at the top of the page. On 6"+ phones, the top 20% is the hardest thumb zone. With 3-4 tabs, each is small and requires precise tapping.
**Fix:** Move tabs to a fixed bottom bar, or make them larger with better touch targets.
```css
@media (max-width: 600px) {
  .tab-nav {
    position: fixed;
    bottom: 6px;
    left: 8px;
    right: 8px;
    z-index: 55;
    border-radius: 20px;
    backdrop-filter: blur(12px);
    background: rgba(15,15,26,0.92);
  }
  .tab-btn { padding: 14px 8px; font-size: 0.8rem; }
}
```
**File:** `index.css:432-456`

### 5. 2-Column Choice Grid at 601-700px (Severity: MEDIUM)
**Problem:** Choices switch to 1-column only at 600px. Between 601-700px (many tablets, large phones in landscape), choices are in a cramped 2-column grid where long answer text wraps poorly.
**Fix:** Switch to 1-column at 700px instead of 600px.
```css
@media (max-width: 700px) {
  .choices { grid-template-columns: 1fr; }
}
```
**File:** `index.css:235-240`

### 6. Streak Bar Layout Breaks on Narrow Screens (Severity: MEDIUM)
**Problem:** `.streak-bar` is `display: flex; justify-content: space-between`. The streak number is 4rem font and the "Best Streak" sits at the right. On narrow screens, content can wrap unpredictably.
**Fix:** Stack vertically on mobile.
```css
@media (max-width: 600px) {
  .streak-bar { flex-direction: column; gap: 12px; text-align: center; }
  .streak-num { font-size: 2.8rem; }
  .best-streak { text-align: center; }
}
```
**File:** `index.css:89-129`

### 7. Header Layout Cluttered (Severity: MEDIUM)
**Problem:** Header has logo, user badge, and queue pill in a row. At 600px, `flex-wrap` kicks in, but the queue pill ("Queue 3/5") is not useful enough to justify the space it takes on mobile.
**Fix:** Hide queue pill on mobile (the bottom bar already shows queue status). Simplify header to logo + user badge.
```css
@media (max-width: 600px) {
  .header-stats { display: none; }
  header { margin-bottom: 16px; padding-bottom: 12px; }
}
```
**File:** `index.css:47-87`

### 8. No Tap Highlight Control (Severity: LOW)
**Problem:** Default `-webkit-tap-highlight-color` creates blue/gray flash on all tappable elements. Looks unpolished on iOS.
**Fix:** Add to global reset:
```css
* { -webkit-tap-highlight-color: transparent; }
```
**File:** `index.css:15`

### 9. Session Bar 4-Column → 2-Column Could Be Tighter (Severity: LOW)
**Problem:** At 700px, session bar goes 2-column. The `.sbar-val` at 1.8rem is fine, but `padding: 16px 12px` per card adds up.
**Fix:** Reduce padding on mobile:
```css
@media (max-width: 600px) {
  .sbar-item { padding: 10px 8px; border-radius: 10px; }
  .sbar-val { font-size: 1.4rem; }
}
```
**File:** `index.css:459-477`

### 10. Floor Control Hint Hidden — No Replacement (Severity: LOW)
**Problem:** `.floor-hint` is `display: none` at 600px. Users lose the context of what the floor does.
**Fix:** Show a condensed version or add a tooltip/title attribute.
**File:** `index.css:430`, `FloorControl.jsx`

### 11. Admin Panel Inline Styles (Severity: LOW)
**Problem:** AdminTab uses extensive inline styles instead of CSS classes. This makes responsive behavior impossible to override with media queries.
**Fix:** Extract admin styles to CSS classes in `index.css`.
**File:** `AdminTab.jsx`

## Mobile-First Design System Gaps

| Missing Component | Need |
|-------------------|------|
| **Bottom sheet** | For settings, floor control, mode selection |
| **Fixed bottom action button** | "Next Question" should always be reachable |
| **Swipe gestures** | Swipe right for next question, swipe between tabs |
| **Skeleton loader** | Question card shows spinner — skeleton would feel faster |
| **Toast notifications** | Streak break notification instead of just resetting the counter |
| **Pull-to-refresh** | Leaderboard and stats should support pull-to-refresh pattern |
| **Haptic feedback** | Correct/wrong answer, streak milestones |
| **Bottom tab bar** | Standard mobile nav pattern |

## Performance Hotspots

1. **Google Fonts loaded from CDN** — 3 font families (Playfair Display, DM Mono, DM Sans) loaded via external stylesheet. This blocks first paint. Consider self-hosting or using `font-display: swap`.
2. **No list virtualization** — History list in StatsTab has `max-height: 520px` with `overflow-y: auto`, but renders all items. For long sessions this could get slow.
3. **Queue fill loop** — Fires multiple sequential fetch calls. On slow mobile networks, this can be noticeable. Consider adding a visual "warming up" state.
