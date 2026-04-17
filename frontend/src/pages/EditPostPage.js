//frontend/src/pages/EditPostPage.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import "../App.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const EditPostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        const isOwner = data.author?._id === user?._id;
        const isAdmin = user?.role === "admin";

        if (!isOwner && !isAdmin) {
          throw new Error("You can only edit your own posts");
        }

        setPost(data);
        setTitle(data.title);
        setBody(data.body);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchPost();
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("body", body);
    if (image) fd.append("image", image);

    try {
      await API.put(`/posts/${id}`, fd);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;

  return (
    <>
      <Nav />
      <div className="plain-section">
        <div className="container">
          <h1 className="map-title">Edit Post</h1>

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
            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="styled-form">
                <label htmlFor="title">Post Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter your post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={saving}
                />

                <label htmlFor="body">Post Content</label>
                <textarea
                  id="body"
                  placeholder="Write your post here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={12}
                  required
                  disabled={saving}
                  style={{
                    resize: "vertical",
                    minHeight: "200px",
                    fontFamily: "inherit",
                  }}
                />

                <div>
                  <label>Current Image:</label>
                  <img
                    src={`${process.env.REACT_APP_API_URL?.replace("/api", "")}/uploads/${post.image}`}
                    alt="Current"
                    className="post-image-preview"
                    style={{
                      width: "200px",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#666",
                      marginTop: "5px",
                    }}
                  >
                    Upload new image to replace (optional)
                  </p>
                </div>

                <div>
                  <label htmlFor="image">
                    Upload New Cover Image (Optional)
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    disabled={saving}
                    style={{ marginTop: "5px" }}
                  />
                </div>

                <button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Update Post"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditPostPage;
