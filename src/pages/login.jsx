import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
      <h2 style={styles.title}>Login</h2>
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
      
      <p style={{ marginTop: '15px' }}>
        Don't have an account? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Register here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  success: {
    color: "green",
    marginTop: "10px",
  },
  error: {
    color: "crimson",
    marginTop: "10px",
  },
};