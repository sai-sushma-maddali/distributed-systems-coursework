# Book Inventory System

A simple web-based book inventory management application built with FastAPI and JavaScript.

## Overview

This project provides a user-friendly interface for managing a book inventory system. Users can add new books, search for existing books, and update book information through an intuitive web interface.

## Features

- **Home Screen**: View all books in the inventory
- **Add Books**: Add new books to the inventory
- **Search Books**: Search for books by title and/or author name
- **Update Books**: Modify existing book information
- **Responsive Design**: Clean, modern UI with a warm color scheme

## Project Structure
book_inventory/
├── app.py # FastAPI application server
├── requirements.txt # Python dependencies
└── static/
    ├── home_screen.html # Main landing page
    ├── add_book_screen.html # Add new book form
    ├── search_book_screen.html # Search functionality page
    ├── update_book_screen.html # Update book information page
    └── book_management.js # Frontend JavaScript logic

## Requirements

- Python 3.8+
- FastAPI 0.109.0
- Uvicorn 0.27.0
- Pydantic 2.12.5

## Installation

1. Clone or navigate to the project directory
2. Install dependencies:
   ```bash
   pip install -r requirements.txt

## Running the Application
Start the server using Uvicorn

uvicorn app:app --reload

The application will be available at http://127.0.0.1:8000/

## Usage
- Home: Navigate to the home screen to view all books
- Add: Click the Add Book button to add new books to the inventory
- Search: Use the search functionality to find specific books
- Update: Click on a book to update its information