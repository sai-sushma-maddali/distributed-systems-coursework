import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CreateBook({ addBook }) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, rgba(136, 216, 247, 1), rgba(94, 183, 234, 1))"
    return () => {
      document.body.style.background = ""
    }
  }, [])

  const handleSubmit = async () => {
    if (title.trim() === "" || author.trim() === "") {
      setError("Please fill in both fields.")
      return
    }

    await addBook(title, author)  // await the real API call from App.jsx
    navigate("/")
  }

  return (
    <div style={{
      maxWidth: "400px",
      margin: "100px auto",
      textAlign: "center",
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Roboto', sans-serif",
    }}>
      <h2 style={{ color: "#333", fontSize: "28px", marginBottom: "20px" }}>Add a New Book</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "transparent",
            outline: "none",
            fontSize: "16px",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => e.target.style.borderColor = "#6ab7ff"}
          onBlur={(e) => e.target.style.borderColor = "#ccc"}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "transparent",
            outline: "none",
            fontSize: "16px",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => e.target.style.borderColor = "#6ab7ff"}
          onBlur={(e) => e.target.style.borderColor = "#ccc"}
        />
      </div>

      {error && <p style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#6ab7ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            width: "48%",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#4a98d2"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#6ab7ff"}
        >
          Add Book
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#f1f1f1",
            color: "#333",
            border: "none",
            borderRadius: "8px",
            width: "48%",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#e0e0e0"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#f1f1f1"}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default CreateBook