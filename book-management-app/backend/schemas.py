from pydantic import BaseModel

# --- Book Schemas ---

# creating a book
class BookCreate(BaseModel):
    title: str
    author: str

# returning a book
class BookResponse(BaseModel):
    id: int
    title: str
    author: str

    class Config:
        from_attributes = True

# --- Auth Schemas ---

# logging in
class LoginRequest(BaseModel):
    email: str
    password: str

# after login
class LoginResponse(BaseModel):
    message: str
    session_id: str