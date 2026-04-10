# CoPatible — Claude Context

Interactive prototype for CoPatible, an AI-powered social connection platform for people in life transitions. Co is an AI companion that reads where someone is right now, finds others in the same moment, and organizes real experiences for them.

## Product in one line

Co turns how you're feeling right now into a real experience with real people — and gets better at doing that the longer she knows you.

## Target user

25–40 year olds in an active life transition (new city, career pivot, post-relationship, building something). Socially solvent, connection-poor, emotionally mature enough to show up for new people.

## Tech stack

- **Vite + React 19** (no TypeScript)
- **Single-file app** — all screens and components live in `src/App.jsx` (~1000 lines)
- **Inline styles only** — no CSS modules or styled-components, no Tailwind
- **No state management library** — plain `useState` and prop drilling
- **Deployed on Vercel**, auto-deploys on push to `main`
- **Live at** https://copatible-2026.vercel.app

## Architecture notes

- Screen routing is a flat integer enum in the `S` constant (`S.HOME`, `S.VOICE`, `S.DETAIL`, etc.) with a single `scr` state at the top-level `App` component
- Each screen is its own function component (`Home`, `Voice`, `Match`, `Results`, `Detail`, `Chat`, `Profile`, `Journey`, `Feedback`, `History`, etc.)
- The `Tabs` component renders the bottom nav and hides itself on certain screens via a `hide` array
- Variable and prop names are heavily abbreviated (`c.co`, `c.ro`, `ph`, `wi`, `lw`, etc.) to keep the single file dense. This is intentional for prototype speed, not a convention to follow in production

## Design system

Warm minimalism with an editorial touch. Earthy, muted palette built on ivory and beige with soft terracotta, sage, and dusty rose accents. Serif headings for personality, sans-serif body for clarity. Generously rounded corners, no hard edges, no pure black.

**Color tokens** (all in the `c` object):
- `iv` ivory `#FAF6F1` — base background
- `po` `#F3EDE6`, `bs` `#EDE5DB`, `ps` `#D9D2C9`, `mg` `#B5AFA8` — surface/border scale
- `dw` dark brown `#2E2A26` — primary text
- `wc` `#5A544D`, `ss` `#8A8279` — secondary text
- `co` terracotta `#D4917A` — primary action/accent
- `ro` dusty rose `#C4929A` — voice/recording accent
- `sg` sage `#9AAF9A` — positive/confirmed
- `ap` amber `#DAA882`, `lg` lavender `#A9A0B2` — secondary accents

**Typography**: Instrument Serif (italic variant) for headings via `sf` constant, system sans-serif for body.

**Common patterns**: 16–22px rounded corners on cards, 999px pill buttons, backdrop-blurred tab bar, radial gradient glows on dark cards, word-by-word text reveal animations.

## Key features

### Onboarding
- Single-question onboarding: "What brought you here?" → straight to Home
- No profile required upfront (users can complete later)

### Check-in (primary flow)
- Voice is primary, photo upload is an alternative
- Live transcription shown while recording
- Transcript confirmation with inline play button

### 5 matching signals
The system tries to detect 5 signals from voice or photo input:
1. **Mood** — how they're feeling
2. **Energy** — active vs. chill
3. **Activity** — what they want to do
4. **Social** — who they want to be around
5. **Timing** — when

Both voice and photo attempt to detect all 5. What gets detected depends on what the user actually says/shows, not the input method. Currently simulated randomly per check-in (~65% detection rate per signal).

### Dynamic follow-ups
When signals are missing, Co asks up to 2 targeted questions to fill the gaps. If all 5 are detected, follow-ups are skipped entirely and the user goes straight to matching. Shown with a signal strength bar ("3/5 signals") and tags for what was detected.

### Co's memory card (Home screen)
Dark warm card at the top of Home where Co surfaces an observation. Adapts to user state:
- New user: "I'm here when you're ready. The first check-in is the hardest part."
- Matched user: "You almost cancelled Saturday. You stayed three hours."
- Includes a "Share this moment" button (matched users only) that opens a modal with a beautifully styled shareable card — this is the social currency layer

### Co's personal booking note (Detail screen)
Dark card above the member list explaining in Co's voice why she picked this specific circle for this user. Makes matches feel curated, not algorithmic.

### Persistent group chat
Each circle's chat stays open after the event ends. Accessible from:
- The active circle card on Journey (while circle is upcoming)
- "Past circles" section on Journey (3 most recent inline)
- Full history screen (`S.HISTORY`) via "View all N →" link
- Each past circle shows unread badge and "Chat is still open" indicator

### Invite friends
Two entry points:
- Circle-specific invite on the Detail screen
- General app referral on the Profile screen

## Key conventions

- **No emojis in code/files** unless the design specifically calls for them (icons, category symbols)
- **Never add comments unless asked** — the code is dense by design
- **Prefer editing existing files** over creating new ones
- **Inline styles everywhere** — don't introduce CSS files
- **No new dependencies** unless absolutely necessary

## Dev workflow

**Run locally**:
```
npm run dev
```
Runs on port 5173 by default. The `.claude/launch.json` uses port 5174 to avoid collision with other local projects.

**Build**:
```
npm run build
```

**Deploy**: Just `git push` — Vercel auto-deploys on push to `main`.

## Repository

- **GitHub**: https://github.com/chang627627/copatible-2026 (private)
- **Vercel**: https://copatible-2026.vercel.app
- **Vercel ↔ Git**: connected, auto-deploys on push to `main`

## Things we explicitly decided against

- **Category selection screen** — removed because voice/photo already captures intent
- **"Skip" button on transcript confirm** — confusing next to "Looks good"
- **"Stay connected?" per-person picker** on feedback — creates awkward social dynamics
- **Text input as alternative** — replaced with photo since photos capture richer context
- **Public profiles, follower counts, leaderboards** — the whole point of CoPatible is to not be performative
- **Journal as a named feature** — it's better as invisible infrastructure that feeds Co's memory

## Open questions / future work

- First-call activation risk: the vision doc mentions a 10-15 minute AI voice call during onboarding, which is a huge ask. Prototype currently skips this.
- Trust & safety: no identity verification in the prototype yet
- Business model: venue partnerships mentioned in the vision doc but not in the prototype
- Cold start in cities beyond SF
- Chapter shift detection (month 3 pivot) — in the vision doc, not yet in the prototype
- The express `✦` button for between-circle voice memos — in the vision doc, not yet in the prototype
