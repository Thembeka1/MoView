import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user info to localStorage (demo-only)
    localStorage.setItem("user", JSON.stringify(formData));
    setMessage("✅ Registration successful!");

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>🎬 Join MoView</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        {message && <p style={styles.success}>{message}</p>}
        
        <p style={styles.linkText}>
          Already have an account? <Link to="/login" style={{ color: '#e50914', textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
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
    background: "linear-gradient(135deg, rgba(229, 9, 20, 0.7), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920')",
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
  linkText: {
    marginTop: "20px",
    textAlign: "center",
    color: "#ccc",
    fontSize: "14px",
  },
};
