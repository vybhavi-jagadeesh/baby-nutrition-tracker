# 🍼 Baby Nutrition Tracker

A personal baby nutrition tracking app built with React — because parenting is chaotic enough without also trying to remember whether you gave the Vitamin D drops this morning.

> **Built entirely with Claude AI.** The code is React. The product thinking, feature decisions, and UX tradeoffs are human.

---

## Live demo

🔗 [baby-tracker.vercel.app](https://baby-tracker.vercel.app) ← replace with your actual URL after deploying

---

## What it does

Tracks everything you need to manage a baby's nutrition day-to-day:

- **Milk feeds** — breastfeeding (by minutes) and bottle/formula (ml or oz), with timestamps, edit and delete
- **Solids schedule** — food introduction phases with progress tracking and auto-calculated timelines from a set start date
- **Fruit log** — per-serving entries with a built-in safe fruit guide for 7–8 months
- **Water intake** — daily tracking with ml/oz toggle and customisable target
- **Supplements** — daily check-off (auto-resets every day) for Vitamin D, Iron Drops, Bonnisan Drops — all editable from the profile
- **Poop tracker** — colour swatches, consistency picker, notes, daily count, and gentle doctor warnings for black/pale stool
- **Feed reminders** — set your own feed interval, get browser notifications 15 or 30 minutes before the next feed
- **Smart Label Scan** — photograph a supplement bottle or formula tin, get AI-powered dosage guidance for your baby's age (demo mode by default, live AI with API key)
- **Baby profile** — name, date of birth (auto-calculates and displays age), weights, blood group, doctor info, custom fields, ragi start date, editable milk and water targets
- **6 themes** — 3 for boys (Ocean blue, Mint forest, Slate & amber), 3 for girls (Rose petal, Lavender dream, Peach blossom) — switch live with instant preview
- **Dark mode** — full dark theme across every screen
- **localStorage persistence** — all data saves in the browser and survives refresh and tab close
- **Delete confirmation** — every log deletion requires confirmation so nothing gets lost by accident

---

## Project structure

```
baby-tracker/
├── README.md
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    └── BabyTracker.jsx
```

---

## Getting started locally

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/yourusername/baby-tracker.git
cd baby-tracker
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Deploying to Vercel

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → select your repo
4. Framework auto-detects as **Vite** — don't change any settings
5. Click **Deploy**
6. Your app is live at `your-project.vercel.app` in about 60 seconds

---

## Enabling live AI scanning

The Smart Label Scan runs in demo mode by default and returns a sample result regardless of what photo you upload — safe for demos, not useful for real life.

To enable real AI scanning:

1. Get a free API key from [console.anthropic.com](https://console.anthropic.com)
2. In `src/BabyTracker.jsx`, find the `scanLabel` function — there's a clearly marked comment block with the real API call ready to uncomment
3. Add your key as an environment variable in Vercel:
   - Project settings → Environment Variables
   - Name: `VITE_ANTHROPIC_API_KEY`, Value: your key
4. Redeploy

> ⚠️ Never commit your API key to GitHub. Always use environment variables.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Styling | CSS-in-JS — dynamically generated theme-aware global CSS |
| State | React Context API + useState hooks |
| Persistence | localStorage |
| Fonts | Nunito + Lora via Google Fonts |
| AI | Anthropic Claude API — claude-sonnet-4 with Vision |
| Browser APIs | Notifications API, File API, Camera (MediaDevices) |
| Deployment | Vercel |

---

## Roadmap

- [x] localStorage persistence
- [x] Editable supplements and targets
- [x] Delete confirmation on all logs
- [x] Daily supplement check-off auto-reset
- [x] Ragi start date in profile
- [ ] Export logs as CSV
- [ ] Growth chart — weight over time
- [ ] Vaccination tracker
- [ ] Doctor visit notes
- [ ] Sleep tracker
- [ ] Multi-baby support
- [ ] Refactor into component files
- [ ] PWA — installable on mobile

---

## How this was built

This app was built entirely using Claude AI as the development tool. I have a background in software development but no prior React experience. What I contributed:

- Product definition and feature specification across ~40 conversation turns
- Every UX decision — recommended targets shown but always overridable, per-serving vs per-day logging, gentle vs alarming doctor warnings, date+time on every log, 6 switchable themes
- Iterative feedback, testing, and direction throughout
- The judgment of what to build and why

Claude wrote all the code.

I think this is worth being transparent about — both because it's honest, and because directing AI to build something genuinely useful is a skill worth talking about.

---

## License

MIT — use it, fork it, build on it. If you're also tracking ragi porridge schedules at 3am, we're kindred spirits.

---

*Built with love, sleep deprivation, and Claude AI.*
