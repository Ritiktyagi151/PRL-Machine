import React, { useState } from "react";
import {
  LayoutDashboard,
  Navigation,
  FileText,
  ShoppingBag,
  Phone,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Navbar", icon: Navigation, path: "/admin/navbar" },
    { label: "Blogs", icon: FileText, path: "/admin/blog" },
    {
      label: "Products",
      icon: ShoppingBag,
      subItems: [
        {
          label: "uPVC Window Machine",
          path: "products/upvc",
        },
        { label: "Aluminum Window Machine", path: "products/aluminum" },
      ],
    },
    { label: "Contact Us", icon: Phone, path: "/admin/contact" },
    { label: "Footer", icon: Menu, path: "/admin/footer" },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-purple-900 shadow-lg transition-all duration-300 flex-shrink-0 relative z-10`}
    >
      {/* Header */}
      <div className="p-4 border-b border-purple-700">
        <div className="flex items-center space-x-3">
          <div className="bg-red-500 p-2 rounded-lg shadow-md">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold text-white">PRL Machine</h1>
              <p className="text-sm text-purple-200">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <div key={index}>
              {/* If no subItems, make it a NavLink */}
              {!hasSubItems ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex items-center px-4 py-3 text-left transition-all duration-300 group ${
                      isActive
                        ? "bg-red-500 text-white font-medium shadow-md"
                        : "text-purple-200 hover:bg-purple-800 hover:text-white"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </NavLink>
              ) : (
                <>
                  {/* Parent (Dropdown) */}
                  <div
                    className={`w-full flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-300 group ${
                      openDropdown === item.label
                        ? "bg-purple-800 text-white"
                        : "text-purple-200 hover:bg-purple-800 hover:text-white"
                    }`}
                    onClick={() => toggleDropdown(item.label)}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5" />
                      {sidebarOpen && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </div>
                    {sidebarOpen &&
                      (openDropdown === item.label ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      ))}
                  </div>

                  {/* Sub Menu */}
                  {openDropdown === item.label && sidebarOpen && (
                    <div className="ml-8">
                      {item.subItems.map((sub, i) => (
                        <NavLink
                          key={i}
                          to={sub.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm rounded-md mt-1 transition-all duration-300 ${
                              isActive
                                ? "bg-red-400 text-white"
                                : "text-purple-200 hover:bg-purple-700 hover:text-white"
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sidebar footer */}
      {/* {sidebarOpen && (
        <div className="absolute bottom-0 w-full p-4 border-t border-purple-700">
          <p className="text-xs text-purple-300 text-center">
            v2.1.0 • © {new Date().getFullYear()}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default Sidebar;
