import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function DeleteBook({ selectedBook, deleteBook }) {
  const navigate = useNavigate()

  // Apply gradient background
  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, rgba(136, 216, 247, 1), rgba(94, 183, 234, 1))"
    return () => { document.body.style.background = "" }
  }, [])

  if (!selectedBook) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <p>No book selected.</p>
        <button onClick={() => navigate("/")}>Go Back Home</button>
      </div>
    )
  }

  const handleDelete = async () => {
    await deleteBook(selectedBook.id)
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
      <h2 style={{ color: "#333", fontSize: "28px", marginBottom: "20px" }}>Delete Book</h2>

      {/* Book details card */}
      <div style={{
        backgroundColor: "#fff5f5",
        border: "1px solid #ffcccc",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "20px",
      }}>
        <p style={{ margin: "6px 0", fontSize: "16px", color: "#333" }}>
          <strong>Title:</strong> {selectedBook.title}
        </p>
        <p style={{ margin: "6px 0", fontSize: "16px", color: "#333" }}>
          <strong>Author:</strong> {selectedBook.author}
        </p>
      </div>

      <p style={{ color: "#ff6b6b", marginBottom: "20px", fontSize: "14px" }}>
        Are you sure you want to delete this book? This action cannot be undone.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleDelete}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            width: "48%",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#e05252"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#ff6b6b"}
        >
          Delete Book
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

export default DeleteBook