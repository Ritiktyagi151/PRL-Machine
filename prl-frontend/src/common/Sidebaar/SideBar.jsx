import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const SideButtons = () => {
  const [open, setOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrolled) {
        setScrolled(true);
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div
      // Mobile: Centered vertically (top-1/2). Desktop: top-64
      className="fixed left-0 top-52 md:top-64 -translate-y-1/2 z-[1000]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Arrow Toggle */}
      <button
        onClick={() => setOpen(!open)}
        // Mobile: p-2, Desktop: p-3
        className="bg-gradient-to-r from-red-600 to-red-800 text-white p-2 md:p-3 rounded-r-lg md:rounded-r-xl shadow-lg hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {open ? (
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        ) : (
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        )}
      </button>

      {/* Side Buttons Container */}
      <div
        // Mobile: gap-2, Desktop: gap-3
        className={`flex flex-col gap-2 md:gap-3 mt-2 md:mt-3 transform transition-all duration-500 ${
          open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        {/* Knowledge Button */}
        <button className="group relative bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-2 md:px-6 md:py-4 rounded-r-lg md:rounded-r-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Mobile: text-xs, Desktop: text-base */}
          <span className="relative z-10 flex items-center text-xs md:text-base font-medium">
            Knowledge
            <svg
              className="w-3 h-3 md:w-5 md:h-5 ml-1 md:ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <div className="absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>

        {/* Downloads Button */}
        <button className="group relative bg-gradient-to-r from-red-600 to-red-800 text-white px-3 py-2 md:px-6 md:py-4 rounded-r-lg md:rounded-r-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center text-xs md:text-base font-medium">
            Downloads
            <svg
              className="w-3 h-3 md:w-5 md:h-5 ml-1 md:ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <div className="absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>

        {/* Media Button */}
        <button className="group relative bg-gradient-to-r from-red-700 to-red-900 text-white px-3 py-2 md:px-6 md:py-4 rounded-r-lg md:rounded-r-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center text-xs md:text-base font-medium">
            Media
            <svg
              className="w-3 h-3 md:w-5 md:h-5 ml-1 md:ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <div className="absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      </div>

      {/* Glowing indicator when hidden and hovered */}
      {!open && hovered && (
        <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-red-500/70 rounded-r-md animate-pulse"></div>
      )}
    </div>
  );
};

export default SideButtons;
