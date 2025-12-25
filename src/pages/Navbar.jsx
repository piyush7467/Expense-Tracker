import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔐 Check auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://vercel-backend-one-sepia.vercel.app/api/user/me",
          { withCredentials: true }
        );

        if (res.data?.user) {
          setIsLoggedIn(true);
          setUser(res.data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://vercel-backend-one-sepia.vercel.app/api/user/logout",
        {},
        { withCredentials: true }
      );

      setIsLoggedIn(false);
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const isActiveRoute = (path) => location.pathname === path;

  if (loading) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">💰</span>
            </div>
            <span className="font-bold text-xl text-blue-600">
              ExpenseTracker
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg ${
                    isActiveRoute("/")
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  Dashboard
                </Link>

                <div className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs">▼</span>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-4 border-b">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-3 border-b pb-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg ${
                    isActiveRoute("/")
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 bg-green-600 text-white rounded-lg text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
