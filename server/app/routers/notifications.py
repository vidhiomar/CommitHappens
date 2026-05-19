from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud
from app.database import get_db

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("/{user_id}", response_model=List[schemas.NotificationResponse])
def read_notifications(user_id: int, db: Session = Depends(get_db)):
    return crud.get_notifications(db=db, user_id=user_id)

@router.patch("/{notification_id}/read")
def mark_read(notification_id: int, db: Session = Depends(get_db)):
    crud.mark_notification_read(db=db, notification_id=notification_id)
    return {"ok": True}
