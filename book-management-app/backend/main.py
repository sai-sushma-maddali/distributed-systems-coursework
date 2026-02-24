from fastapi import FastAPI, Depends, HTTPException, Cookie
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db, engine
from models import Base, Book, User, Session as SessionModel
from schemas import BookCreate, BookResponse, LoginRequest, LoginResponse
from passlib.context import CryptContext
from datetime import datetime, timedelta
import uuid

# Create all tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# This allows  React frontend to talk to  backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# verify passwords
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# --- Helper function to check if user is logged in ---
def get_current_user(session_id: str = Cookie(None), db: Session = Depends(get_db)):
    if not session_id:
        raise HTTPException(status_code=401, detail="Not logged in")
    
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    if session.expires_at < datetime.utcnow():
        raise HTTPException(status_code=401, detail="Session expired")
    
    return session.user_id


# =====================
# AUTH ENDPOINTS
# =====================

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not pwd_context.verify(request.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    session_id = str(uuid.uuid4())
    expires_at = datetime.utcnow() + timedelta(hours=24)
    
    new_session = SessionModel(
        id=session_id,
        user_id=user.id,
        created_at=datetime.utcnow(),
        expires_at=expires_at
    )
    db.add(new_session)
    db.commit()

    # Set the session_id as a cookie in the response
    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(
    key="session_id",
    value=session_id,
    httponly=True,
    max_age=86400,
    samesite="lax"
)
    return response


@app.post("/logout")
def logout(session_id: str = Cookie(None), db: Session = Depends(get_db)):
    if session_id:
        db.query(SessionModel).filter(SessionModel.id == session_id).delete()
        db.commit()
    return {"message": "Logged out successfully"}


# =====================
# BOOK ENDPOINTS
# =====================

# Get all books
@app.get("/books")
def get_books(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    books = db.query(Book).all()
    return books


# Get a single book by ID
@app.get("/books/{book_id}")
def get_book(book_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


# Add a new book
@app.post("/books")
def create_book(book: BookCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    new_book = Book(title=book.title, author=book.author)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


# Update a book
@app.put("/books/{book_id}")
def update_book(book_id: int, book: BookCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    existing_book = db.query(Book).filter(Book.id == book_id).first()
    if not existing_book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    existing_book.title = book.title
    existing_book.author = book.author
    db.commit()
    db.refresh(existing_book)
    return existing_book


# Delete a book
@app.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    db.delete(book)
    db.commit()
    return {"message": f"Book with id {book_id} deleted successfully"}