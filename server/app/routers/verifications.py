from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas, crud
from app.database import get_db

router = APIRouter(prefix="/verifications", tags=["Verifications"])

@router.post("/", response_model=schemas.VerificationResponse)
def create_verification(verification: schemas.VerificationCreate, db: Session = Depends(get_db)):
    return crud.add_verification(db=db, verification=verification)
