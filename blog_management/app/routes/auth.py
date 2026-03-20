from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.auth import create_access_token, verify_password
from app.models import get_user_by_username

router = APIRouter()


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(request: LoginRequest):
    user = get_user_by_username(request.username)

    if not user or not verify_password(request.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_access_token(data={"sub": user["username"], "role": user["role"]})

    return {"access_token": token, "token_type": "bearer"}
