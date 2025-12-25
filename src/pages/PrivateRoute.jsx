import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          "https://vercel-backend-one-sepia.vercel.app/api/user/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // While checking auth, don't render anything
  if (isAuthenticated === null) {
    return null; // or loading spinner
  }

  // Not authenticated → redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → allow access
  return children;
};

export default PrivateRoute;
