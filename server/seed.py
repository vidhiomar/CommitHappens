from app.database import SessionLocal, engine
from app import models
from datetime import datetime, timedelta

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()

def seed_data():
    if db.query(models.User).first():
        print("Database already seeded.")
        return

    now = datetime.utcnow()

    # Create Users
    user1 = models.User(name="Rahul Kumar", email="rahul@college.edu", college="ABC Institute", branch="CSE", year="2nd Year", credibility_score=92)
    user2 = models.User(name="Sneha P.", email="sneha@college.edu", college="ABC Institute", branch="CSE", year="4th Year", credibility_score=88)
    user3 = models.User(name="Amit B.", email="amit@college.edu", college="ABC Institute", branch="CSE", year="3rd Year", credibility_score=95)
    db.add_all([user1, user2, user3])
    db.commit()

    # Create Tips
    tip1 = models.Tip(
        title="Goldman Sachs Internship Hiring",
        description="The coding club received referral forms before public release. Attend Wednesday sessions to get the link. They are specifically looking for students proficient in React and Java.",
        category="Internships",
        urgency="High",
        expiry_date=now + timedelta(hours=6),
        college="ABC Institute",
        branch="CSE",
        target_year="2nd Year",
        tags="Internship,Tech",
        created_by=user1.id,
        created_at=now - timedelta(days=1)
    )
    
    tip2 = models.Tip(
        title="Prof. Sharma's Research Interns",
        description="Prof. Sharma is taking 3 undergrads for his new NLP project. He hasn't announced it yet. Email him directly with your resume by Friday.",
        category="Research",
        urgency="Medium",
        expiry_date=now + timedelta(days=3),
        college="ABC Institute",
        branch="CSE",
        target_year=None,
        tags="NLP,Research",
        created_by=user2.id,
        created_at=now - timedelta(days=2)
    )
    
    tip3 = models.Tip(
        title="Adobe OA Focus Areas",
        description="Seniors who gave the Adobe OA yesterday mentioned it was heavily focused on Graph algorithms and DP. Skip strings for now.",
        category="Exams",
        urgency="High",
        expiry_date=now + timedelta(hours=48),
        college="ABC Institute",
        branch="CSE",
        target_year="3rd Year",
        tags="OA,Adobe",
        created_by=user3.id,
        created_at=now - timedelta(hours=5)
    )

    db.add_all([tip1, tip2, tip3])
    db.commit()

    # Add verifications
    v1 = models.Verification(tip_id=tip1.id, verified_by=user2.id, status="Verified")
    v2 = models.Verification(tip_id=tip1.id, verified_by=user3.id, status="Verified")
    v3 = models.Verification(tip_id=tip3.id, verified_by=user1.id, status="Verified")
    db.add_all([v1, v2, v3])
    
    # Add notifications
    n1 = models.Notification(user_id=user1.id, tip_id=tip1.id, message="Microsoft mentorship applications close tonight.", sent_at=now - timedelta(hours=2))
    n2 = models.Notification(user_id=user1.id, tip_id=tip2.id, message="You are eligible for AI scholarship based on your branch.", sent_at=now - timedelta(hours=5))
    db.add_all([n1, n2])

    db.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()
