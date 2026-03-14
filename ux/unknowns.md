# Unknowns / Needs Confirmation

1. **Target devices** — What phones are the primary users on? iPhone SE (375px) vs iPhone Pro Max (430px) vs Android mid-range? This affects breakpoint decisions.

2. **Landscape support** — Should landscape mode be supported or should the app lock to portrait? Current CSS doesn't handle landscape explicitly.

3. **PWA plans** — Is this intended to be installable as a home screen app? If so, need manifest.json, service worker, and offline support.

4. **Session persistence** — Currently session stats reset on page refresh. Is this intentional? Users might expect their session to persist if they accidentally close a tab.

5. **Question review workflow** — If explanation feedback (thumbs up/down) is added, who reviews flagged questions? Is there an existing content moderation process?

6. **Tablet usage** — Are students using iPads? The 600-700px breakpoint range is iPad Mini territory and currently gets the cramped 2-column choice layout.

7. **Accessibility requirements** — Are there accessibility standards to meet (WCAG AA)? Current contrast ratios on muted text against dark backgrounds may not meet AA standards.

8. **Analytics** — Is there an analytics service in place? No analytics code was found in the codebase. Measurement plan depends on this.

9. **Offline mode** — Students on buses/subways may lose connectivity. Should the app work offline using cached DB questions?

10. **Multiple concurrent users** — Is this deployed for a classroom or individual use? Affects leaderboard design and admin needs.
