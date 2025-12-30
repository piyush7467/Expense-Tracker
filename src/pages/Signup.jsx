import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") checkPasswordStrength(value);
  };

  const checkPasswordStrength = (password) => {
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    const medium = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

    if (strong.test(password)) setPasswordStrength("strong");
    else if (medium.test(password)) setPasswordStrength("medium");
    else if (password.length) setPasswordStrength("weak");
    else setPasswordStrength("");
  };

  const strengthColor = {
    strong: "bg-green-500",
    medium: "bg-yellow-500",
    weak: "bg-red-500",
  }[passwordStrength] || "bg-gray-300 dark:bg-gray-600";

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        "https://vercel-backend-one-sepia.vercel.app/api/user/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4
      bg-gradient-to-br from-blue-50 to-indigo-100
      dark:from-slate-900 dark:to-slate-800"
    >
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl
        bg-white dark:bg-slate-900"
      >
        {/* Left */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 items-center justify-center p-8">
          <div className="text-white text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              🚀
            </div>
            <h1 className="text-3xl font-bold mb-4">Join Expense Tracker</h1>
            <p className="text-green-100">Start managing your finances smarter</p>
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white dark:bg-slate-900">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Join thousands managing finances better
          </p>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name */}
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* Email */}
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Password */}
            <div>
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                toggle={() => setShowPassword(!showPassword)}
              />

              {formData.password && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${strengthColor}
                        ${passwordStrength === "strong" ? "w-full" :
                          passwordStrength === "medium" ? "w-2/3" :
                          passwordStrength === "weak" ? "w-1/3" : "w-0"}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold text-white
                bg-gradient-to-r from-green-600 to-emerald-600
                hover:from-green-700 hover:to-emerald-700
                disabled:opacity-50 transition"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-green-600 dark:text-green-400 font-semibold cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

/* Reusable Input */
const Input = ({ label, toggle, ...props }) => (
  <div className="relative">
    <input
      {...props}
      required
      placeholder=" "
      className="peer pt-8 pb-3 px-4 w-full rounded-lg border
        bg-gray-50 dark:bg-slate-800
        text-gray-900 dark:text-white
        border-gray-300 dark:border-slate-700
        focus:ring-2 focus:ring-green-500 outline-none"
    />
    <label className="absolute top-2 left-4 text-sm
      text-gray-500 dark:text-gray-400
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
      peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600"
    >
      {label}
    </label>

    {toggle && (
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      >
        👁️
      </button>
    )}
  </div>
);

export default Signup;
