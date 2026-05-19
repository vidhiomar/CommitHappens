from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app import schemas, crud
from app.database import get_db

router = APIRouter(prefix="/tips", tags=["Tips"])

@router.post("/", response_model=schemas.TipResponse)
def create_tip(tip: schemas.TipCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=tip.created_by)
    if not db_user:
        raise HTTPException(status_code=404, detail="Author not found")
    return crud.create_tip(db=db, tip=tip)

@router.get("/search", response_model=List[schemas.TipResponse])
def search_tips(q: str, college: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.search_tips(db, q=q, college=college)

@router.get("/archived", response_model=List[schemas.TipResponse])
def get_archived(college: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.get_archived_tips(db, college=college)

@router.get("/", response_model=List[schemas.TipResponse])
def read_tips(
    college: Optional[str] = None,
    branch: Optional[str] = None,
    year: Optional[str] = None,
    category: Optional[str] = None,
    urgency: Optional[str] = None,
    verified_only: bool = False,
    db: Session = Depends(get_db)
):
    return crud.get_tips(db, college=college, branch=branch, year=year,
                         category=category, urgency=urgency, verified_only=verified_only)
