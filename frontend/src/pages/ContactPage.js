import { useState, useEffect } from "react";
import "../App.css";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

function ContactPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error on input
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await API.post("/contact", formData);
      setSuccess(
        `Thank you, ${formData.name}! Your message has been sent to admin.`,
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Plain Text Section */}
      <section className="plain-section">
        <h1>Contact & Resources</h1>
        <p
          style={{
            maxWidth: "600px",
            margin: "10px auto 0",
            textAlign: "center",
            color: "#3d230a",
          }}
        >
          Get in touch or explore resources to learn more about my passions in
          sports, music, and creativity.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="content-section">
        <h2>Contact Me</h2>
        {success && (
          <div
            className="alert-success"
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              background: "#d4edda",
              border: "1px solid #c3e6cb",
              borderRadius: "4px",
            }}
          >
            {success}
          </div>
        )}
        {error && (
          <div
            className="alert-error"
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              background: "#f8d7da",
              border: "1px solid #f5c6cb",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Your Message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {/* Resources Section */}
      <section className="content-section">
        <h2>Resources</h2>
        <div className="resources-container">
          <a
            href="https://www.basketball-reference.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <h3>Basketball Reference</h3>
            <p>Comprehensive stats and tutorials for basketball enthusiasts.</p>
          </a>
          <a
            href="https://www.drumeo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <h3>Drumming Online</h3>
            <p>Learn drums online with videos and sheet music.</p>
          </a>
          <a
            href="https://www.allrecipes.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <h3>Creative Cooking Hub</h3>
            <p>Recipes and cooking techniques for creative cooking.</p>
          </a>
        </div>

        <h2 className="map-title">Find Me Here</h2>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0196452186956!2d-122.08424968468126!3d37.422065779825095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7305e3c5b9f%3A0x2dfb5b5eb3e1f9a5!2sGoogleplex!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ContactPage;
