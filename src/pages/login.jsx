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
          Don't have an account? <Link to="/register" style={{ color: '#000000', textDecoration: 'none', fontWeight: 'bold' }}>Register here</Link>
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
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(26, 0, 0, 0.8) 25%, rgba(51, 0, 0, 0.75) 50%, rgba(26, 0, 0, 0.8) 75%, rgba(0, 0, 0, 0.85) 100%), url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920')",
    backgroundSize: "400% 400%, cover",
    backgroundPosition: "center, center",
    backgroundAttachment: "fixed, fixed",
    animation: "gradient 15s ease infinite",
    padding: "20px",
  },
  formContainer: {
    maxWidth: "450px",
    width: "100%",
    padding: "40px 35px",
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(229, 9, 20, 0.6), 0 0 100px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(20px)",
    border: "3px solid transparent",
    backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #e50914 0%, #000000 50%, #e50914 100%)",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
  },
  title: {
    marginBottom: "30px",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "15px 20px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "2px solid #e0e0e0",
    backgroundColor: "#f8f9fa",
    color: "#333",
    outline: "none",
    transition: "all 0.3s ease",
    fontWeight: "500",
  },
  button: {
    padding: "15px",
    background: "linear-gradient(135deg, #e50914 0%, #8B0000 100%)",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 20px rgba(229, 9, 20, 0.5)",
    marginTop: "10px",
  },
  success: {
    color: "#10b981",
    marginTop: "15px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#d1fae5",
    padding: "12px",
    borderRadius: "10px",
    border: "2px solid #10b981",
  },
  error: {
    color: "#ef4444",
    marginTop: "15px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#fee2e2",
    padding: "12px",
    borderRadius: "10px",
    border: "2px solid #ef4444",
  },
  linkText: {
    marginTop: "20px",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
    fontWeight: "500",
  },
};