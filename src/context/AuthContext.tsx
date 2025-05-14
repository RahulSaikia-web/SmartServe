// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the user object
interface User {
  id: string;
  username: string;
  isAdmin: boolean; // Indicates if the user is an admin
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void; // Function to log in a user
  logout: () => void; // Function to log out a user
}

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Optional: Load user from localStorage or API on mount
  useEffect(() => {
    // Example: Check localStorage or make an API call to verify auth status
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (userData: User) => {
    setUser(userData);
    // Optional: Save user to localStorage or make API call
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    // Optional: Clear localStorage or make API call
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};