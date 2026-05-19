from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud
from app.database import get_db

router = APIRouter(prefix="/tips", tags=["Tips"])

@router.post("/", response_model=schemas.TipResponse)
def create_tip(tip: schemas.TipCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=tip.created_by)
    if not db_user:
        raise HTTPException(status_code=404, detail="Author not found")
    return crud.create_tip(db=db, tip=tip)

@router.get("/", response_model=List[schemas.TipResponse])
def read_tips(college: str = None, branch: str = None, year: str = None, db: Session = Depends(get_db)):
    tips = crud.get_tips(db, college=college, branch=branch, year=year)
    return tips
