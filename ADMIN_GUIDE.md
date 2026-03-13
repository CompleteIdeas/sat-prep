# Admin Guide

## Logging In

1. Open `sat-prep.html` in a browser
2. Enter username `SATPREPADMIN` and password `PSATclaudeiscool12345`
3. Click **Sign In** — the ⚙️ Admin tab will appear in the navigation

## Admin Panel Features

### Account Manager
Lists every non-admin account with:
- Username, best streak, total questions answered, total points

**Reset Stats** — clears a user's best streak, answered count, correct count, points, and removes their leaderboard entry. Their account login is preserved.

**Delete** — permanently removes the account and their leaderboard entry. Cannot be undone.

### Nuclear Option
Wipes **all** accounts (except the admin account) and clears the global leaderboard. The admin account is re-seeded immediately after. Use with caution.

## Notes
- The admin account is auto-seeded on every page load, so it always exists even if localStorage is cleared
- The admin account never appears on the leaderboard
- Nobody can register the username `SATPREPADMIN` through the normal registration flow
- Admin credentials are hardcoded in the HTML source — change them before any public deployment
