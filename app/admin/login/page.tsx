"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.replace("/admin");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__header">
          <div className="admin-login__logo">VSC</div>
          <h1 className="admin-login__title">Welcome Back</h1>
          <p className="admin-login__subtitle">
            Sign in to the VSC admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login__form">
          {error && <div className="admin-login__error">{error}</div>}

          <div className="admin-field">
            <label className="admin-field__label" htmlFor="login-email">
              <Mail size={14} style={{ display: "inline", marginRight: "0.375rem", verticalAlign: "middle" }} />
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="admin-field__input"
              placeholder="admin@nitp.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="admin-field">
            <label className="admin-field__label" htmlFor="login-password">
              <Lock size={14} style={{ display: "inline", marginRight: "0.375rem", verticalAlign: "middle" }} />
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="admin-field__input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn--primary admin-btn--full"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="admin-spinner" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
