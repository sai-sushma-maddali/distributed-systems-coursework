# Blog Management System

A FastAPI backend for a blog management system with JWT-based authentication, role-based access control, and MySQL storage.

## Tech Stack

- **FastAPI** — REST API framework
- **MySQL** — User and post storage
- **JWT (python-jose)** — Token-based authentication
- **passlib + bcrypt** — Password hashing
- **Ruff** — Linting
- **pre-commit** — Git hooks for automated linting

## Project Structure

```
blog_management/
├── app/
│   ├── main.py           # FastAPI app entry point
│   ├── auth.py           # JWT token logic + password hashing
│   ├── database.py       # MySQL connection
│   ├── models.py         # DB query functions
│   ├── dependencies.py   # Auth guards + role checkers
│   └── routes/
│       ├── auth.py       # POST /auth/login
│       └── posts.py      # GET/POST/DELETE /posts
├── .pre-commit-config.yaml
├── pyproject.toml
├── requirements.txt
└── .env
```

## Setup

### 1. Clone and create virtual environment

```bash
git clone https://github.com/your-username/your-repo.git
cd blog_management
python -m venv venv
venv\Scripts\activate  # Windows
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=blog_management

JWT_SECRET=your_secret_key
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=30
```

### 4. Set up MySQL

Run the following SQL to create the database and tables:

```sql
CREATE DATABASE IF NOT EXISTS blog_management;
USE blog_management;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('reader', 'writer', 'moderator') NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Run the server

```bash
uvicorn app.main:app --reload
```

Visit `http://127.0.0.1:8000/docs` for the interactive Swagger UI.

## API Endpoints

| Method | Endpoint | Role Required | Description |
|--------|----------|---------------|-------------|
| POST | `/auth/login` | None | Login and receive JWT token |
| GET | `/users/me` | Any authenticated | Get current user info |
| GET | `/posts` | Any authenticated | View all posts |
| POST | `/posts` | writer, moderator | Create a new post |
| DELETE | `/posts/{id}` | moderator | Delete a post |

## Roles

| Role | GET /posts | POST /posts | DELETE /posts/{id} |
|------|-----------|-------------|-------------------|
| reader | ✅ | ❌ 403 | ❌ 403 |
| writer | ✅ | ✅ | ❌ 403 |
| moderator | ✅ | ✅ | ✅ |

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Successful request |
| 201 | Post created successfully |
| 401 | Missing/invalid token or wrong credentials |
| 403 | Valid token but insufficient role |
| 404 | Post not found |

## Linting & Pre-commit

Ruff is configured in `pyproject.toml`. Pre-commit hooks run automatically on every `git commit`.

To run linting manually:

```bash
ruff check .
ruff check . --fix  # auto-fix issues
```

To install pre-commit hooks:

```bash
pre-commit install
```
