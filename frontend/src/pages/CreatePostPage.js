import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../App.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("body", body);
    if (image) fd.append("image", image);
    try {
      await API.post("/posts", fd);
      setTitle("");
      setBody("");
      setImage(null);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to publish post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="plain-section">
        <div className="container">
          <h1 className="map-title">Create a New Post</h1>

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
                  disabled={loading}
                />

                <label htmlFor="body">Post Content</label>
                <textarea
                  id="body"
                  placeholder="Write your post here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={12}
                  required
                  disabled={loading}
                  style={{
                    resize: "vertical",
                    minHeight: "200px",
                    fontFamily: "inherit",
                  }}
                />

                <div>
                  <label htmlFor="image">Upload Cover Image (Optional)</label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    disabled={loading}
                    style={{ marginTop: "5px" }}
                  />
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? "Publishing..." : "Publish Post"}
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

export default CreatePostPage;
