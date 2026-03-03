from fastapi import FastAPI
from routers import authors, books
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Library Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],   # allows GET, POST, PUT, DELETE
    allow_headers=["*"],
)

app.include_router(authors.router)
app.include_router(books.router)

@app.get("/")
def root():
    return {"message": "Welcome to LMS!"}