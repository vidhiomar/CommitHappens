from app.database import SessionLocal, engine
from app import models
from datetime import datetime, timedelta

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()

def seed_data():
    if db.query(models.User).first():
        print("Database already seeded. Skipping.")
        return

    now = datetime.utcnow()

    # ── USERS ──────────────────────────────────────────────────────────────
    u1 = models.User(name="Rahul Kumar",     email="rahul@abc.edu",   college="ABC Institute", branch="CSE",        year="2nd Year",  credibility_score=92, role="student")
    u2 = models.User(name="Sneha Patel",     email="sneha@abc.edu",   college="ABC Institute", branch="CSE",        year="4th Year",  credibility_score=95, role="student")
    u3 = models.User(name="Amit Bhatia",     email="amit@abc.edu",    college="ABC Institute", branch="CSE",        year="3rd Year",  credibility_score=88, role="student")
    u4 = models.User(name="Priya Sharma",    email="priya@abc.edu",   college="ABC Institute", branch="ECE",        year="4th Year",  credibility_score=82, role="student")
    u5 = models.User(name="Karan Mehta",     email="karan@abc.edu",   college="ABC Institute", branch="Mechanical", year="4th Year",  credibility_score=78, role="student")
    u6 = models.User(name="Divya Nair",      email="divya@abc.edu",   college="ABC Institute", branch="CSE",        year="1st Year",  credibility_score=55, role="student")
    db.add_all([u1, u2, u3, u4, u5, u6])
    db.commit()

    # ── TIPS ───────────────────────────────────────────────────────────────
    tips = [
        # --- INTERNSHIPS ---
        models.Tip(
            title="Google STEP Internship — Referral Window Open",
            description="The Google STEP program for 2nd year students has an internal referral window open right now via the coding club. The public application doesn't open until next week. Email the placement cell TODAY with your resume and a 150-word SOP. Specifically looking for students with Python and Data Structures proficiency.",
            category="Internships", urgency="High",
            expiry_date=now + timedelta(hours=5),
            college="ABC Institute", branch="CSE", target_year="2nd Year",
            tags="Google,STEP,Internship,Referral",
            created_by=u2.id, created_at=now - timedelta(hours=2)
        ),
        models.Tip(
            title="Goldman Sachs Summer Analyst — Hidden Portal",
            description="Goldman Sachs posted a summer analyst role on an internal job portal that isn't on LinkedIn yet. The link is shared only via the Finance Club. Deadline is this Friday. They're specifically looking for students with CGPA > 8.0 and strong SQL skills.",
            category="Internships", urgency="High",
            expiry_date=now + timedelta(days=2),
            college="ABC Institute", branch="CSE", target_year="3rd Year",
            tags="Goldman,Finance,Internship",
            created_by=u3.id, created_at=now - timedelta(days=1)
        ),
        models.Tip(
            title="Microsoft SWE Internship — Referral via Alumni",
            description="A 2022 batch alumnus (Vikram S.) is actively giving referrals for Microsoft SWE intern roles. He's in the college WhatsApp alumni group. Just message him with your resume. He mentioned response time is fast. Don't wait for the official portal.",
            category="Internships", urgency="Medium",
            expiry_date=now + timedelta(days=5),
            college="ABC Institute", branch="CSE", target_year=None,
            tags="Microsoft,SWE,Referral,Alumni",
            created_by=u2.id, created_at=now - timedelta(days=2)
        ),

        # --- PLACEMENTS ---
        models.Tip(
            title="Adobe OA — Focus on Graph DP, Skip Strings",
            description="3 seniors gave the Adobe OA yesterday. Consensus: it was 70% Graph algorithms and Dynamic Programming. Zero string questions. If you have the OA today or tomorrow, grind LeetCode medium-hard Graph DPs for the next few hours. Key topics: Dijkstra, Floyd-Warshall, Knapsack variants.",
            category="Placements", urgency="High",
            expiry_date=now + timedelta(hours=20),
            college="ABC Institute", branch="CSE", target_year="3rd Year",
            tags="Adobe,OA,Graph,DP,Placement",
            created_by=u3.id, created_at=now - timedelta(hours=6)
        ),
        models.Tip(
            title="TCS Ninja — HR Round Pattern This Year",
            description="TCS HR is asking 3 fixed questions this season: 1) Why TCS? 2) Describe a team conflict and how you resolved it. 3) Where do you see yourself in 5 years? Seniors who've cleared it say they specifically look for 'commitment to service' framing. Prepare these 3 and you're 90% done.",
            category="Placements", urgency="Medium",
            expiry_date=now + timedelta(days=7),
            college="ABC Institute", branch="CSE", target_year="4th Year",
            tags="TCS,HR,Placement,Interview",
            created_by=u2.id, created_at=now - timedelta(days=3)
        ),
        models.Tip(
            title="PSU BHEL — Civil & Mech Gate Cutoff Drops",
            description="BHEL has historically had Gate cutoff around 680 for Mechanical. This year, based on registration numbers, it's expected to drop to around 620-640. If you're above 620 and haven't applied, apply immediately. Last date is approaching.",
            category="Placements", urgency="High",
            expiry_date=now + timedelta(days=3),
            college="ABC Institute", branch="Mechanical", target_year="4th Year",
            tags="PSU,BHEL,GATE,Mechanical,Placement",
            created_by=u5.id, created_at=now - timedelta(days=1)
        ),

        # --- SCHOLARSHIPS ---
        models.Tip(
            title="PM Scholarship for Engineering — Extension Granted",
            description="The PM Scholarship Scheme for Central Armed Police Forces has extended its deadline by 2 weeks. If you missed the original deadline, you can still apply. Income certificate and CGPA > 6.0 is required. The stipend is ₹2500/month. Apply on the NSP portal immediately.",
            category="Scholarships", urgency="High",
            expiry_date=now + timedelta(days=4),
            college="ABC Institute", branch=None, target_year=None,
            tags="Scholarship,PM,NSP,Stipend",
            created_by=u4.id, created_at=now - timedelta(hours=12)
        ),
        models.Tip(
            title="Aditya Birla Group Scholarship — Internal Nomination",
            description="The college can internally nominate 3 students for the Aditya Birla Scholarship (₹65,000/year). The HOD office is collecting nominations. If your CGPA is > 8.5 and you have extracurricular achievements, submit your portfolio to the HOD office before Thursday.",
            category="Scholarships", urgency="Medium",
            expiry_date=now + timedelta(days=6),
            college="ABC Institute", branch="CSE", target_year=None,
            tags="Scholarship,AditiyaBirla,CGPA",
            created_by=u3.id, created_at=now - timedelta(days=2)
        ),

        # --- RESEARCH ---
        models.Tip(
            title="Prof. Sharma — NLP Research Internship (Unannounced)",
            description="Prof. Sharma (CS dept) is quietly taking 3 undergrads for his new NLP project on code-switching in Indian languages. He hasn't posted any announcement. Email him directly at rpsharma@abc.edu with your resume and a one-paragraph statement of interest. Mention 'NLP Research Interest' in the subject. He responds fast.",
            category="Research", urgency="Medium",
            expiry_date=now + timedelta(days=8),
            college="ABC Institute", branch="CSE", target_year=None,
            tags="Research,NLP,Professor,Internship",
            created_by=u2.id, created_at=now - timedelta(days=4)
        ),
        models.Tip(
            title="IIT Bombay Summer Research — Applications Open",
            description="IIT Bombay's SRFP (Summer Research Fellowship Program) applications are now live. Our college has had 4 students accepted in the last 2 years. Strong recommendation letter from a professor + published paper or strong project is needed. The program pays ₹10,000/month + accommodation. Deadline: end of this month.",
            category="Research", urgency="Medium",
            expiry_date=now + timedelta(days=12),
            college="ABC Institute", branch="CSE", target_year="3rd Year",
            tags="IIT,Research,SRFP,Fellowship",
            created_by=u3.id, created_at=now - timedelta(days=5)
        ),

        # --- CLUBS ---
        models.Tip(
            title="Coding Club Recruitment — Backdoor via Open Project",
            description="The coding club officially closed applications last week. BUT — they're still accepting people who submit a PR to their open GitHub project (github.com/abc-coding-club). Merge a meaningful PR and DM the president on LinkedIn. Three people got in this way last semester. This is not public knowledge.",
            category="Clubs", urgency="Medium",
            expiry_date=now + timedelta(days=10),
            college="ABC Institute", branch="CSE", target_year=None,
            tags="CodingClub,GitHub,Backdoor,Recruitment",
            created_by=u1.id, created_at=now - timedelta(days=3)
        ),
        models.Tip(
            title="E-Cell Recruitment — Preference for Side Projects",
            description="E-Cell is recruiting. From past interviews, they care way more about personal projects and startup ideas than your CGPA. Bring a one-pager with a problem statement and business model. CGPA is barely looked at. They want founders, not rankers.",
            category="Clubs", urgency="Low",
            expiry_date=now + timedelta(days=14),
            college="ABC Institute", branch=None, target_year=None,
            tags="ECell,Entrepreneurship,Recruitment,StartUp",
            created_by=u6.id, created_at=now - timedelta(days=6)
        ),

        # --- FACULTY ---
        models.Tip(
            title="Prof. Gupta's Minor Project — Easy A Strategy",
            description="For Prof. Gupta's minor project (CS-402), choose any topic related to IoT or Smart Cities. He's written two papers in this area and grades generously on familiar topics. Also: submit 1 week early. He gives bonus marks for early submissions. This is from 3 seniors who took the course last year.",
            category="Faculty", urgency="Low",
            expiry_date=now + timedelta(days=20),
            college="ABC Institute", branch="CSE", target_year="3rd Year",
            tags="Faculty,Project,Strategy,Grades",
            created_by=u3.id, created_at=now - timedelta(days=7)
        ),
        models.Tip(
            title="ECE Dept — Prof. Kapoor Selects Lab Partners Early",
            description="Prof. Kapoor (ECE-305) informally picks his preferred lab partners in the first 2 weeks. Students who attend extra tutorials and show initiative get the best slots and equipment. If you're in ECE 3rd year, start going to his office hours now — even without a specific question.",
            category="Faculty", urgency="Low",
            expiry_date=now + timedelta(days=15),
            college="ABC Institute", branch="ECE", target_year="3rd Year",
            tags="ECE,Faculty,Lab,Strategy",
            created_by=u4.id, created_at=now - timedelta(days=8)
        ),

        # --- EXAMS ---
        models.Tip(
            title="GATE 2026 — Focus Topics by Branch (Insider Intel)",
            description="Based on analysis of 5 years of GATE papers and what coaching institutes are seeing in mock test trends: CSE — emphasis shifting to Compiler Design and CN. ECE — analog circuits back in focus. Mech — Engineering Maths carrying higher weightage. Allocate study time accordingly for the next 3 months.",
            category="Exams", urgency="Low",
            expiry_date=now + timedelta(days=30),
            college="ABC Institute", branch=None, target_year="4th Year",
            tags="GATE,2026,Study,Strategy,Exam",
            created_by=u5.id, created_at=now - timedelta(days=10)
        ),
    ]

    db.add_all(tips)
    db.commit()

    # ── VERIFICATIONS ──────────────────────────────────────────────────────
    verifications = [
        # Google STEP (tip[0]) — highly verified
        models.Verification(tip_id=tips[0].id, verified_by=u3.id, status="Verified"),
        models.Verification(tip_id=tips[0].id, verified_by=u1.id, status="Verified"),
        models.Verification(tip_id=tips[0].id, verified_by=u4.id, status="Verified"),
        # Goldman (tip[1])
        models.Verification(tip_id=tips[1].id, verified_by=u2.id, status="Verified"),
        models.Verification(tip_id=tips[1].id, verified_by=u3.id, status="Verified"),
        # Adobe OA (tip[3]) — verified + one outdated
        models.Verification(tip_id=tips[3].id, verified_by=u1.id, status="Verified"),
        models.Verification(tip_id=tips[3].id, verified_by=u2.id, status="Verified"),
        models.Verification(tip_id=tips[3].id, verified_by=u4.id, status="Verified"),
        # TCS (tip[4])
        models.Verification(tip_id=tips[4].id, verified_by=u3.id, status="Verified"),
        models.Verification(tip_id=tips[4].id, verified_by=u5.id, status="Verified"),
        # BHEL PSU (tip[5])
        models.Verification(tip_id=tips[5].id, verified_by=u4.id, status="Verified"),
        # PM Scholarship (tip[6])
        models.Verification(tip_id=tips[6].id, verified_by=u1.id, status="Verified"),
        models.Verification(tip_id=tips[6].id, verified_by=u5.id, status="Verified"),
        # Prof. Sharma NLP (tip[8])
        models.Verification(tip_id=tips[8].id, verified_by=u1.id, status="Verified"),
        models.Verification(tip_id=tips[8].id, verified_by=u6.id, status="Verified"),
        # Coding Club (tip[10])
        models.Verification(tip_id=tips[10].id, verified_by=u3.id, status="Verified"),
        # Prof. Gupta (tip[12])
        models.Verification(tip_id=tips[12].id, verified_by=u2.id, status="Verified"),
        models.Verification(tip_id=tips[12].id, verified_by=u1.id, status="Verified"),
        models.Verification(tip_id=tips[12].id, verified_by=u6.id, status="Verified"),
    ]
    db.add_all(verifications)

    # ── NOTIFICATIONS (for user u1 = Rahul, 2nd year CSE) ──────────────────
    notifications = [
        models.Notification(user_id=u1.id, tip_id=tips[0].id,
            message="🔥 URGENT: Google STEP referral window closes in 5 hours. Apply now!",
            sent_at=now - timedelta(minutes=30), read=False),
        models.Notification(user_id=u1.id, tip_id=tips[6].id,
            message="📚 PM Scholarship deadline extended — you're eligible based on your branch.",
            sent_at=now - timedelta(hours=3), read=False),
        models.Notification(user_id=u1.id, tip_id=tips[10].id,
            message="💡 Coding Club is accepting backdoor applications via GitHub PRs.",
            sent_at=now - timedelta(hours=8), read=True),
        models.Notification(user_id=u1.id, tip_id=tips[1].id,
            message="⚡ Goldman Sachs hidden portal closes in 2 days — CSE 3rd year tip.",
            sent_at=now - timedelta(hours=24), read=True),
    ]
    db.add_all(notifications)
    db.commit()

    # Update credibility scores based on verifications
    for u in [u2, u3]:  # top contributors
        u.credibility_score = min(100, u.credibility_score + 4)
    db.commit()

    print("✅ Database seeded with 6 users, 15 tips, 19 verifications, 4 notifications.")

if __name__ == "__main__":
    seed_data()
