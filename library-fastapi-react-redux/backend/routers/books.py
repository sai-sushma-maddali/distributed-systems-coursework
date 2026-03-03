from fastapi import APIRouter, HTTPException
from models import BookCreate, BookUpdate
from database import get_connection

router = APIRouter(prefix="/books", tags=["Books"])

# Endpoint to create a new book
@router.post("/", status_code=201)
def create_book(book: BookCreate):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO books (title, isbn, publication_year, available_copies, author_id) VALUES (%s, %s, %s, %s, %s)",
            (book.title, book.isbn, book.publication_year, book.available_copies, book.author_id)
        )
        conn.commit()
        return {"id": cursor.lastrowid, **book.dict()}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Endpoint to get a list of books with pagination
@router.get("/")
def get_books(skip: int = 0, limit: int = 10):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM books LIMIT %s OFFSET %s", (limit, skip))
    books = cursor.fetchall()
    cursor.close()
    conn.close()
    return books

# Endpoint to get a single book by ID
@router.get("/{book_id}")
def get_book(book_id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM books WHERE id = %s", (book_id,))
    book = cursor.fetchone()
    cursor.close()
    conn.close()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

# Endpoint to update an existing book
@router.put("/{book_id}")
def update_book(book_id: int, book: BookUpdate):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM books WHERE id = %s", (book_id,))
    existing = cursor.fetchone()
    if not existing:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Book not found")
    
    updates = {k: v for k, v in book.dict().items() if v is not None}
    if updates:
        set_clause = ", ".join([f"{k} = %s" for k in updates])
        cursor.execute(f"UPDATE books SET {set_clause} WHERE id = %s", (*updates.values(), book_id))
        conn.commit()
    
    cursor.execute("SELECT * FROM books WHERE id = %s", (book_id,))
    updated = cursor.fetchone()
    cursor.close()
    conn.close()
    return updated

# Endpoint to delete a book
@router.delete("/{book_id}")
def delete_book(book_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM books WHERE id = %s", (book_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Book deleted successfully"}