import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuthContext";

export default function PublicRoute() {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) return null;

  const allowedForLoggedIn = window.location.pathname === "/update-password";

  if (user && !allowedForLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
