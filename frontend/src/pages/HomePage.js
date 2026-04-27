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
          Welcome to the Meow World
        </p>
        <h1>🐱 All About NATALIE 🐱</h1>
        <p>
          Discover everything about cats - from adorable kitten antics to
          majestic feline behaviors. Join us to explore cat breeds, care tips,
          and heartwarming stories from cat lovers worldwide!
        </p>
        <Link to="/colorblast" style={{ textDecoration: "none" }}>
          <div
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--white)",
              padding: "15px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "20px",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
            }}
          >
            🎮 Try a Purrfect Game! Click me! 🎮
          </div>
        </Link>
      </section>

      <section className="hobby-section">
        <Link to="#cute-kittens" className="hobby-card">
          <div className="status-tag">Adorable</div>
          <h3>🥺 Cute Kittens</h3>
          <p>Playful and mischievous little furballs.</p>
        </Link>

        <Link to="#breeds" className="hobby-card">
          <div className="status-tag">Heritage</div>
          <h3>🏆 Cat Breeds</h3>
          <p>Explore unique cat breeds from around the world.</p>
        </Link>

        <Link to="#care" className="hobby-card">
          <div className="status-tag">Health</div>
          <h3>🏥 Cat Care</h3>
          <p>Tips and tricks for happy, healthy cats.</p>
        </Link>

        <Link to="#funny-cats" className="hobby-card">
          <div className="status-tag">Hilarious</div>
          <h3>😹 Funny Cats</h3>
          <p>Hilarious moments and viral cat antics.</p>
        </Link>
      </section>

      {/* Modals with image left, description right */}
      <section id="cute-kittens" className="modal">
        <Link to="/home" className="close">
          &times;
        </Link>
        <div className="modal-content">
          <img
            src="https://images.unsplash.com/photo-1574158622682-e40c69881006?w=400"
            alt="Cute Kittens"
          />
          <div className="modal-description">
            <h2>🥺 Cute Kittens</h2>
            <p>
              Kittens are bundles of joy! Watch them play, pounce on toys, and
              explore the world around them. Their curiosity and playful nature
              make them absolutely irresistible. From silly zoomies to adorable
              sleeping positions, kittens bring endless entertainment and love
              to any home!
            </p>
          </div>
        </div>
      </section>

      <section id="breeds" className="modal">
        <Link to="/home" className="close">
          &times;
        </Link>
        <div className="modal-content">
          <img
            src="https://images.unsplash.com/photo-1521133573892-e44906baee46?w=400"
            alt="Cat Breeds"
          />
          <div className="modal-description">
            <h2>🏆 Cat Breeds</h2>
            <p>
              From Persian cats with their luxurious long fur to sleek Siamese
              with their striking blue eyes, there's a cat breed for everyone!
              Each breed has unique characteristics, temperaments, and care
              requirements. Discover which breed might be perfect for your
              lifestyle and home!
            </p>
          </div>
        </div>
      </section>

      <section id="care" className="modal">
        <Link to="/home" className="close">
          &times;
        </Link>
        <div className="modal-content">
          <img
            src="https://images.unsplash.com/photo-1611003228941-98852ba62227?w=400"
            alt="Cat Care"
          />
          <div className="modal-description">
            <h2>🏥 Cat Care</h2>
            <p>
              Proper cat care is essential for a long, healthy life. From
              nutrition and grooming to regular vet checkups and vaccination
              schedules, learn everything you need to know to keep your feline
              friend purring happily. Discover the best practices for indoor and
              outdoor cat care!
            </p>
          </div>
        </div>
      </section>

      <section id="funny-cats" className="modal">
        <Link to="/home" className="close">
          &times;
        </Link>
        <div className="modal-content">
          <img
            src="https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=400"
            alt="Funny Cats"
          />
          <div className="modal-description">
            <h2>😹 Funny Cats</h2>
            <p>
              Cats are natural comedians! Whether it's hilariously failing at
              jumping, getting startled by cucumbers, or causing absolute chaos
              around the house, cats provide endless entertainment. Share your
              funniest cat moments and laugh with fellow cat enthusiasts in our
              community!
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <h2>📝 Latest Cat Adventures</h2>
        {loading && <p>Loading posts...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card-wrapper">
              <div className="post-card">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-card-image"
                  />
                )}
                <Link to={`/posts/${post._id}`} className="post-link">
                  <h3>{post.title}</h3>
                </Link>
                <p>{post.description}</p>
                <small>
                  By {post.author?.username || "Anonymous"} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </small>
                {user && user.role === "member" && (
                  <div className="post-footer">
                    <Link
                      to={`/edit-post/${post._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button className="btn-edit">✏️ Edit</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
