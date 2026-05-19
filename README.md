# InsiderInfo: Opportunity Intelligence System

> "Success in college often depends on hidden information networks. We make those networks accessible to everyone."

**InsiderInfo** is a verified insider knowledge system for college students. Instead of random social media posts, students share **important actionable intelligence**—like hidden placement pipelines, scholarship deadline extensions, and professor preferences—that normally spreads only through exclusive friend circles.

We are solving the **"Invisible Curriculum"** problem, democratizing access to opportunity intelligence for first-generation and underserved students.

---

## 🌟 Unique USPs (Why We Are Different)

* **Hidden “Invisible Curriculum” Solution**: Solves real opportunity inequality for first-generation students.
* **Structured Opportunity Intelligence**: Not a generic social feed; every tip has urgency, categories, and expiry.
* **Peer-Verified Trust Layer**: Misinformation is reduced through peer verification and credibility scoring.
* **Hyper-Personalized Feed**: Content is filtered strictly by college, branch, and year.
* **Proactive Smart Notifications**: Warns students *before* deadlines close, rather than after they miss them.
* **Auto-Expiring Knowledge**: Stale and outdated information automatically disappears.
* **Trust Graph**: Prioritizes reliable contributors and penalizes misinformation.
* **Academic Calendar-Aware**: Intelligence delivery aligns with placement cycles and exam periods.
* **Community-Driven Equity**: Converts informal word-of-mouth knowledge into a searchable, institutional memory.

---

## 🚀 Core Features

### 1. User Onboarding & Personalization
Students select their College, Branch, and Year during onboarding. The entire platform tailors the intelligence feed so a CSE 2nd Year student sees coding club recruitments, while a Mechanical 4th Year sees PSU placement opportunities.

### 2. Structured Tip Submission
Seniors submit intelligence using a highly structured form:
* Title & Description
* Category (Placements, Scholarships, Research, etc.)
* Urgency (Normal, Medium, High)
* Expiry Date
* Tags

### 3. Peer Verification System & Credibility Scoring
The core trust layer. Users can:
* ✅ **Verify** a tip
* ⚠ **Mark Outdated**
* ❌ **Report Fake**

Every contributor has a **Credibility Score** that increases when their tips are verified and students engage positively, creating a self-regulating ecosystem.

### 4. Smart Notifications & Urgency
The system proactively alerts users about urgent deadlines based on their personalized profile, ensuring no critical opportunity is missed.

### 5. Advanced Search, Filters, and Bookmarks
Users can filter the feed by category, urgency, and verification status, and bookmark opportunities for later tracking.

---

## 💻 Tech Stack

* **Frontend**: Next.js 15, React, Tailwind CSS, shadcn/ui
* **Backend**: FastAPI (Python), SQLAlchemy
* **Database**: SQLite (Development) / PostgreSQL via Supabase (Production)
* **Architecture**: RESTful APIs with Pydantic validation

---

## ⚙️ Running Locally

### Prerequisites
* Node.js (v18+)
* Python 3.10+

### 1. Start the Backend (FastAPI)
```bash
cd server
python -m venv venv
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The backend will run on `http://localhost:8000`.

### 2. Start the Frontend (Next.js)
```bash
cd client
npm install
npm run dev
```
The frontend will run on `http://localhost:3000`.

---

## 📖 Perfect Demo Flow

1. **Freshman Signs Up**: Lands on the premium home page and inputs their branch/year.
2. **Personalized Feed**: Instantly sees intelligence tailored to their profile with "High Priority" chips.
3. **Senior Submits Tip**: A trusted senior submits a structured tip about a hidden internship.
4. **Peer Verification**: Another senior verifies the tip, and the original author's Credibility Score updates live.
5. **Smart Notification**: The freshman receives an urgent notification that the internship deadline is approaching.
6. **Bookmark**: The opportunity is saved to their profile.

---

*Built with passion to democratize opportunity and transform unspoken campus knowledge into structured, verified opportunity intelligence.*