import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  if (!user) return <Navigate to="/login" replace />;

  if (pathname === "/") {
    return <Navigate to={user.isAdmin ? "/admin-dashboard" : "/profile"} replace />;
  }

  if (pathname === "/admin-dashboard" && !user.isAdmin) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;