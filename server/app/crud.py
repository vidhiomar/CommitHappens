from sqlalchemy.orm import Session
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
            score -= 1000 # Expired
        elif hours_to_expiry < 48:
            score += 40 # Expiring soon!
        elif hours_to_expiry < 168:
            score += 15 # Expiring in a week
            
    return score

def get_tips(db: Session, college: str = None, branch: str = None, year: str = None):
    now = datetime.utcnow()
    query = db.query(models.Tip).filter(
        (models.Tip.expiry_date >= now) | (models.Tip.expiry_date == None)
    )
    if college:
        query = query.filter(models.Tip.college == college)
    if branch:
        query = query.filter(models.Tip.branch == branch)
    if year:
        query = query.filter((models.Tip.target_year == year) | (models.Tip.target_year == None) | (models.Tip.target_year == ""))
    
    tips = query.all()
    
    # Calculate ranking score for each
    for tip in tips:
        tip.urgency_score = calculate_urgency_score(tip, now)
        
    # Sort by urgency_score desc
    tips.sort(key=lambda x: getattr(x, 'urgency_score', 0), reverse=True)
    return tips

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
        return existing
        
    db_verification = models.Verification(**verification.model_dump())
    db.add(db_verification)
    
    tip = db.query(models.Tip).filter(models.Tip.id == verification.tip_id).first()
    if tip:
        author = db.query(models.User).filter(models.User.id == tip.created_by).first()
        if author:
            if verification.status == "Verified":
                author.credibility_score += 2
            elif verification.status == "Fake":
                author.credibility_score -= 5
            elif verification.status == "Outdated":
                author.credibility_score -= 1
            
            if author.credibility_score < 0: author.credibility_score = 0
            if author.credibility_score > 100: author.credibility_score = 100
            
    db.commit()
    db.refresh(db_verification)
    return db_verification

def get_notifications(db: Session, user_id: int):
    return db.query(models.Notification).filter(models.Notification.user_id == user_id).order_by(models.Notification.sent_at.desc()).all()

def save_opportunity(db: Session, saved: schemas.SavedOpportunityCreate):
    existing = db.query(models.SavedOpportunity).filter(
        models.SavedOpportunity.tip_id == saved.tip_id,
        models.SavedOpportunity.user_id == saved.user_id
    ).first()
    if existing: return existing
    
    db_saved = models.SavedOpportunity(**saved.model_dump())
    db.add(db_saved)
    db.commit()
    db.refresh(db_saved)
    return db_saved

def get_saved_opportunities(db: Session, user_id: int):
    return db.query(models.SavedOpportunity).filter(models.SavedOpportunity.user_id == user_id).order_by(models.SavedOpportunity.saved_at.desc()).all()
