import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";


const PrivateRoute = ({ children }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;

    const verifyUser = async () => {
      try {
        await api.get("/api/user/me");
        if (mounted) setStatus("authenticated");
      } catch {
        if (mounted) setStatus("unauthenticated");
      }
    };

    verifyUser();

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
