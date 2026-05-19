from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/")
def get_analytics(db: Session = Depends(get_db)):
    return crud.get_analytics(db)
