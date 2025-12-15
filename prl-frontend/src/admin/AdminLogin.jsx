import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Uses Vite env var VITE_API_BASE_URL if present.
 * If not present, falls back to '' (relative paths, e.g. '/api/users/login').
 *
 * Recommended .env.production -> VITE_API_BASE_URL=https://prlmachine.com
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 👉 Yaha apna ID-PASSWORD set karo
  const ADMIN_EMAIL = "rajesh@gmail.com";
  const ADMIN_PASSWORD = "123456";

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

<<<<<<< HEAD
    try {
      // final URL will be:
      // `${API_BASE}/api/users/login`  if API_BASE set to https://prlmachine.com
      // or `/api/users/login` if API_BASE is ''
      const url = `${API_BASE}/api/users/login`;

      const res = await axios.post(
        url,
        { email, password },
        {
          // If your backend uses cookies/session auth, uncomment:
          // withCredentials: true
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // save token and navigate
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      // better error handling: if server returns message, show it
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Invalid email or password";
      setError(msg);
    } finally {
=======
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("token", "STATIC_ADMIN_TOKEN");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password");
      }
>>>>>>> c75640c8882b46247bdbd72b8607e04ce6850c90
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 animate-gradient-x">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition-all duration-500 hover:scale-105">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Admin Portal
          </h2>
          <p className="text-gray-500 mt-2">
            Access your administration dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200 animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-500 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
