import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    API.get("/me") // endpoint cek user di server
      .then(() => {
        setIsAuth(true);
        setChecking(false);
      })
      .catch(() => {
        setIsAuth(false);
        setChecking(false);
      });
  }, []);

  if (checking) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/auth" replace />;
  return children;
}
