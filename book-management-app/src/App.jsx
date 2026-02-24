import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import CreateBook from "./components/CreateBook"
import UpdateBook from "./components/UpdateBook"
import DeleteBook from "./components/DeleteBook"

const API_URL = "http://localhost:8000"

function App() {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  // Fetch all books from the backend
  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/books`, {
        credentials: "include",  // sends the session cookie automatically
      })
      if (response.ok) {
        const data = await response.json()
        setBooks(data)
      }
    } catch (error) {
      console.error("Error fetching books:", error)
    }
    setLoading(false)
  }

  // Fetch books whenever the user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchBooks()
    }
  }, [isLoggedIn])

  // Add a new book
  const addBook = async (title, author) => {
    try {
      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, author }),
      })
      if (response.ok) {
        await fetchBooks()  // refresh the book list from backend
      }
    } catch (error) {
      console.error("Error adding book:", error)
    }
  }

  // Update an existing book
  const updateBook = async (id, newTitle, newAuthor) => {
    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title: newTitle, author: newAuthor }),
      })
      if (response.ok) {
        await fetchBooks()  // refresh the book list from backend
      }
    } catch (error) {
      console.error("Error updating book:", error)
    }
  }

  // Delete a book
  const deleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (response.ok) {
        await fetchBooks()  // refresh the book list from backend
      }
    } catch (error) {
      console.error("Error deleting book:", error)
    }
  }

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h2>

  return (
    <BrowserRouter>
      <Routes>

        {/* Login page */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Home page - only visible if logged in */}
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Home books={books} setSelectedBook={setSelectedBook} isLoggedIn={isLoggedIn} />
              : <Navigate to="/login" />
          }
        />

        {/* Create book page - only visible if logged in */}
        <Route
          path="/create"
          element={
            isLoggedIn
              ? <CreateBook addBook={addBook} />
              : <Navigate to="/login" />
          }
        />

        {/* Update book page - only visible if logged in */}
        <Route
          path="/update"
          element={
            isLoggedIn
              ? <UpdateBook selectedBook={selectedBook} updateBook={updateBook} />
              : <Navigate to="/login" />
          }
        />

        {/* Delete book page - only visible if logged in */}
        <Route
          path="/delete"
          element={
            isLoggedIn
              ? <DeleteBook selectedBook={selectedBook} deleteBook={deleteBook} />
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App