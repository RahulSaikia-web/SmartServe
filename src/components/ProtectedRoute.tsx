// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust based on your auth setup
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectTo?: string; // Optional prop to control redirect behavior
}

const ProtectedRoute = ({ children, redirectTo }: ProtectedRouteProps) => {
  const auth = useContext(AuthContext); // Replace with your auth mechanism

  // If not authenticated, redirect to login
  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  // If redirectTo is provided and matches user role, redirect
  if (redirectTo) {
    if (auth.user.isAdmin && redirectTo === "/admin-dashboard") {
      return <Navigate to="/admin-dashboard" replace />;
    }
    if (!auth.user.isAdmin && redirectTo === "/profile") {
      return <Navigate to="/profile" replace />;
    }
  }

  // Render children for protected routes
  return children;
};

export default ProtectedRoute;