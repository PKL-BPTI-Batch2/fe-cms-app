import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Kalau ga ada token, lempar ke login
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // Kalau ada token, render halaman anak
  return children;
}

export default ProtectedRoute;
