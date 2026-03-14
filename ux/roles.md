# Role-Based Experience

## Guest
- **Home:** Practice tab (no login required)
- **Top 3 tasks:** Answer questions, check session accuracy, try different modes
- **Hidden:** Admin tab, leaderboard submission (can view only)
- **Simplified:** No persistent stats — session-only data
- **Confusion points:** "Why can't I see my stats next time?" → Need a nudge to register

### Mobile Recommendations
- Show a subtle "Sign in to save progress" banner after 5 questions
- Keep the experience identical otherwise — no gates, no friction

## Authenticated User
- **Home:** Practice tab with restored all-time stats
- **Top 3 tasks:** Practice questions, check leaderboard position, review session history
- **Access:** Everything except Admin tab
- **Key feature:** Streak submitted to leaderboard when broken

### Mobile Recommendations
- On the Stats tab, show both session and all-time stats clearly separated
- Leaderboard: highlight user's position with "YOU" badge (already exists)
- After a streak breaks, show a quick "Streak saved to leaderboard!" toast

## Admin
- **Home:** Practice tab (same as authenticated)
- **Top 3 tasks:** Manage accounts, reset stats, monitor leaderboard integrity
- **Access:** Full — including Admin tab with account manager and nuclear reset
- **Key feature:** Can reset/delete any user account

### Mobile Recommendations
- Admin tab inline styles should be extracted to CSS for responsive behavior
- Account manager cards (`admin-account-row`) work well on mobile but action buttons could stack vertically on narrow screens:
```css
@media (max-width: 600px) {
  .admin-account-row { flex-wrap: wrap; }
  .admin-btn { flex: 1; min-width: 100px; }
}
```

## Cross-Role Collaboration
- No direct collaboration features currently
- Leaderboard is the only social element
- Future opportunity: Study groups, shared question sets, tutor view
