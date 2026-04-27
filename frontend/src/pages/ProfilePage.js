//frontend/src/pages/ProfilePage.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../App.css";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [pic, setPic] = useState(null);
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState("");

  useEffect(() => {
    // Keep local form values in sync when user info changes
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      setPostsLoading(true);
      setPostsError("");
      try {
        const { data } = await API.get("/posts/my");
        setPosts(data);
      } catch (err) {
        setPostsError(
          err.response?.data?.message || "Failed to fetch your posts.",
        );
      } finally {
        setPostsLoading(false);
      }
    };

    if (user) {
      fetchMyPosts();
    }
  }, [user, msg]);

  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setProfileLoading(true);

    const fd = new FormData();
    fd.append("name", name);
    fd.append("bio", bio);
    if (pic) fd.append("profilePic", pic);

    try {
      const { data } = await API.put("/auth/profile", fd);
      setUser(data);
      setName(data.name || "");
      setBio(data.bio || "");
      setPic(null);
      setMsg("Profile updated successfully!");
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
      setTimeout(() => setError(""), 2000);
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (newPw.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPw !== confirmPw) {
      setError("New password and confirmation do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      await API.put("/auth/change-password", {
        currentPassword: curPw,
        newPassword: newPw,
      });
      setMsg("Password changed successfully!");
      setCurPw("");
      setNewPw("");
      setConfirmPw("");
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error changing password");
      setTimeout(() => setError(""), 2000);
    } finally {
      setPasswordLoading(false);
    }
  };

  const picSrc = user?.profilePic
    ? `${process.env.REACT_APP_API_URL?.replace("/api", "")}/uploads/${user.profilePic}`
    : "/default-avatar.png";

  return (
    <>
      <Nav />
      <div className="plain-section">
        <h1 className="map-title">🐱 Your Cat Lover Profile 🐱</h1>
        <p>Manage your account details and purr-sonalization settings.</p>
      </div>

      <div className="container">
        {/* Profile Picture Section */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <img
            src={picSrc}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid var(--royal)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>

        {/* Messages */}
        {error && (
          <div
            className="form-card"
            style={{
              maxWidth: "600px",
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

        {msg && (
          <div
            className="form-card"
            style={{
              maxWidth: "600px",
              margin: "20px auto",
              background: "rgba(0,255,0,0.1)",
              border: "1px solid #44ff44",
            }}
          >
            <p
              style={{
                color: "#00cc00",
                padding: "15px",
                textAlign: "center",
              }}
            >
              {msg}
            </p>
          </div>
        )}

        {/* Edit Profile Form */}
        <div className="form-card" style={{ marginBottom: "40px" }}>
          <div className="form-wrapper">
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              ✏️ Edit Your Cat Profile
            </h3>
            <form onSubmit={handleProfile} className="styled-form">
              <label htmlFor="name">🏷️ Your Cat Lover Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your display name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={profileLoading}
              />

              <label htmlFor="bio">📝 About You & Your Cats</label>
              <textarea
                id="bio"
                placeholder="Tell us about yourself and your favorite cats..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                disabled={profileLoading}
              />

              <label htmlFor="profilePic">📸 Update Your Photo</label>
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={(e) => setPic(e.target.files[0])}
                disabled={profileLoading}
              />

              <button type="submit" disabled={profileLoading}>
                {profileLoading ? "Saving..." : "🐾 Save Changes 🐾"}
              </button>
            </form>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="form-card">
          <div className="form-wrapper">
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              Change Password
            </h3>
            <form onSubmit={handlePassword} className="styled-form">
              <label htmlFor="curPw">Current Password</label>
              <input
                id="curPw"
                type="password"
                placeholder="Enter current password"
                value={curPw}
                onChange={(e) => setCurPw(e.target.value)}
                required
                disabled={passwordLoading}
              />

              <label htmlFor="newPw">New Password</label>
              <input
                id="newPw"
                type="password"
                placeholder="Enter new password (min 6 chars)"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                required
                minLength={6}
                disabled={passwordLoading}
              />

              <label htmlFor="confirmPw">Confirm New Password</label>
              <input
                id="confirmPw"
                type="password"
                placeholder="Confirm new password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                required
                disabled={passwordLoading}
              />

              <button type="submit" disabled={passwordLoading}>
                {passwordLoading ? "Updating..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>

        {/* My Posts Section */}
        <div className="form-card" style={{ marginTop: "40px" }}>
          <div className="form-wrapper">
            <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
              🐱 My Published Cat Stories
            </h3>
            {postsLoading ? (
              <p>Loading your cat stories...</p>
            ) : postsError ? (
              <p className="error-msg">{postsError}</p>
            ) : posts.length === 0 ? (
              <p>
                No stories yet. Create your first cat story to see it here! 🐾
              </p>
            ) : (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {posts.map((p) => (
                  <li key={p._id} style={{ marginBottom: "14px" }}>
                    <Link
                      to={`/posts/${p._id}`}
                      style={{
                        textDecoration: "none",
                        color: "var(--cat-orange)",
                      }}
                    >
                      <strong>😸 {p.title}</strong>
                    </Link>
                    <p style={{ margin: "4px 0" }}>
                      {p.body.slice(0, 90)}
                      {p.body.length > 90 ? "..." : ""}
                    </p>
                    <small>
                      Shared on {new Date(p.createdAt).toLocaleDateString()}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
