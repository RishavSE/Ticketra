import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";  


import UserDashboard from "./user/UserDashboard";
import SupportDashboard from "./support/supportdashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false); 
  }, []);

  console.log("📦 App Render | User:", user, "| Token:", token);

  const ProtectedRoute = ({ children, roles }) => {
    if (loading) return null; 
    if (!user || !token) {
      console.warn("No user/token found. Redirecting to /login");
      return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(user.role)) {
      console.warn(`Role '${user.role}' not allowed. Redirecting to /login`);
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLoginSuccess={(u, t) => {
                setUser(u);
                setToken(t);
                localStorage.setItem("user", JSON.stringify(u));
                localStorage.setItem("token", t);
              }}
            />
          }
        />


        <Route path="/register" element={<Register />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute roles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support-dashboard"
          element={
            <ProtectedRoute roles={["agent", "support"]}>
              <SupportDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
