import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaUserCog,
  FaTools,
  FaIndustry,
  FaBook,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Services() {
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

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row container mx-auto mt-4 gap-4 md:gap-0">
        {/* Universal Sidebar */}
        <aside className="w-full md:w-64 bg-gray-100 md:border-r p-4 md:p-6 md:h-[calc(100vh-120px)] md:sticky md:top-[120px] flex-shrink-0">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-red-600">
              Our Services
            </h2>
          </div>

          {/* Navigation Menu */}
          {/* UPDATED: Always flex-col (Vertical) for both Mobile and Desktop */}
          {/* Removed overflow-x-auto so no scrollbar appears */}
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
                      : "bg-white md:bg-transparent text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* "Need Help" Section - Hidden on Mobile, Visible on Desktop */}
          <div className="hidden md:block mt-8 md:mt-12 bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">
              Need Help?
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              Our customer service team is available to answer your questions.
            </p>
            <div className="space-y-2 md:space-y-3">
              <a
                href="tel:+917065500903"
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

        {/* Scrollable Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
