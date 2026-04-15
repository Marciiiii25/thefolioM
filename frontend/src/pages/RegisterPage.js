import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios.js";
import "../App.css";
import Footer from "../components/Footer";

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const fieldName = id || name;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));

    // Real-time validation
    if (fieldName === "fullname") {
      const nameRegex = /^[A-Za-z\\s]+$/;
      if (!nameRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          fullname: "Full Name should only contain letters and spaces.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, fullname: "" }));
      }
    }

    if (fieldName === "password") {
      if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }

    if (fieldName === "confirm_password") {
      if (value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirm: "Passwords do not match.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirm: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setLoading(true);

    // Final validation
    if (formData.password !== formData.confirm_password) {
      setErrors((prev) => ({
        ...prev,
        confirm: "Passwords do not match.",
      }));
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters.",
      }));
      setLoading(false);
      return;
    }

    if (!formData.agree) {
      setSubmitError("Please agree to terms and conditions");
      setLoading(false);
      return;
    }

    try {
      await API.post("/auth/register", {
        fullname: formData.fullname.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      // Clear any existing token
      localStorage.removeItem("token");

      // Registration successful - redirect to login
      setSubmitError("Registration successful! Please log in to continue.");
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Registration failed";
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Plain Text Section */}
      <section className="plain-section">
        <h1>Register for Updates</h1>
        <p>
          Sign up to receive updates about my projects, achievements, and
          creative journey.
        </p>
      </section>

      {/* Sign-Up Form Card */}
      <section className="content-section">
        <h2>Sign-Up Form</h2>

        <div className="form-card">
          <div className="form-wrapper">
            {/* Form */}
            <form className="styled-form" onSubmit={handleSubmit}>
              {submitError && (
                <div
                  style={{
                    background: "rgba(255,0,0,0.1)",
                    border: "1px solid #ff4444",
                    color: "#cc0000",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  {submitError}
                </div>
              )}

              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                id="fullname"
                placeholder="Your Name"
                required
                value={formData.fullname}
                onChange={handleChange}
              />
              {errors.fullname && (
                <span
                  style={{ color: "red", display: "block", fontSize: "0.9rem" }}
                >
                  {errors.fullname}
                </span>
              )}

              <label htmlFor="username">Preferred Username:</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Password (min 8 chars)"
                required
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span
                  style={{ color: "red", display: "block", fontSize: "0.9rem" }}
                >
                  {errors.password}
                </span>
              )}

              <label htmlFor="confirm_password">Confirm Password:</label>
              <input
                type="password"
                id="confirm_password"
                placeholder="Confirm Password"
                required
                value={formData.confirm_password}
                onChange={handleChange}
              />
              {errors.confirm && (
                <span
                  style={{ color: "red", display: "block", fontSize: "0.9rem" }}
                >
                  {errors.confirm}
                </span>
              )}

              <label>
                <input
                  type="checkbox"
                  id="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                I agree to terms and conditions
              </label>

              <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </form>
          </div>
          <div className="form-image">
            <img src="/decorativeimage.png" alt="Decorative Register" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default RegisterPage;
