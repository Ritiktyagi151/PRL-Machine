import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaUserCog,
  FaTools,
  FaIndustry,
  FaBook,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Services() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const menu = [
    { name: "Maintenance", path: "maintenance", icon: <FaIndustry /> },
    { name: "Installation", path: "installation", icon: <FaTools /> },
    { name: "Training", path: "training", icon: <FaBook /> },
    {
      name: "Machine Customization",
      path: "machine-customization",
      icon: <FaUserCog />,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Banner Section */}
      {/* banner Section */}

      <div className="mt-[41px] relative">
        {/* Desktop Banner with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
          <img
            src="/assets/banners/services.jpg"
            alt="case study"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Mobile Banner with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="block md:hidden"
        >
          <img
            src="/assets/banners/services-mobile-view.jpg"
            alt="case study mobile"
            className="w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed right-1 top-[120px] z-50 bg-red-600 text-white p-3 rounded-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row container mx-auto mt-4">
        {/* Sidebar - Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-28 inset-0 z-40 bg-black bg-opacity-50">
            <aside className="w-64 bg-gray-100 h-full p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-red-600">Our Services</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {menu.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition
                      ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "text-gray-700 hover:bg-gray-200"
                      }`
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-base mb-2">Need Help?</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Our customer service team is available to answer your
                  questions.
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:+917065500903
"
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition text-sm"
                  >
                    <FaPhone className="text-red-600" />
                    <span>+91 7065500903</span>
                  </a>
                  <a
                    href="mailto:r.k.parida015@gmail.com"
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition text-sm"
                  >
                    <FaEnvelope className="text-red-600" />
                    <span>r.k.parida015@gmail.com</span>
                  </a>
                </div>
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition text-xs mt-3">
                  Contact Support
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-gray-100 border-r p-6 h-[calc(100vh-120px)] sticky top-[120px] ">
          <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4 md:mb-6">
            Our Services
          </h2>
          <nav className="flex flex-col gap-2">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Additional sidebar content */}
          <div className="mt-8 md:mt-12 bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">
              Need Help?
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              Our customer service team is available to answer your questions.
            </p>
            <div className="space-y-2 md:space-y-3">
              <a
                href="tel:+917065500903
"
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition text-xs md:text-sm"
              >
                <FaPhone className="text-red-600" />
                <span>+91 7065500903</span>
              </a>
              <a
                href="mailto:r.k.parida015@gmail.com"
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition text-xs md:text-sm"
              >
                <FaEnvelope className="text-red-600" />
                <span>r.k.parida015@gmail.com</span>
              </a>
            </div>
            <Link to="/contact">
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition text-xs md:text-sm mt-3 md:mt-4">
                Contact Support
              </button>
            </Link>
          </div>
        </aside>

        {/* Scrollable Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
