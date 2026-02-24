# Book Management App

A full-stack Book Management System built with **React** (frontend) and **FastAPI + MySQL** (backend).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Router DOM, Vite |
| Backend | FastAPI, Python |
| Database | MySQL, SQLAlchemy |
| Authentication | bcrypt password hashing, HTTP-only session cookies |

---

## Project Structure

```
book-management-app/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── CreateBook.jsx
│   │   ├── UpdateBook.jsx
│   │   └── DeleteBook.jsx
│   ├── App.jsx
│   └── main.jsx
│
backend/
├── main.py
├── database.py
├── models.py
├── schemas.py
└── config.ini
```

---

## Setup Instructions

### Prerequisites
- Node.js
- Python 3.x
- MySQL

---

### 1. Database Setup

Open MySQL and run:

```sql
CREATE DATABASE book_db;
USE book_db;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

### 2. Backend Setup

Navigate to the `backend` folder and install dependencies:

```bash
cd backend
pip install fastapi uvicorn sqlalchemy pymysql passlib bcrypt python-dotenv
```

Create `config.ini` in the `backend` folder:

```ini
[database]
DB_USER = root
DB_PASSWORD = your_mysql_password
DB_HOST = localhost
DB_PORT = 3306
DB_NAME = book_db
```

Start the backend server:

```bash
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`

---

### 3. Frontend Setup

Navigate to the project root and install dependencies:

```bash
cd book-management-app
npm install
npm install react-router-dom
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Adding a User

Since there is no registration page, add users directly in MySQL.

**Step 1:** Generate a password hash in Python:

```python
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
print(pwd_context.hash("your_password"))
```

**Step 2:** Insert the user in MySQL:

```sql
USE book_db;
INSERT INTO users (name, email, password_hash)
VALUES ('Your Name', 'your@email.com', 'PASTE_HASH_HERE');
```

---

## Running the App

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
uvicorn main:app --reload
```

**Terminal 2 — Frontend:**
```bash
cd book-management-app
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/login` | Login with email + password | No |
| POST | `/logout` | Logout current user | No |
| GET | `/books` | Get all books | Yes |
| GET | `/books/{id}` | Get a book by ID | Yes |
| POST | `/books` | Add a new book | Yes |
| PUT | `/books/{id}` | Update a book | Yes |
| DELETE | `/books/{id}` | Delete a book | Yes |

---

## Features

- Secure login with bcrypt password hashing
- HTTP-only session cookie authentication
- Add, view, update, and delete books
- Route protection (unauthenticated users redirected to login)
- Real-time sync with MySQL database
- Clean responsive UI with gradient styling