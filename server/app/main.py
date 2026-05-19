from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app import models
from app.routers import users, tips, verifications, notifications, saves, analytics

models.Base.metadata.create_all(bind=engine)
from app.database import SessionLocal
from app.models import Tip

db = SessionLocal()

if db.query(Tip).count() == 0:
    sample_tip = Tip(
        title="Google SWE Internship OA",
        content="OA usually focuses on graphs + DP. Medium difficulty.",
        company="Google",
        author_id=1,
        credibility_score=92
    )

    db.add(sample_tip)
    db.commit()

db.close()

app = FastAPI(title="Insider Knowledge System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_PREFIX = "/api/v1"

app.include_router(users.router, prefix=API_PREFIX)
app.include_router(tips.router, prefix=API_PREFIX)
app.include_router(verifications.router, prefix=API_PREFIX)
app.include_router(notifications.router, prefix=API_PREFIX)
app.include_router(saves.router, prefix=API_PREFIX)
app.include_router(analytics.router, prefix=API_PREFIX)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Insider Knowledge System API"}