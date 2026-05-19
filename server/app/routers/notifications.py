from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud
from app.database import get_db

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("/{user_id}", response_model=List[schemas.NotificationResponse])
def read_notifications(user_id: int, db: Session = Depends(get_db)):
    return crud.get_notifications(db=db, user_id=user_id)
