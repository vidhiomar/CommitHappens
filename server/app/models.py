from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    college = Column(String)
    branch = Column(String)
    year = Column(String)
    credibility_score = Column(Integer, default=50)
    role = Column(String, default="student")

    tips = relationship("Tip", back_populates="author")
    verifications = relationship("Verification", back_populates="verifier")


class Tip(Base):
    __tablename__ = "tips"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    category = Column(String, index=True)
    urgency = Column(String) # High, Medium, Low
    expiry_date = Column(DateTime, nullable=True)
    college = Column(String)
    branch = Column(String)
    target_year = Column(String, nullable=True) # E.g., "2nd Year"
    tags = Column(String, nullable=True) # comma separated
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    author = relationship("User", back_populates="tips")
    verifications = relationship("Verification", back_populates="tip")


class Verification(Base):
    __tablename__ = "verifications"

    id = Column(Integer, primary_key=True, index=True)
    tip_id = Column(Integer, ForeignKey("tips.id"))
    verified_by = Column(Integer, ForeignKey("users.id"))
    status = Column(String) # Verified, Outdated, Fake

    tip = relationship("Tip", back_populates="verifications")
    verifier = relationship("User", back_populates="verifications")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    tip_id = Column(Integer, ForeignKey("tips.id"), nullable=True)
    message = Column(String)
    sent_at = Column(DateTime, default=datetime.utcnow)
    read = Column(Boolean, default=False)

class SavedOpportunity(Base):
    __tablename__ = "saved_opportunities"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    tip_id = Column(Integer, ForeignKey("tips.id"))
    saved_at = Column(DateTime, default=datetime.utcnow)
