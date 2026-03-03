from fastapi import APIRouter, HTTPException
from models import AuthorCreate, AuthorUpdate, AuthorResponse
from database import get_connection

router = APIRouter(prefix="/authors", tags=["Authors"])

# Endpoint to create a new author
@router.post("/", status_code=201)
def create_author(author: AuthorCreate):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO authors (first_name, last_name, email) VALUES (%s, %s, %s)",
            (author.first_name, author.last_name, author.email)
        )
        conn.commit()
        return {"id": cursor.lastrowid, **author.dict()}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Endpoint to get a list of authors with pagination
## skip and limit are pagination parameters — e.g. GET /authors?skip=0&limit=10 gets the first 10, skip=10&limit=10 gets the next 10
@router.get("/")
def get_authors(skip: int = 0, limit: int = 10):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM authors LIMIT %s OFFSET %s", (limit, skip))
    authors = cursor.fetchall()
    cursor.close()
    conn.close()
    return authors

# Endpoint to get a single author by ID
@router.get("/{author_id}")
def get_author(author_id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM authors WHERE id = %s", (author_id,))
    author = cursor.fetchone()
    cursor.close()
    conn.close()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    return author

# Endpoint to update an existing author
@router.put("/{author_id}")
def update_author(author_id: int, author: AuthorUpdate):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM authors WHERE id = %s", (author_id,))
    existing = cursor.fetchone()
    if not existing:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Author not found")
    
    updates = {k: v for k, v in author.dict().items() if v is not None}
    if updates:
        set_clause = ", ".join([f"{k} = %s" for k in updates])
        cursor.execute(f"UPDATE authors SET {set_clause} WHERE id = %s", (*updates.values(), author_id))
        conn.commit()
    
    cursor.execute("SELECT * FROM authors WHERE id = %s", (author_id,))
    updated = cursor.fetchone()
    cursor.close()
    conn.close()
    return updated

# Endpoint to delete an author (only if they have no associated books)
@router.delete("/{author_id}")
def delete_author(author_id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM books WHERE author_id = %s", (author_id,))
    books = cursor.fetchall()
    if books:
        raise HTTPException(status_code=400, detail="Cannot delete author with associated books")
    
    cursor.execute("DELETE FROM authors WHERE id = %s", (author_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Author deleted successfully"}

# Endpoint to get all books by a specific author
@router.get("/{author_id}/books")
def get_books_by_author(author_id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM books WHERE author_id = %s", (author_id,))
    books = cursor.fetchall()
    cursor.close()
    conn.close()
    return books