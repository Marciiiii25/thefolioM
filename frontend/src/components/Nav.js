import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

function Nav({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className={`nav-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="nav-header-wrapper">
        <header className="nav-header">
          <Link to="/home" className="logo">
            <div style={{ fontSize: "32px" }}>🐱</div>
            MEOW WORLD
          </Link>
          <nav>
            <ul className="nav-list">
              <li>
                <Link
                  to="/home"
                  className={`nav-link ${isActive("/home") ? "active" : ""}`}
                >
                  🏠 HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`nav-link ${isActive("/about") ? "active" : ""}`}
                >
                  📚 ABOUT
                </Link>
              </li>
              {(!user || user.role !== "admin") && (
                <li>
                  <Link
                    to="/contact"
                    className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                  >
                    📞 CONTACT
                  </Link>
                </li>
              )}
              {!user && (
                <>
                  <li>
                    <Link
                      to="/register"
                      className={`nav-link ${isActive("/register") ? "active" : ""}`}
                    >
                      ✨ REGISTER
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className={`nav-link ${isActive("/login") ? "active" : ""}`}
                    >
                      🔐 LOG IN
                    </Link>
                  </li>
                </>
              )}
              {user && user.role === "member" && (
                <>
                  <li>
                    <Link
                      to="/create-post"
                      className={`nav-link ${isActive("/create-post") ? "active" : ""}`}
                    >
                      ✍️ SHARE STORY
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className={`nav-link ${isActive("/profile") ? "active" : ""}`}
                    >
                      👤 PROFILE
                    </Link>
                  </li>
                </>
              )}
              {user && user.role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/create-post"
                      className={`nav-link ${isActive("/create-post") ? "active" : ""}`}
                    >
                      ✍️ NEW POST
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className={`nav-link ${isActive("/admin") ? "active" : ""}`}
                    >
                      🔧 ADMIN
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className={`nav-link ${isActive("/profile") ? "active" : ""}`}
                    >
                      👑 ADMIN PROFILE
                    </Link>
                  </li>
                </>
              )}
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="nav-link"
                    style={{
                      background: "none",
                      border: "none",
                      color: "inherit",
                      cursor: "pointer",
                      fontSize: "inherit",
                      fontFamily: "inherit",
                    }}
                  >
                    🚪 LOGOUT
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </header>
      </div>

      <div className="toggle-wrapper">
        <button className="toggle-btn" onClick={toggleMode}>
          <span className="icon sun">☀️</span>
          <span className="icon moon">🌙</span>
        </button>
      </div>

      <main>{children}</main>
    </div>
  );
}

export default Nav;
