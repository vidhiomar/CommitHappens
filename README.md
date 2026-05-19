# InsiderInfo: Peer-Verified Opportunity Intelligence Network

> *"We convert unspoken institutional knowledge into actionable opportunity intelligence for first-generation students."*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 🎯 The Problem — The "Invisible Curriculum"

College success isn't just about grades. *Who is giving referrals for Google STEP? Which professor is quietly taking interns? What's the backdoor into the coding club?*

This information flows through **exclusive friend circles**. First-generation and unconnected students miss out entirely. **InsiderInfo** is built to fix that.

---

## 🏆 What Makes This Different

We didn't build a forum. We built a **Peer-Verified Intelligence Graph** with a recommendation engine underneath.

| Feature | Why It Wins |
|---|---|
| **Hyper-Personalized Feed** | CSE 2nd Year sees internship referrals; Mech 4th Year sees PSU cutoff drops. Zero irrelevant posts. |
| **Trust Graph + Verification** | Verify, flag Outdated, or report Fake. Credibility scores auto-update. Top voices rise. |
| **Explainable Recommendations** | Every card shows *why* it was surfaced: "Verified by 18 peers", "Targeted at your year", "Deadline in 5h". |
| **Smart Ranking Algorithm** | `Score = Credibility + Verification Bonus + Urgency - Freshness Decay - Expiry Decay` |
| **Auto-Expiring Intel** | Stale tips disappear from feed. Live countdown timers on every deadline. |
| **Analytics Dashboard** | Real-time KPIs, contributor leaderboard, category breakdown — judges love this. |
| **6-Tier Reputation System** | Member → Contributor → Scholarship Guide → Placement Mentor → Trusted Senior → Top Contributor |

---

## 💻 Tech Stack

**Frontend** — Next.js 15, React 19, Tailwind CSS v4
- Premium light theme (soft lavender + indigo palette)
- Glassmorphism cards, staggered animations, live countdown timers
- Typography: Inter (body) + Sora (headings)
- Mobile-first responsive with bottom nav on mobile

**Backend** — FastAPI (Python), SQLAlchemy ORM
- Modular router architecture: `users`, `tips`, `verifications`, `notifications`, `saves`, `analytics`
- Pydantic schema validation on all endpoints
- SQLite (dev) → PostgreSQL / Supabase (prod)

---

## 🗂️ Project Structure

```
CommitHappens/
├── client/                     # Next.js 15 frontend
│   └── src/
│       ├── app/
│       │   ├── page.tsx              # Premium landing page
│       │   ├── onboarding/           # Multi-step wizard
│       │   └── (dashboard)/
│       │       ├── layout.tsx        # Wired search + mobile nav
│       │       ├── dashboard/        # Personalized feed + filters
│       │       ├── submit/           # Tip submission form
│       │       ├── notifications/    # Grouped, mark-as-read
│       │       ├── analytics/        # KPIs + leaderboard
│       │       └── profile/          # Credibility bar + saved items
│       └── components/
│           ├── CountdownTimer.tsx    # Live ticking timers
│           ├── TrustBadge.tsx        # 6-tier badge system
│           └── CredibilityBar.tsx    # Animated score bar
└── server/                     # FastAPI backend
    └── app/
        ├── main.py             # App entry point
        ├── models.py           # SQLAlchemy models
        ├── schemas.py          # Pydantic schemas
        ├── crud.py             # Business logic + ranking algorithm
        ├── database.py         # DB session
        └── routers/
            ├── tips.py         # Feed, search, archived
            ├── users.py
            ├── verifications.py
            ├── notifications.py
            ├── saves.py
            └── analytics.py    # Platform KPIs endpoint
```

---

## ⚙️ Running Locally

### Backend (FastAPI)
```bash
cd server
python -m venv .venv
# Windows: .\.venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
python seed.py          # Seeds 6 users, 15 tips, 19 verifications
uvicorn app.main:app --reload
```
Backend: `http://localhost:8000` · Docs: `http://localhost:8000/docs`

### Frontend (Next.js)
```bash
cd client
npm install
npm run dev
```
Frontend: `http://localhost:3000`

---

## 🔗 Key API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/users/` | Register / login user |
| `GET` | `/tips/` | Personalized ranked feed |
| `GET` | `/tips/search?q=` | Full-text search |
| `POST` | `/verifications/` | Verify, flag outdated, report fake |
| `GET` | `/notifications/{user_id}` | User notification inbox |
| `PATCH` | `/notifications/{id}/read` | Mark notification as read |
| `POST` | `/saves/` | Bookmark an opportunity |
| `GET` | `/analytics/` | Platform KPIs + leaderboard |

---

## 🎬 Perfect Demo Flow

```
1. Land on homepage → Premium hero with live stats bar
2. Click "Get Started" → Multi-step onboarding wizard
3. Choose CSE · 2nd Year → Preview of what you'll see appears
4. Enter Dashboard → Personalized feed, live countdown timers, expiring banner
5. Click "Verify" on a tip → Credibility score updates live
6. Check Notifications → Grouped alerts, mark-as-read
7. Visit Analytics → KPIs, top contributor leaderboard, category breakdown
8. Visit Profile → Animated credibility bar, trust badge tier
```

---

## 🎯 Hackathon Checklist

**MUST HAVE**
- [x] Real backend APIs (FastAPI, 6 routers)
- [x] Live deployment ready (Vercel + Render compatible)
- [x] Personalized feed (college × branch × year filtering)
- [x] Verification system (Verify / Outdated / Fake)
- [x] Credibility engine (auto-updating trust graph)
- [x] Smart notifications with urgency detection
- [x] Beautiful UI (premium light theme, glassmorphism)

**HIGH IMPACT**
- [x] Feed ranking algorithm (trust + urgency + freshness math)
- [x] Auto-expiring tips with live countdown timers
- [x] Explainable recommendations ("Why you're seeing this")
- [x] Analytics / Admin dashboard

**BONUS WOW**
- [x] 6-tier contributor reputation badges
- [x] Full-text search across tips + tags
- [x] Mobile-first with bottom nav
- [x] Rich seeded database (15 realistic tips, ready for demo)

---

*Built to democratize access to the hidden rules of college success.*