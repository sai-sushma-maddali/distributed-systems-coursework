from fastapi import Depends, FastAPI

from app.dependencies import get_current_user
from app.routes import auth, posts

app = FastAPI(title="Blog Management System")

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(posts.router, prefix="/posts", tags=["Posts"])


@app.get("/")
def root():
    return {"message": "Blog Management System is running"}


@app.get("/users/me", tags=["Users"])
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
