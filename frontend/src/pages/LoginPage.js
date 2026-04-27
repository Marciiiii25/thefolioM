import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(identifier.trim(), password);
      if (!user || !user.role) {
        setError("Unexpected login response. Please try again.");
        return;
      }
      // Role-based redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "member") {
        navigate("/profile");
      } else {
        navigate("/home"); // fallback for any other role
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="plain-section">
        <div className="container">
          <h1 className="map-title">🐱 Welcome Back to Meow World 🐱</h1>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.1rem",
              marginBottom: "20px",
            }}
          >
            Login to join our purrfect cat community!
          </p>

          {error && (
            <div
              className="form-card"
              style={{
                maxWidth: "500px",
                margin: "20px auto",
                background: "rgba(255,0,0,0.1)",
                border: "1px solid #ff4444",
              }}
            >
              <p
                style={{
                  color: "#cc0000",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            </div>
          )}

          <div className="form-card">
            {/* Left: Form */}
            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="styled-form">
                <label htmlFor="identifier">Email or Username</label>
                <input
                  id="identifier"
                  type="text"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  disabled={loading}
                />

                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />

                <button type="submit" disabled={loading}>
                  {loading ? "Meowing in..." : "🐾 Login & Purr 🐾"}
                </button>
              </form>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "1.1rem",
                }}
              >
                New to our cat paradise?{" "}
                <Link
                  to="/register"
                  style={{ color: "var(--cat-orange)", fontWeight: "bold" }}
                >
                  Join the purr-ty!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
