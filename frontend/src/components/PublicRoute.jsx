import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuthContext";

export default function PublicRoute({ children }) {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) return null;

  const allowedForLoggedIn = window.location.pathname === "/update-password";

  if (user && !allowedForLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
