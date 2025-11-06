import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg px-6 py-2 text-center text-purple-600  border-t border-purple-200  transition-colors duration-300">
      <div className="animate-bounce mb-1">
        <span className="text-red-500 text-lg">•</span>
      </div>
      <p className="text-sm font-medium">
        © {new Date().getFullYear()} PRL Machine Admin Panel. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
