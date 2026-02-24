import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Login({ setIsLoggedIn, isLoggedIn }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, rgba(136, 216, 247, 1), rgba(94, 183, 234, 1))"
    return () => {
      document.body.style.background = ""
    }
  }, [])

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        setIsLoggedIn(true)
        navigate("/")
      } else {
        const data = await response.json()
        setError(data.detail || "Invalid email or password. Please try again.")
      }
    } catch (error) {
      setError("Could not connect to server. Please try again.")
    }
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
      fontFamily: "'Roboto', sans-serif"
    }}>
      <h2 style={{ color: "#333", fontSize: "28px", marginBottom: "20px" }}>Login</h2>

      {/* Show "Login required" banner if user is not logged in */}
      {!isLoggedIn && (
        <div style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "8px",
          padding: "10px",
          marginBottom: "15px",
          fontSize: "14px",
          color: "#856404"
        }}>
          🔒 Login required 
        </div>
      )}

      <div style={{ marginBottom: "15px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <button
        onClick={handleLogin}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          backgroundColor: "#6ab0ff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          width: "100%",
          cursor: "pointer",
          transition: "background-color 0.3s ease"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#4a98d2"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#6ab7ff"}
      >
        Login
      </button>
    </div>
  )
}

export default Login