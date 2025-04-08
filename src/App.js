import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

import './styles/App.css';
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import NotFoundPage from "./components/NotFoundPage";
import AdminPage from "./components/AdminPage/AdminPage";
import UserPage from "./components/UserPage";
import NavBar from "./components/NavBar";
import ContactPage from "./components/ContactPage";
import AboutusPage from "./components/AboutusPage";
import CategoriesPage from "./components/CategoriesPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation(); // Pour savoir sur quelle page on est

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const isAdminPage = location.pathname === "/admin";

  return (
    <div className={isAdminPage ? "admin-background" : "global-background"}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route path="user/:userId" element={<UserPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutusPage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
