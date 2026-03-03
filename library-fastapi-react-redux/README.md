# Library Management System

A full-stack Library Management System built with **FastAPI**, **MySQL**, **React**, and **Redux Toolkit**.

---

## Project Structure

```
library-fastapi-react-redux/
├── backend/                  # FastAPI + MySQL
│   ├── main.py               # App entry point
│   ├── database.py           # MySQL connection
│   ├── models.py             # Pydantic schemas
│   ├── config.ini            # DB credentials (not committed to git)
│   ├── .gitignore
│   └── routers/
│       ├── authors.py        # Author endpoints
│       └── books.py          # Book endpoints
│
└── frontend/                 # React + Redux
    └── src/
        ├── api/
        │   └── axiosConfig.js        # Axios base URL setup
        ├── app/
        │   └── store.js              # Redux store
        ├── features/
        │   └── books/
        │       └── booksSlice.js     # Redux slice + async thunks
        ├── components/
        │   └── Navbar.js             # Navigation bar
        ├── pages/
        │   ├── Home.js               # Book list page
        │   ├── CreateBook.js         # Add book form
        │   └── UpdateBook.js         # Edit book form
        ├── App.js                    # Routes setup
        └── index.js                  # Redux Provider setup
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend Framework | FastAPI (Python) |
| Database | MySQL |
| ORM / DB Driver | mysql-connector-python |
| Data Validation | Pydantic |
| Frontend Framework | React |
| State Management | Redux Toolkit |
| HTTP Client | Axios |
| Routing | React Router DOM |

---

##  Backend Setup

### 1. Install Dependencies
```bash
cd backend
pip install fastapi uvicorn mysql-connector-python pydantic[email]
```

### 2. Create the Database
Run the following SQL in MySQL:
```sql
CREATE DATABASE library_db;
USE library_db;

CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    publication_year INT,
    available_copies INT DEFAULT 1,
    author_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);
```

### 3. Configure Database Credentials
Create a `config.ini` file in the `backend/` folder:
```ini
[mysql]
host = localhost
user = root
password = yourpassword
database = library_db
```
> `config.ini` is listed in `.gitignore` and will not be pushed to GitHub.

### 4. Run the Backend
```bash
uvicorn main:app --reload
```
API runs at: `http://127.0.0.1:8000`
Interactive docs at: `http://127.0.0.1:8000/docs`

---

## API Endpoints

### Authors
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/authors/` | Create a new author |
| GET | `/authors/` | Get all authors (paginated) |
| GET | `/authors/{id}` | Get a single author |
| PUT | `/authors/{id}` | Update an author |
| DELETE | `/authors/{id}` | Delete an author |
| GET | `/authors/{id}/books` | Get all books by an author |

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/books/` | Create a new book |
| GET | `/books/` | Get all books (paginated) |
| GET | `/books/{id}` | Get a single book |
| PUT | `/books/{id}` | Update a book |
| DELETE | `/books/{id}` | Delete a book |

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run the Frontend
```bash
npm start
```
App runs at: `http://localhost:3000`

> Make sure the backend is also running before starting the frontend.

---

##  How It Works

```
User Action (e.g. Create Book)
        ↓
React Component dispatches Redux Thunk
        ↓
Axios makes HTTP request to FastAPI
        ↓
FastAPI validates data with Pydantic
        ↓
MySQL saves the data
        ↓
Redux store updates state
        ↓
React UI re-renders automatically
```

---

## Features

- **Authors CRUD** — Create, Read, Update, Delete authors
- **Books CRUD** — Create, Read, Update, Delete books
- **Data Validation** — Email format validation, required fields, unique constraints
- **Error Handling** — 404 Not Found, 400 Bad Request, 422 Validation Error
- **Relationship Protection** — Cannot delete an author who has associated books
- **Pagination** — All list endpoints support `skip` and `limit` parameters
- **Redux State Management** — Centralized state with async thunks
- **Responsive UI** — Clean React frontend with form validation

---

##  Running Both Servers

Open **two terminals** and run simultaneously:

```bash
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm start
```
