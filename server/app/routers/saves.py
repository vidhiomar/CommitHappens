from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud
from app.database import get_db

router = APIRouter(prefix="/saves", tags=["Saves"])

@router.post("/", response_model=schemas.SavedOpportunityResponse)
def save_opportunity(saved: schemas.SavedOpportunityCreate, db: Session = Depends(get_db)):
    return crud.save_opportunity(db=db, saved=saved)

@router.get("/{user_id}", response_model=List[schemas.SavedOpportunityResponse])
def get_saves(user_id: int, db: Session = Depends(get_db)):
    return crud.get_saved_opportunities(db=db, user_id=user_id)
