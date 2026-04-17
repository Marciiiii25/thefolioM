import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import "../App.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const PostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [deletingPost, setDeletingPost] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
        const { data: commentsData } = await API.get(`/comments/${id}`);
        setComments(commentsData);
      } catch (err) {
        setError(err.response?.data?.message || "Post not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    try {
      const { data } = await API.post(`/comments/${id}`, { body: newComment });
      setComments([...comments, data]);
      setNewComment("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post permanently? This cannot be undone."))
      return;

    setDeletingPost(true);
    try {
      await API.delete(`/posts/${post._id}`);
      window.alert("Post deleted successfully!");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete post";
      setError(msg);
    } finally {
      setDeletingPost(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment permanently?")) return;

    setDeletingCommentId(commentId);
    try {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
      window.alert("Comment deleted successfully!");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete comment";
      setError(msg);
    } finally {
      setDeletingCommentId(null);
    }
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div className="plain-section">
          <div className="container">
            <div className="post-skeleton">
              <div className="post-header">
                <div className="skeleton-line skeleton-title"></div>
              </div>
              <div className="skeleton-image"></div>
              <div className="post-content">
                <div className="skeleton-line skeleton-text"></div>
                <div className="skeleton-line" style={{ width: "80%" }}></div>
                <div className="skeleton-line" style={{ width: "60%" }}></div>
              </div>
              <section className="comments-section">
                <h2>Comments</h2>
                <div className="comments-list">
                  <div className="comment-card">
                    <div className="comment-header">
                      <div
                        className="skeleton-line"
                        style={{ height: "20px", width: "150px" }}
                      ></div>
                      <div
                        className="skeleton-line"
                        style={{ height: "14px", width: "80px" }}
                      ></div>
                    </div>
                    <div
                      className="skeleton-line"
                      style={{ height: "16px", width: "90%" }}
                    ></div>
                  </div>
                  <div className="comment-card">
                    <div className="comment-header">
                      <div
                        className="skeleton-line"
                        style={{ height: "20px", width: "150px" }}
                      ></div>
                      <div
                        className="skeleton-line"
                        style={{ height: "14px", width: "80px" }}
                      ></div>
                    </div>
                    <div
                      className="skeleton-line"
                      style={{ height: "16px", width: "90%" }}
                    ></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post)
    return (
      <>
        <Nav />
        <div className="plain-section">
          <div className="container">
            <div className="error-msg">{error || "Post not found"}</div>
          </div>
        </div>
        <Footer />
      </>
    );

  const isOwner =
    user && (post.author._id === user._id || user.role === "admin");

  return (
    <>
      <Nav />
      <div className="plain-section">
        <div className="container">
          <article className="post-article">
            <header className="post-header">
              <div className="post-meta">
                <h1 className="post-title">{post.title}</h1>
                <p>
                  <img
                    className="author-avatar"
                    src={post.author?.avatar || ""}
                    alt={`${post.author?.name || "Author"} avatar`}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  By <strong>{post.author?.name || "Admin"}</strong> on{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </header>

            {post.image && (
              <img
                src={`${process.env.REACT_APP_API_URL?.replace("/api", "")}/uploads/${post.image}`}
                alt={`Featured for ${post.title}`}
                className="post-image"
                loading="lazy"
              />
            )}
            <div className="post-content">
              <div className="post-body">{post.body}</div>
            </div>

            {isOwner && (
              <div className="post-actions">
                <button
                  className="btn-primary"
                  onClick={() => navigate(`/edit-post/${id}`)}
                  aria-label="Edit this post"
                >
                  Edit Post
                </button>
                <button
                  className="btn-primary"
                  onClick={handleDelete}
                  disabled={deletingPost}
                  aria-label="Delete this post"
                >
                  {deletingPost ? "Deleting..." : "Delete Post"}
                </button>
              </div>
            )}
          </article>

          <section className="comments-section">
            <h2>Comments ({comments.length})</h2>
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet.</p>
            ) : (
              <div className="comments-list">
                {comments.map((comment) => (
                  <div key={comment._id} className="comment-card">
                    <div className="comment-header">
                      <img
                        className="comment-avatar"
                        src={comment.author?.avatar || ""}
                        alt={`${comment.author?.name || "Commenter"} avatar`}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <strong>
                          {comment.author?.role === "admin"
                            ? "Admin"
                            : comment.author?.name || "Admin"}
                        </strong>
                        <br />
                        <small className="comment-date">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      {user &&
                        (comment.author?._id === user._id ||
                          user.role === "admin") && (
                          <button
                            className="btn-danger btn-sm"
                            onClick={() => handleDeleteComment(comment._id)}
                            disabled={deletingCommentId === comment._id}
                          >
                            {deletingCommentId === comment._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        )}
                    </div>
                    <p className="comment-body">{comment.body}</p>
                  </div>
                ))}
              </div>
            )}

            <section className="add-comment-section">
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <h3>Add a Comment</h3>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment here..."
                  required
                  disabled={submittingComment}
                  rows={4}
                  className="comment-textarea"
                />
                <button
                  type="submit"
                  disabled={submittingComment || !user}
                  className="btn-primary"
                >
                  {submittingComment ? "Posting..." : "Post Comment"}
                </button>
              </form>
            </section>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostPage;
