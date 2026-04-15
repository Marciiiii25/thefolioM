import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Nav from "./components/Nav.js";
import SplashPage from "./pages/SplashPage.js";
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage.js";
import ContactPage from "./pages/ContactPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import AdminPage from "./pages/AdminPage";
import ColorblastPage from "./pages/ColorblastPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route
          path="/home"
          element={
            <Nav>
              <HomePage />
            </Nav>
          }
        />
        <Route
          path="/about"
          element={
            <Nav>
              <AboutPage />
            </Nav>
          }
        />
        <Route
          path="/contact"
          element={
            <Nav>
              <ContactPage />
            </Nav>
          }
        />
        <Route
          path="/register"
          element={
            <Nav>
              <RegisterPage />
            </Nav>
          }
        />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/colorblast" element={<ColorblastPage />} />
        {/*Protectedroutes—mustbe logged in */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-post/:id"
          element={
            <ProtectedRoute>
              <EditPostPage />
            </ProtectedRoute>
          }
        />
        {/*Adminonly—redirectsmembers/guests to home */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
