import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Search,
  User,
  ChevronDown,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      // Optional: API call to backend
      await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Clear localStorage
      localStorage.removeItem("token");

      // Close user menu
      setIsUserMenuOpen(false);

      // Redirect to admin login
      navigate("/admin-login");
    } catch (error) {
      console.error("Error during logout:", error);

      // Fallback logout
      localStorage.removeItem("token");
      setIsUserMenuOpen(false);
      navigate("/admin-login");
    }
  };

  // ✅ Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isUserMenuOpen &&
        !event.target.closest(".user-menu-trigger, .user-menu-dropdown")
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <header
      className={`bg-white  text-gray-800 dark:text-white p-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "border-purple-300  shadow-lg"
          : "border-purple-200  shadow-md"
      }`}
    >
      {/* Left side - Logo */}
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-purple-700 transition-all duration-500 hover:animate-pulse hover:scale-105 transform">
          Admin Dashboard
        </h2>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Dark mode toggle */}
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="relative flex items-center justify-center w-14 h-7 bg-purple-200 dark:bg-purple-800 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 hover:scale-105 transform"
            aria-label="Toggle dark mode"
          >
            <div
              className={`absolute top-0.5 w-6 h-6 bg-red-500 rounded-full transition-all duration-300 flex items-center justify-center transform ${
                isDarkMode ? "translate-x-7" : "translate-x-0.5"
              }`}
            >
              {isDarkMode ? (
                <Moon className="h-4 w-4 text-white transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Sun className="h-4 w-4 text-white transition-transform duration-300 hover:rotate-45" />
              )}
            </div>
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:scale-110">
            <Search className="h-4 w-4 text-purple-500 transition-colors duration-300 group-focus-within:text-red-500" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="group pl-10 pr-4 py-2 border border-purple-300 dark:border-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 hover:shadow-md focus:scale-105 transform"
          />
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            className="user-menu-trigger flex items-center space-x-2 focus:outline-none transition-all duration-200 hover:scale-105 group"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-red-500 to-purple-600 flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:from-purple-600 group-hover:to-red-500 group-hover:shadow-lg group-hover:rotate-6 transform">
              <User className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="hidden md:inline text-purple-700 dark:text-purple-300 font-medium transition-colors duration-300 group-hover:text-red-500">
              Admin User
            </span>
            <ChevronDown
              className={`h-4 w-4 text-purple-700 dark:text-purple-300 transition-all duration-300 ${
                isUserMenuOpen
                  ? "transform rotate-180 text-red-500"
                  : "group-hover:translate-y-0.5"
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-purple-200 dark:border-purple-700 overflow-hidden user-menu-dropdown">
              <div className="animate-scaleIn origin-top-right">
                <Link
                  to="/admin/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition-all duration-200 hover:translate-x-1 transform hover:text-purple-600 dark:hover:text-purple-300"
                >
                  <UserCircle className="h-4 w-4 mr-2 text-purple-600" />
                  Profile
                </Link>
                <Link
                  to="/admin/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition-all duration-200 hover:translate-x-1 transform hover:text-purple-600 dark:hover:text-purple-300"
                >
                  <Settings className="h-4 w-4 mr-2 text-purple-600" />
                  Settings
                </Link>
                <div className="border-t border-purple-200 dark:border-purple-700 my-1"></div>

                {/* ✅ Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-purple-100 dark:hover:bg-purple-900 transition-all duration-200 hover:translate-x-1 transform hover:text-red-700 dark:hover:text-red-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
