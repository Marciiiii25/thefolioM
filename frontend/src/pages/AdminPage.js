import { useState, useEffect } from "react";
import API from "../api/axios";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../App.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState("users");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, postsRes, messagesRes] = await Promise.all([
          API.get("/admin/users"),
          API.get("/admin/posts"),
          API.get("/admin/messages"),
        ]);
        setUsers(usersRes.data);
        setPosts(postsRes.data);
        setMessages(messagesRes.data);
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = async (id) => {
    const { data } = await API.put(`/admin/users/${id}/status`);
    setUsers(users.map((u) => (u._id === id ? data.user : u)));
  };

  const removePost = async (id) => {
    await API.put(`/admin/posts/${id}/remove`);
    setPosts(
      posts.map((p) => (p._id === id ? { ...p, status: "removed" } : p)),
    );
  };

  return (
    <>
      <Nav />
      <div className="plain-section">
        <h1>Admin Dashboard</h1>
        <p>Manage users, posts, and contact messages.</p>
      </div>
      <div className="container">
        <div className="admin-tabs">
          <button
            onClick={() => setTab("users")}
            className={tab === "users" ? "active" : ""}
          >
            Members ({users.length})
          </button>
          <button
            onClick={() => setTab("posts")}
            className={tab === "posts" ? "active" : ""}
          >
            All Posts ({posts.length})
          </button>
          <button
            onClick={() => setTab("messages")}
            className={tab === "messages" ? "active" : ""}
          >
            Messages ({messages.length})
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {tab === "users" && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`status-badge ${u.status}`}>
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleStatus(u._id)}
                          className={
                            u.status === "active" ? "btn-danger" : "btn-success"
                          }
                        >
                          {u.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "posts" && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p._id}>
                      <td>{p.title}</td>
                      <td>{p.author?.name}</td>
                      <td>
                        <span className={`status-badge ${p.status}`}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        {p.status === "published" && (
                          <button
                            className="btn-danger"
                            onClick={() => removePost(p._id)}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "messages" && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        style={{ textAlign: "center", padding: "2rem" }}
                      >
                        No messages yet.
                      </td>
                    </tr>
                  ) : (
                    messages.map((msg) => (
                      <tr key={msg._id}>
                        <td>{msg.name || msg.sender?.name || "Unknown"}</td>
                        <td>{msg.email || msg.sender?.email || "N/A"}</td>
                        <td
                          style={{ maxWidth: "300px", wordWrap: "break-word" }}
                        >
                          {msg.message.substring(0, 100)}
                          {msg.message.length > 100 ? "..." : ""}
                        </td>
                        <td>{new Date(msg.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
