from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Users
class UserBase(BaseModel):
    name: str
    email: str
    college: str
    branch: str
    year: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    credibility_score: int
    role: str

    class Config:
        from_attributes = True

# Tips
class TipBase(BaseModel):
    title: str
    description: str
    category: str
    urgency: str
    expiry_date: Optional[datetime] = None
    college: str
    branch: str
    target_year: Optional[str] = None
    tags: Optional[str] = None

class TipCreate(TipBase):
    created_by: int

class VerificationResponse(BaseModel):
    id: int
    status: str
    verified_by: int

    class Config:
        from_attributes = True

class UserMinimal(BaseModel):
    name: str
    credibility_score: int

    class Config:
        from_attributes = True

class TipResponse(TipBase):
    id: int
    created_by: int
    created_at: datetime
    verifications: List[VerificationResponse] = []
    author: UserMinimal
    urgency_score: Optional[float] = None # Calculated at runtime

    class Config:
        from_attributes = True

# Verification
class VerificationCreate(BaseModel):
    tip_id: int
    verified_by: int
    status: str # Verified, Outdated, Fake

# Notifications
class NotificationResponse(BaseModel):
    id: int
    message: str
    read: bool
    sent_at: datetime

    class Config:
        from_attributes = True

# Saved Opportunities
class SavedOpportunityCreate(BaseModel):
    tip_id: int
    user_id: int

class SavedOpportunityResponse(BaseModel):
    id: int
    tip_id: int
    saved_at: datetime
    tip: TipResponse

    class Config:
        from_attributes = True
