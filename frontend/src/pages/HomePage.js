import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import Footer from "../components/Footer";
import API from "../api/axios";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get("/posts");
        setPosts(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <section className="hero">
        <p style={{ textTransform: "uppercase", letterSpacing: "2px" }}>
          Welcome to My World
        </p>
        <h1>The Life & Passions of Marcenita!</h1>
        <p>
          This website showcase my hobbies that help me relax, grow, and express
          myself. From sports and music to cooking and entertainment, these
          activities reflect who I am as a student.
        </p>
        <Link to="/colorblast" style={{ textDecoration: "none" }}>
          <div
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--navy)",
              padding: "15px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "20px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            🏀 Wanna play a game? Click me! 🏀
          </div>
        </Link>
      </section>

      <section className="hobby-section">
        <Link to="#basketball" className="hobby-card">
          <div className="status-tag">Athlete</div>
          <h3>Basketball</h3>
          <p>Teamwork and strategy on the court.</p>
        </Link>

        <Link to="#drums" className="hobby-card">
          <div className="status-tag">Music</div>
          <h3>Drums</h3>
          <p>Providing rhythm for our church services.</p>
        </Link>

        <Link to="#cooking" className="hobby-card">
          <div className="status-tag">Cooking</div>
          <h3>Cooking</h3>
          <p>Experimenting with traditional recipes.</p>
        </Link>

        <Link to="#runningman" className="hobby-card">
          <div className="status-tag">Entertainment</div>
          <h3>Running Man</h3>
          <p>Relaxing with my favorite variety show.</p>
        </Link>
      </section>

      {/* Modals with image left, description right */}
      <section id="basketball" className="modal">
        <Link to="/home" className="close">
          &times;
        </Link>
        <div className="modal-content">
          <img src="/basketball.jpeg" alt="Basketball" />
          <div className="modal-description">
            <h2>Basketball</h2>
            <p>
              I love playing basketball; teamwork and strategy are key on the
              court.
            </p>
          </div>
        </div>
      </section>

      <section id="drums" className="modal">
        <Link to="/home" className="close">
          &times;
        </Link>
        <div className="modal-content">
          <img src="/drums.jpeg" alt="Drums" />
          <div className="modal-description">
            <h2>Drums</h2>
            <p>
              Playing drums gives me rhythm and joy, especially in church
              services.
            </p>
          </div>
        </div>
      </section>

      <section id="cooking" className="modal">
        <Link to="/home" className="close">
          &times;
        </Link>
        <div className="modal-content">
          <img src="/cooking1.jpeg" alt="Cooking" />
          <div className="modal-description">
            <h2>Cooking</h2>
            <p>
              I enjoy cooking creatively, experimenting with recipes and
              flavors.
            </p>
          </div>
        </div>
      </section>

      <section id="runningman" className="modal">
        <Link to="/home" className="close">
          &times;
        </Link>
        <div className="modal-content">
          <img src="/runningman.jpeg" alt="Running Man" />
          <div className="modal-description">
            <h2>Running Man</h2>
            <p>Relaxing with my favorite variety show helps me unwind.</p>
          </div>
        </div>
      </section>

      <main className="container">
        <h2>Key Highlights</h2>
        <ul>
          <li>Learn about my favorite hobbies and interests</li>
          <li>See how basketball, music, and cooking help me grow</li>
          <li>Discover why I enjoy watching Running Man Korea</li>
          <li>Explore my personal hobby journey</li>
          <li>Find ways to connect and sign up for updates</li>
        </ul>
      </main>

      <section className="container">
        <h2>Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="error-msg">{error}</p>
        ) : posts.length === 0 ? (
          <p>No posts available yet.</p>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => {
              const navigateToPost = () => navigate(`/posts/${post._id}`);
              const canEdit =
                user &&
                (user.role === "admin" || post.author?._id === user._id);
              const isAdminOwned = post.author?.role === "admin";

              return (
                <div
                  key={post._id}
                  className="post-card-wrapper"
                  onClick={navigateToPost}
                  style={{ cursor: "pointer" }}
                >
                  <article className="post-card">
                    {post.image && (
                      <img
                        src={`http://localhost:5000/uploads/${post.image}`}
                        alt={post.title}
                        className="post-card-image"
                      />
                    )}
                    <h3>{post.title}</h3>
                    <p>
                      {post.body.slice(0, 160)}
                      {post.body.length > 160 ? "..." : ""}
                    </p>
                    <div className="post-footer">
                      <small>
                        By {post.author?.name || "Unknown"} |{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </small>
                      {canEdit && (
                        <Link
                          to={`/edit-post/${post._id}`}
                          className="btn-edit"
                          onClick={(e) => e.stopPropagation()}
                          style={{ textDecoration: "none" }}
                        >
                          Edit Post
                        </Link>
                      )}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
