import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Home({ books, setSelectedBook, isLoggedIn }) {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, rgba(136, 216, 247, 1), rgba(94, 183, 234, 1))"
    return () => {
      document.body.style.background = ""
    }
  }, [])

  if (!isLoggedIn) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Login required</h2>
  }

  return (
    <div style={{ maxWidth: "650px", margin: "60px auto", fontFamily: "'Roboto', sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ color: "#fff", fontSize: "32px", margin: 0, textShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
          Book List
        </h2>
        <button
          onClick={() => navigate("/create")}
          style={{
            padding: "10px 20px",
            fontSize: "15px",
            backgroundColor: "#fff",
            color: "#4a98d2",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "background-color 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#e8f4ff"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#fff"}
        >
          + Add Book
        </button>
      </div>

      {/* Empty state */}
      {books.length === 0 && (
        <div style={{
          textAlign: "center",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          color: "#999"
        }}>
          No books found. Add one!
        </div>
      )}

      {/* Book list */}
      {books.map((book) => (
        <div
          key={book.id}
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div>
            <strong style={{ fontSize: "16px", color: "#333" }}>{book.title}</strong>
            <span style={{ color: "#777", fontSize: "15px" }}> — {book.author}</span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => { setSelectedBook(book); navigate("/update") }}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                backgroundColor: "#6ab7ff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#4a98d2"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#6ab7ff"}
            >
              Edit
            </button>

            <button
              onClick={() => { setSelectedBook(book); navigate("/delete") }}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                backgroundColor: "#ff6b6b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#e05252"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#ff6b6b"}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home