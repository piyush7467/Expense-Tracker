import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.warning("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      // const res = await axios.post(
      //   "https://vercel-backend-one-sepia.vercel.app/api/user/login",
      //   {
      //     email: formData.email.toLowerCase().trim(),
      //     password: formData.password,
      //   },
      //   { withCredentials: true }
      // );

      const res = await api.post("/api/user/login", {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });


      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Login successful");
        navigate("/");
      }

      // toast.success(res.data.message || "Login successful");

      // ⏳ IMPORTANT: wait before redirect
      // setTimeout(() => {
      //   navigate("/");
      // }, 300);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">

        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 items-center justify-center p-8">
          <div className="text-white text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">💰</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
            <p className="text-indigo-100">
              Manage your finances securely
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12">
          <div className="max-w-md mx-auto">

            <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Sign in to your account
            </p>

            <form onSubmit={handleLogin} className="space-y-6">

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="peer pt-8 pb-3 px-4 w-full border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                  placeholder=" "
                />
                <label className="absolute top-2 left-4 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="peer pt-8 pb-3 px-4 w-full border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 pr-12"
                  placeholder=" "
                />
                <label className="absolute top-2 left-4 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              {/* Signup Link */}
              <p className="text-center text-gray-600 text-sm">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-indigo-600 font-semibold cursor-pointer"
                >
                  Sign up
                </span>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
