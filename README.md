<div align="center">
  <img src="https://lucide.dev/api/icon/shield-check?color=%236366f1&size=64" alt="InsiderInfo Logo" />
  <h1>InsiderInfo</h1>
  <h3>The Peer-Verified Opportunity Intelligence Network</h3>
  <p><em>"We convert unspoken institutional knowledge into actionable opportunity intelligence for first-generation students."</em></p>
</div>

---

## 🏆 The Problem (The "Invisible Curriculum")

College success isn't just about grades; it's about access to information. *Who is referring for Google STEP? Which professor takes interns without announcing it? What's the hidden backdoor to the coding club?*

Currently, this information flows through **exclusive friend circles**. First-generation and unconnected students miss out entirely. 

**InsiderInfo** democratizes this access. We transform informal campus chatter into a structured, verified, and time-sensitive intelligence graph.

---

## 🔥 Why This Wins (Core USPs)

We didn't build a forum. We built a **Recommendation-Engine-Driven Intelligence Network**.

* **Hyper-Personalized Intelligence Feed**: A CSE 2nd Year student sees internship referral deadlines. A Mechanical 4th Year sees PSU placement cutoff drops. 
* **Peer Verification + Trust Graph**: This is our strongest engineering USP. Fake/outdated reporting tanks credibility. Only the most reliable voices rise to the top.
* **Explainable Recommendation Layer**: We don't just show a tip; we tell the user *why* they are seeing it ("Verified by 18 seniors", "Expiring in 5 hours", "Targeted for your branch").
* **Smart Feed Ranking Algorithm**: The feed isn't chronological. It uses a custom sorting heuristic: `Score = Credibility Weight + Verification Score + Urgency Bonus - Freshness Decay - Expiry Decay`.
* **Auto-Expiring Knowledge**: Stale information automatically disappears from the active feed, keeping the platform production-grade and relevant.
* **Proactive Urgency Engine**: Smart notifications alert users *before* deadlines close ("Google STEP closes in 5 hours").

---

## 💻 Technical Architecture & Stack

Built for scale, maintainability, and visual excellence.

### Frontend
* **Framework**: Next.js 15 / React 19
* **Styling**: Tailwind CSS v4 + Vanilla CSS (Premium Glassmorphism Design System)
* **UI/UX**: Vibrant Indigo/Violet Dark Theme, dynamic micro-animations, structured typography (Inter + Sora).

### Backend
* **Framework**: FastAPI (Python)
* **Database**: SQLite (Dev) / PostgreSQL via Supabase (Prod)
* **ORM**: SQLAlchemy
* **Architecture**: RESTful APIs with Pydantic schema validation. Modular router structure (`tips`, `users`, `verifications`, `notifications`, `analytics`).

---

## 🚀 The "Perfect Demo" Flow

1. **The Hook**: Freshman lands on the premium hero section and signs up, selecting their specific Branch and Year.
2. **Personalization**: They instantly land on a dynamic dashboard filled with intelligence filtered exactly for them.
3. **The Urgency**: Live countdown timers pulse for opportunities expiring within 24 hours. A notification dot alerts them to a high-priority scholarship.
4. **The Trust Engine**: A trusted senior submits a hidden internship tip. Another senior clicks "Verify". The author's Credibility Score updates live, and the tip shoots to the top of the feed via the ranking algorithm.
5. **The Proof**: The Analytics dashboard shows the active heartbeat of the platform—verified tips, category breakdowns, and a live contributor leaderboard.

---

## ⚙️ Running Locally

### 1. Start the Backend (FastAPI)
```bash
cd server
python -m venv venv
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python seed.py # Seeds the DB with rich, realistic data
uvicorn app.main:app --reload
```
*Backend runs on `http://localhost:8000`*

### 2. Start the Frontend (Next.js)
```bash
cd client
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000` (or 3001 if 3000 is occupied).*

---

## 🎯 Hackathon Checklist Accomplished

- [x] **Real backend APIs** (FastAPI)
- [x] **Personalized feed** (Branch/Year filtering)
- [x] **Verification system** (Verify, Outdated, Fake reporting)
- [x] **Credibility engine** (Auto-updating trust graph & badges)
- [x] **Beautiful UI** (Modern glassmorphism, animated gradients)
- [x] **Smart feed ranking algorithm** (Urgency + Trust math)
- [x] **Explainable recommendations** ("Why am I seeing this?")
- [x] **Analytics dashboard** (Live platform KPIs & Leaderboard)
- [x] **Auto-expiring tips** (Live countdown timers)

*Built to democratize access to the hidden rules of college success.*