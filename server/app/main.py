from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app import models
from app.routers import users, tips, verifications, notifications, saves

# Create db tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Insider Knowledge System API")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(tips.router)
app.include_router(verifications.router)
app.include_router(notifications.router)
app.include_router(saves.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Insider Knowledge System API"}
