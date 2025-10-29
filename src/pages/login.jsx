import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = localStorage.getItem("user");
    if (!stored) {
      setMessage("❌ No registered user found. Please register first.");
      return;
    }

    const user = JSON.parse(stored);
    if (
      user.email === credentials.email.trim() &&
      user.password === credentials.password
    ) {
      setMessage(`✅ Welcome, ${user.name || "user"}!`);
      // Save login state
      localStorage.setItem('isLoggedIn', 'true');
      // Navigate to Movies page after 1 second
      setTimeout(() => {
        navigate('/Movies');
      }, 1000);
    } else {
      setMessage("❌ Invalid email or password.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>🎬 Login to MoView</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {message && <p style={message.startsWith("✅") ? styles.success : styles.error}>{message}</p>}
        
        <p style={styles.linkText}>
          Don't have an account? <Link to="/register" style={{ color: '#e50914', textDecoration: 'none', fontWeight: 'bold' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(229, 9, 20, 0.7)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: "20px",
  },
  formContainer: {
    maxWidth: "450px",
    width: "100%",
    padding: "40px 35px",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(229, 9, 20, 0.4)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(229, 9, 20, 0.3)",
  },
  title: {
    marginBottom: "30px",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "15px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    outline: "none",
    transition: "all 0.3s ease",
  },
  button: {
    padding: "15px",
    backgroundColor: "#e50914",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(229, 9, 20, 0.4)",
    marginTop: "10px",
  },
  success: {
    color: "#4CAF50",
    marginTop: "15px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "500",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    padding: "10px",
    borderRadius: "5px",
  },
  error: {
    color: "#ff6b6b",
    marginTop: "15px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "500",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    padding: "10px",
    borderRadius: "5px",
  },
  linkText: {
    marginTop: "20px",
    textAlign: "center",
    color: "#ccc",
    fontSize: "14px",
  },
};