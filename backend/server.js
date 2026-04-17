//backend/server.js
require("dotenv").config(); // Load .env variables FIRST
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

//Importroutes(youwillcreatethese files in the next steps)
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const adminRoutes = require("./routes/admin.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();
connectDB(); //ConnecttoMongoDB

//──Middleware─────────────────────────────────────────────────
//AllowReact(port3000)tocall this server
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "thefolio-m-yumd.vercel.app",
      "thefolio-m-yumd-1s4x7mtae-marcenita-aquinos-projects.vercel.app",
      "https://thefolio-m-yumd-9d7khmaoh-marcenita-aquinos-projects.vercel.app",
    ],
    credentials: true,
  }),
);

//ParseincomingJSONrequestbodies
app.use(express.json());

//Serveuploadedimagefilesaspublic URLs
//e.g.http://localhost:5000/uploads/my-image.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//──Routes────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// Serve React app build files from frontend/build
const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(frontendBuildPath));
app.get("/*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api") || req.originalUrl.startsWith("/uploads")) {
    return next();
  }
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// ── Global Error Handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    message:
      err.message === "next is not a function"
        ? "Registration failed due to validation error. Please check your input."
        : "Something went wrong!",
  });
});

const seedAdminIfNeeded = async () => {
  try {
    const User = require("./models/User");
    const adminEmail = process.env.ADMIN_EMAIL || "admin@thefolio.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      console.log("🌱 No admin found. Auto-seeding admin account...");
      const { execSync } = require("child_process");
      execSync("npm run seed", { stdio: "inherit", cwd: __dirname });
      console.log("✅ Admin seeded successfully!");
    } else {
      console.log("✅ Admin account already exists.");
    }
  } catch (error) {
    console.warn("⚠️ Auto-seed skipped:", error.message);
  }
};

// Wait for DB connection, seed admin, start server
const startServer = async () => {
  await new Promise((resolve) => {
    const checkDB = setInterval(() => {
      if (mongoose.connection.readyState === 1) {
        // connected
        clearInterval(checkDB);
        resolve();
      }
    }, 500);
  });
  await seedAdminIfNeeded();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};
startServer();

module.exports = app; // for testing
