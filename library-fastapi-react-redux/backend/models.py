# Pydantic schemas for validation
from pydantic import BaseModel, EmailStr
from typing import Optional

# schema for validating author creation by user - used for POST
class AuthorCreate(BaseModel):
    first_name: str      
    last_name: str        
    email: EmailStr 

# schema for validating author update by user - used for PUT
class AuthorUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None

# schema for validating author response - used for GET
class AuthorResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str

# schema for validating book creation by user - used for POST
class BookCreate(BaseModel):
    title: str
    isbn: str
    publication_year: Optional[int] = None 
    available_copies: int = 1               
    author_id: int   

# schema for validating book update by user - used for PUT
class BookUpdate(BaseModel):
    title: Optional[str] = None
    isbn: Optional[str] = None
    publication_year: Optional[int] = None
    available_copies: Optional[int] = None
    author_id: Optional[int] = None

# schema for validating book response - used for GET
class BookResponse(BaseModel):
    id: int
    title: str
    isbn: str
    publication_year: Optional[int]  
    available_copies: int
    author_id: int