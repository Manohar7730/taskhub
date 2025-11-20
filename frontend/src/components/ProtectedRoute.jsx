import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuthContext";

export default function ProtectedRoute() {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
