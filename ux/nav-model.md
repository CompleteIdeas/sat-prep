# Navigation Model (Mobile)

## Current Model
**Horizontal tab bar** at the top of the page, below the header.

```
[Header: Logo | User Badge | Queue Pill]
[Tab: Practice | My Stats | Leaderboard | (Admin)]
[Content area]
[Fixed: Queue fill bar at bottom edge, 3px]
```

## Navigation Issues on Mobile Portrait

### 1. Tabs at the Top
- Tabs are at the top, requiring a thumb reach to the top of the screen
- On tall phones (6.5"+), the tab bar is in the hardest-to-reach zone
- The active tab has no strong visual indicator beyond a subtle background change

### 2. No Bottom Navigation
- The only fixed element at the bottom is a 3px queue indicator bar
- The "Next Question" button appears inline after the question card, often below the fold
- Users must scroll down past the explanation to find "Next"

### 3. "Home" Definition
- "Home" = Practice tab (default `activeTab`)
- No way to return to login without signing out (confirm dialog on user badge click)

### 4. Back Behavior
- No back stack — all tabs replace content in place
- Browser back navigates away from the app entirely

### 5. Global Actions
- Sign out: Click user badge → confirm dialog
- Mode switch: Available only on Practice tab
- Floor adjust: Available only on Practice tab

## Recommended Mobile Nav Model
Move to a **bottom tab bar** for Practice/Stats/Leaderboard, with the question card and "Next" button getting the prime thumb zone real estate. See `big-ideas.md` for full proposal.
