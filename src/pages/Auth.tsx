// src/pages/Auth.tsx
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

type Mode = "login" | "signup";

const Auth: React.FC = () => {
  const [mode, setMode] = useState<Mode>("login");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#faf7f2",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px 32px 32px",
          borderRadius: 24,
          boxShadow: "0 18px 45px rgba(0,0,0,0.08)",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 28,
            margin: "0 auto 24px",
            background:
              "linear-gradient(135deg, #ff7a1a 0%, #ff4b1f 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 40,
          }}
        >
          {/* Simple user glyph */}
          <span style={{ fontSize: 40 }}>👤</span>
        </div>

        {/* Heading */}
        <h1
          style={{
            margin: 0,
            marginBottom: 8,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: -0.02,
          }}
        >
          Welcome to Gold BARZ
        </h1>
        <p
          style={{
            margin: 0,
            marginBottom: 32,
            color: "#7b7b7b",
            fontSize: 16,
          }}
        >
          Sign in to access your account
        </p>

        {/* Toggle buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
              backgroundColor: mode === "login" ? "#f97316" : "#fff",
              color: mode === "login" ? "#fff" : "#111827",
              boxShadow:
                mode === "login"
                  ? "0 10px 25px rgba(249,115,22,0.35)"
                  : "0 0 0 1px #e5e7eb",
              transition: "all 0.15s ease-out",
            }}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => setMode("signup")}
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
              backgroundColor: mode === "signup" ? "#f97316" : "#fff",
              color: mode === "signup" ? "#fff" : "#111827",
              border:
                mode === "signup"
                  ? "none"
                  : "1px solid #e5e7eb",
              boxShadow:
                mode === "signup"
                  ? "0 10px 25px rgba(249,115,22,0.35)"
                  : "none",
              transition: "all 0.15s ease-out",
            }}
          >
            Create Account
          </button>
        </div>

        {/* Forms */}
        {mode === "login" ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Auth;
