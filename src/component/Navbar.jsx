import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { logout as logoutAction } from "../redux/authSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import api from "../api/axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/api/user/logout");
      dispatch(logoutAction());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">💰</span>
            </div>
            <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
              ExpenseTracker
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg transition ${
                    isActiveRoute("/")
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Dashboard
                </Link>

                {/* 🌙 / ☀️ Theme Toggle */}
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="p-3 rounded-xl hover:scale-110 transition-all
                             bg-gray-100 dark:bg-gray-800"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? (
                    <FaMoon className="text-amber-600 text-lg" />
                  ) : (
                    <FaSun className="text-yellow-400 text-lg" />
                  )}
                </button>

                {/* User Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">▼</span>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border
                                  bg-white dark:bg-gray-800
                                  border-gray-200 dark:border-gray-700
                                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
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
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600"
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

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {user ? (
              <>
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg
                             text-gray-700 dark:text-gray-300
                             hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Link>

                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    dispatch(toggleTheme());
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg
                             hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {theme === "light" ? (
                    <>
                      <FaMoon className="text-amber-600" />
                      <span className="text-sm">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <FaSun className="text-yellow-400" />
                      <span className="text-sm">Light Mode</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
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
