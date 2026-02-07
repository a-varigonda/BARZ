// src/pages/Signup.tsx
import React, { useState } from "react";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        setMessage("Account created! Check your email.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ textAlign: "left", marginTop: 8 }}
    >
      <div style={{ marginBottom: 12 }}>
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            fontSize: 14,
          }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            fontSize: 14,
          }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            fontSize: 14,
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px 16px",
          borderRadius: 999,
          border: "none",
          background:
            "linear-gradient(135deg, #ff7a1a 0%, #ff4b1f 100%)",
          color: "#fff",
          fontWeight: 600,
          fontSize: 15,
          cursor: loading ? "default" : "pointer",
          boxShadow: "0 10px 25px rgba(249,115,22,0.35)",
        }}
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      {message && (
        <p style={{ color: "#16a34a", fontSize: 13, marginTop: 10 }}>
          {message}
        </p>
      )}
      {error && (
        <p style={{ color: "#dc2626", fontSize: 13, marginTop: 10 }}>
          {error}
        </p>
      )}
    </form>
  );
};

export default Signup;
