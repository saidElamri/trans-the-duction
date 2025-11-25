from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import timedelta
from typing import Optional

import models
import database
import auth
from services.hf_client import HFClient

# Initialize database
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Pydantic models
class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TranslationRequest(BaseModel):
    text: str
    direction: str = "fr-en"

class TranslationResponse(BaseModel):
    translated_text: Optional[str] = None
    model_used: str
    processing_time: float
    error: Optional[str] = None

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoints
@app.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "user created"}

@app.post("/login", response_model=Token)
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/translate", response_model=TranslationResponse)
def translate(request: TranslationRequest, current_user: models.User = Depends(auth.get_current_user)):
    hf_client = HFClient()
    try:
        result = hf_client.translate(request.text, request.direction)
        if "error" in result:
             raise HTTPException(status_code=503, detail=result["error"])
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
