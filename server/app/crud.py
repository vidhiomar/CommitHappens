from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas
from datetime import datetime, timedelta

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def calculate_urgency_score(tip: models.Tip, now: datetime):
    score = 0.0

    # 1. Credibility weight
    if tip.author:
        score += (tip.author.credibility_score / 100) * 20

    # 2. Verification weight
    verified_count = sum(1 for v in tip.verifications if v.status == "Verified")
    fake_count = sum(1 for v in tip.verifications if v.status == "Fake")
    score += (verified_count * 5) - (fake_count * 10)

    # 3. Urgency weight
    if tip.urgency == "High":
        score += 30
    elif tip.urgency == "Medium":
        score += 10

    # 4. Freshness Decay (older posts lose priority)
    days_old = (now - tip.created_at).days
    score -= (days_old * 2)

    # 5. Expiry Decay (approaching deadline increases urgency, passed deadline destroys it)
    if tip.expiry_date:
        hours_to_expiry = (tip.expiry_date - now).total_seconds() / 3600
        if hours_to_expiry < 0:
            score -= 1000  # Expired
        elif hours_to_expiry < 48:
            score += 40   # Expiring soon!
        elif hours_to_expiry < 168:
            score += 15   # Expiring in a week

    return score

def get_tips(db: Session, college: str = None, branch: str = None, year: str = None, category: str = None, urgency: str = None, verified_only: bool = False):
    now = datetime.utcnow()
    query = db.query(models.Tip).filter(
        (models.Tip.expiry_date >= now) | (models.Tip.expiry_date == None)
    )
    if college:
        query = query.filter(models.Tip.college == college)
    if branch:
        query = query.filter(models.Tip.branch == branch)
    if year:
        query = query.filter(
            (models.Tip.target_year == year) |
            (models.Tip.target_year == None) |
            (models.Tip.target_year == "")
        )
    if category and category != "All":
        query = query.filter(models.Tip.category == category)
    if urgency and urgency != "All":
        query = query.filter(models.Tip.urgency == urgency)

    tips = query.all()

    if verified_only:
        tips = [t for t in tips if any(v.status == "Verified" for v in t.verifications)]

    # Calculate ranking score for each
    for tip in tips:
        tip.urgency_score = calculate_urgency_score(tip, now)

    # Sort by urgency_score desc
    tips.sort(key=lambda x: getattr(x, 'urgency_score', 0), reverse=True)
    return tips

def search_tips(db: Session, q: str, college: str = None):
    now = datetime.utcnow()
    query = db.query(models.Tip).filter(
        (models.Tip.expiry_date >= now) | (models.Tip.expiry_date == None)
    )
    if college:
        query = query.filter(models.Tip.college == college)

    q_lower = f"%{q.lower()}%"
    query = query.filter(
        models.Tip.title.ilike(q_lower) |
        models.Tip.description.ilike(q_lower) |
        models.Tip.tags.ilike(q_lower)
    )
    tips = query.all()
    for tip in tips:
        tip.urgency_score = calculate_urgency_score(tip, datetime.utcnow())
    tips.sort(key=lambda x: getattr(x, 'urgency_score', 0), reverse=True)
    return tips

def get_archived_tips(db: Session, college: str = None):
    now = datetime.utcnow()
    query = db.query(models.Tip).filter(models.Tip.expiry_date < now)
    if college:
        query = query.filter(models.Tip.college == college)
    return query.order_by(models.Tip.expiry_date.desc()).limit(20).all()

def create_tip(db: Session, tip: schemas.TipCreate):
    db_tip = models.Tip(**tip.model_dump())
    db.add(db_tip)
    db.commit()
    db.refresh(db_tip)
    return db_tip

def add_verification(db: Session, verification: schemas.VerificationCreate):
    existing = db.query(models.Verification).filter(
        models.Verification.tip_id == verification.tip_id,
        models.Verification.verified_by == verification.verified_by
    ).first()

    if existing:
        # Allow status update
        existing.status = verification.status
        tip = db.query(models.Tip).filter(models.Tip.id == verification.tip_id).first()
        if tip:
            author = db.query(models.User).filter(models.User.id == tip.created_by).first()
            if author:
                if verification.status == "Verified":
                    author.credibility_score = min(100, author.credibility_score + 2)
                elif verification.status == "Fake":
                    author.credibility_score = max(0, author.credibility_score - 5)
                elif verification.status == "Outdated":
                    author.credibility_score = max(0, author.credibility_score - 1)
        db.commit()
        db.refresh(existing)
        return existing

    db_verification = models.Verification(**verification.model_dump())
    db.add(db_verification)

    tip = db.query(models.Tip).filter(models.Tip.id == verification.tip_id).first()
    if tip:
        author = db.query(models.User).filter(models.User.id == tip.created_by).first()
        if author:
            if verification.status == "Verified":
                author.credibility_score = min(100, author.credibility_score + 2)
            elif verification.status == "Fake":
                author.credibility_score = max(0, author.credibility_score - 5)
            elif verification.status == "Outdated":
                author.credibility_score = max(0, author.credibility_score - 1)

    db.commit()
    db.refresh(db_verification)
    return db_verification

def get_notifications(db: Session, user_id: int):
    return db.query(models.Notification).filter(
        models.Notification.user_id == user_id
    ).order_by(models.Notification.sent_at.desc()).all()

def mark_notification_read(db: Session, notification_id: int):
    n = db.query(models.Notification).filter(models.Notification.id == notification_id).first()
    if n:
        n.read = True
        db.commit()
    return n

def save_opportunity(db: Session, saved: schemas.SavedOpportunityCreate):
    existing = db.query(models.SavedOpportunity).filter(
        models.SavedOpportunity.tip_id == saved.tip_id,
        models.SavedOpportunity.user_id == saved.user_id
    ).first()
    if existing:
        return existing

    db_saved = models.SavedOpportunity(**saved.model_dump())
    db.add(db_saved)
    db.commit()
    db.refresh(db_saved)
    return db_saved

def get_saved_opportunities(db: Session, user_id: int):
    return db.query(models.SavedOpportunity).filter(
        models.SavedOpportunity.user_id == user_id
    ).order_by(models.SavedOpportunity.saved_at.desc()).all()

def get_analytics(db: Session):
    now = datetime.utcnow()

    active_tips = db.query(models.Tip).filter(
        (models.Tip.expiry_date >= now) | (models.Tip.expiry_date == None)
    ).count()

    expired_tips = db.query(models.Tip).filter(
        models.Tip.expiry_date < now
    ).count()

    expiring_soon = db.query(models.Tip).filter(
        models.Tip.expiry_date >= now,
        models.Tip.expiry_date <= now + timedelta(hours=24)
    ).count()

    total_verifications = db.query(models.Verification).filter(
        models.Verification.status == "Verified"
    ).count()

    total_users = db.query(models.User).count()

    # Top contributors by credibility
    top_contributors = db.query(models.User).order_by(
        models.User.credibility_score.desc()
    ).limit(5).all()

    # Category breakdown
    from sqlalchemy import func as sqlfunc
    category_counts = db.query(
        models.Tip.category,
        sqlfunc.count(models.Tip.id).label("count")
    ).filter(
        (models.Tip.expiry_date >= now) | (models.Tip.expiry_date == None)
    ).group_by(models.Tip.category).all()

    # Recent verified tips
    recent_verified = db.query(models.Tip).join(
        models.Verification, models.Tip.id == models.Verification.tip_id
    ).filter(
        models.Verification.status == "Verified",
        (models.Tip.expiry_date >= now) | (models.Tip.expiry_date == None)
    ).order_by(models.Tip.created_at.desc()).limit(5).all()

    return {
        "active_tips": active_tips,
        "expired_tips": expired_tips,
        "expiring_soon": expiring_soon,
        "total_verifications": total_verifications,
        "total_users": total_users,
        "top_contributors": [
            {
                "id": u.id,
                "name": u.name,
                "branch": u.branch,
                "year": u.year,
                "credibility_score": u.credibility_score
            } for u in top_contributors
        ],
        "category_breakdown": [
            {"category": c, "count": cnt} for c, cnt in category_counts
        ],
        "recent_verified_tips": [
            {"id": t.id, "title": t.title, "category": t.category, "urgency": t.urgency}
            for t in recent_verified
        ]
    }
