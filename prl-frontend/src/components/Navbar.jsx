import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiX,
  FiMenu,
  FiChevronDown,
  FiChevronUp,
  FiGrid,
} from "react-icons/fi";
import axios from "axios";

import "swiper/css";
import "swiper/css/autoplay";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaTools,
  FaIndustry,
  FaPhoneAlt,
  FaUserCog,
  FaBook,
  FaFire,
  FaCrown,
  FaKey,
  FaUsers,
  FaEye,
  FaNewspaper,
  FaQuestionCircle,
  FaBlog,
  FaYoutube,
} from "react-icons/fa";
import LanguageSelector from "../common/LanguageSelector/LanguageSelector";
import { getUpvcCategorySlugByName } from "../utils/upvcCategories";
import { getAluminumCategorySlugByName } from "../utils/aluminumCategories";

// ─── Icon map ────────────────────────────────────────────────────────────────
const iconMap = {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
  FaPhone, FaEnvelope, FaWhatsapp, FaTools, FaIndustry,
  FaPhoneAlt, FaUserCog, FaBook, FaFire, FaCrown, FaKey,
  FaUsers, FaEye, FaNewspaper, FaQuestionCircle, FaBlog, FaYoutube,
};

// ─── Static fallback data (defined OUTSIDE component — never recreated) ──────
const FALLBACK_PRODUCTS = [
  {
    name: "uPVC Window Machine",
    icon: "FaTools",
    link: "products/uPVC-window-making-machine-price",
    subItems: [
      { name: "uPVC Welding Machine", desc: "Includes Single Head...", icon: "FaTools", link: "/products" },
      { name: "uPVC Cutting Machine", desc: "Precision cutting...", icon: "FaTools", link: "/products" },
      { name: "uPVC Cleaning Machine", desc: "Ensures clean edges...", icon: "FaTools", link: "/products" },
      { name: "uPVC Copy Router & Lock Hole Machine", desc: "Drilling and routing...", icon: "FaTools", link: "/products" },
      { name: "uPVC Glazing Bead Cutting Machine", desc: "Cuts glazing bead profiles...", icon: "FaTools", link: "/products" },
      { name: "uPVC Drainage Water Slot Machine", desc: "Creates drainage slots...", icon: "FaTools", link: "/products" },
      { name: "uPVC Mullion Cutting Machine", desc: "Precise cutting for mullions...", icon: "FaTools", link: "/products" },
      { name: "uPVC Interlock punching (IPL-300)", desc: "Efficient interlock punching...", icon: "FaTools", link: "/products" },
      { name: "uPVC Hand Tools", desc: "Manual tools for uPVC tasks...", icon: "FaTools", link: "/products" },
      { name: "uPVC Other Special Machine", desc: "Custom machines for uPVC...", icon: "FaTools", link: "/products" },
    ],
  },
  {
    name: "Aluminum Window Machine",
    icon: "FaIndustry",
    link: "/products/aluminum-window-machines",
    subItems: [
      { name: "Aluminum Cutting Machine", desc: "Precision cutting...", icon: "FaIndustry", link: "/products" },
      { name: "Aluminum Lock Hole Machine", desc: "Routing and drilling...", icon: "FaIndustry", link: "/products" },
      { name: "Aluminum Mullion Machine", desc: "Designed to cut mullions...", icon: "FaIndustry", link: "/products" },
      { name: "Aluminum Punching & Crimping Machine", desc: "Punch and crimp frames...", icon: "FaIndustry", link: "/products" },
    ],
  },
];

const FALLBACK_SERVICES = [
  { name: "Maintenance", desc: "Preventive care", icon: "FaIndustry", link: "/services/maintenance" },
  { name: "Installation", desc: "Professional setup", icon: "FaTools", link: "/services/installation" },
  { name: "Training", desc: "Operator courses", icon: "FaBook", link: "/services/training" },
  { name: "Machine Customization", desc: "Tailored solutions", icon: "FaUserCog", link: "/services/machine-customization" },
];

const FALLBACK_COMPANY_ITEMS = [
  { name: "About Us", desc: "Our story and journey", icon: "FaIndustry", link: "/our-company/about-us" },
  { name: "Mission & Vision", desc: "Our goals and aspirations", icon: "FaEye", link: "/our-company/mission-vision" },
  { name: "Our Team", desc: "Meet our experts", icon: "FaUsers", link: "/our-company/our-team" },
  { name: "Blogs", desc: "Latest industry insights", icon: "FaBlog", link: "/our-company/blogs" },
  { name: "News", desc: "Company updates and events", icon: "FaNewspaper", link: "/our-company/news" },
  { name: "FAQ", desc: "Frequently asked questions", icon: "FaQuestionCircle", link: "/our-company/faq" },
];

const FALLBACK_SOCIAL_LINKS = [
  { platform: "Facebook", icon: "FaFacebook", url: "https://www.facebook.com/profile.php?id=61558994608251" },
  { platform: "WhatsApp", icon: "FaWhatsapp", url: "https://wa.me/917065500903" }, // Fix: was pointing to YouTube
  { platform: "Instagram", icon: "FaInstagram", url: "https://www.instagram.com/parida_red_lion/" },
  { platform: "LinkedIn", icon: "FaLinkedin", url: "https://www.linkedin.com/in/rajesh-parida-1704b2b4/?originalSubdomain=in" },
];

const FALLBACK_CONTACT = { phone: "+91 7065500903", email: "prlinquiry@gmail.com" };

// ─── Component ────────────────────────────────────────────────────────────────
const RedLionNavbar = ({ onOpenQuote }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState("");
  const [socialLinks, setSocialLinks] = useState(FALLBACK_SOCIAL_LINKS);
  const [contactInfo, setContactInfo] = useState(FALLBACK_CONTACT);
  const [apiProducts, setApiProducts] = useState([]);
  const [apiServices, setApiServices] = useState([]);
  const [apiCompanyItems, setApiCompanyItems] = useState([]);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/navbar`;

  // ─── GTM injection (guarded against duplicate on HMR) ──────────────────────
  useEffect(() => {
    if (document.getElementById("gtm-script")) return;
    const script = document.createElement("script");
    script.id = "gtm-script";
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PPMDF6KM');
    `;
    document.head.appendChild(script);
  }, []);

  // ─── Helpers (memoized, depend on location so links are always fresh) ───────
  const toAbsolutePath = useCallback((path = "") => {
    if (!path || path === "#") return location.pathname;
    const [pathnamePart] = path.split("#");
    const normalizedPath = pathnamePart.startsWith("/") ? pathnamePart : `/${pathnamePart}`;
    return normalizedPath.replace(/\/+$/, "") || "/";
  }, [location]);

  const resolveProductLink = useCallback((item, isParent = false) => {
    if (!item?.link) return item?.link;
    const normalizedLink = toAbsolutePath(item.link);
    const lowerName = (item.name || "").toLowerCase();
    const lowerLink = normalizedLink.toLowerCase();

    const isUpvc =
      lowerName.includes("upvc") ||
      lowerLink.includes("/products/upvc-window-making-machine-price");
    const isAluminum =
      lowerName.includes("aluminum") ||
      lowerName.includes("aluminium") ||
      lowerLink.includes("/products/aluminum-window-machines");

    if (isUpvc) {
      if (isParent) return "/products";
      const categorySlug = getUpvcCategorySlugByName(item.name);
      return categorySlug ? `/products/${categorySlug}` : "/products";
    }
    if (isAluminum) {
      if (isParent) return "/products";
      const categorySlug = getAluminumCategorySlugByName(item.name);
      return categorySlug ? `/products/${categorySlug}` : "/products";
    }
    return normalizedLink;
  }, [toAbsolutePath]);

  const mapIconsToData = useCallback((items) => {
    return items.map((item) => {
      const IconComponent = iconMap[item.icon] || FaTools;
      const newItem = {
        ...item,
        link: resolveProductLink(item, Boolean(item.subItems?.length)),
        icon: <IconComponent className="text-red-600" />,
      };
      if (item.subItems) newItem.subItems = mapIconsToData(item.subItems);
      return newItem;
    });
  }, [resolveProductLink]);

  // ─── Fetch navbar data ───────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => {
        const data = res.data;
        setLogo(data.logo || "/assets/logo/new-final-logo.png");
        setSocialLinks(data.socialLinks || FALLBACK_SOCIAL_LINKS);
        setContactInfo(data.contactInfo || FALLBACK_CONTACT);
        if (data.products?.length)     setApiProducts(mapIconsToData(data.products));
        if (data.services?.length)     setApiServices(mapIconsToData(data.services));
        if (data.companyItems?.length) setApiCompanyItems(mapIconsToData(data.companyItems));
      })
      .catch((err) => {
        console.error("Error fetching navbar, using fallback data:", err);
        setLogo("/assets/logo/new-final-logo.png");
        setSocialLinks(FALLBACK_SOCIAL_LINKS);
        setContactInfo(FALLBACK_CONTACT);
        setApiProducts(mapIconsToData(FALLBACK_PRODUCTS));
        setApiServices(mapIconsToData(FALLBACK_SERVICES));
        setApiCompanyItems(mapIconsToData(FALLBACK_COMPANY_ITEMS));
      })
      .finally(() => setLoading(false));
  }, [mapIconsToData]); // mapIconsToData depends on location via resolveProductLink

  // ─── Resize handler (window.innerWidth safely in useEffect, not useState) ───
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setSearchOpen(false);
        setOpenDropdowns({});
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ─── Derived data (memoized — only recomputed when API data changes) ─────────
  const products = useMemo(
    () => (apiProducts.length > 0 ? apiProducts : mapIconsToData(FALLBACK_PRODUCTS)),
    [apiProducts, mapIconsToData],
  );
  const services = useMemo(
    () => (apiServices.length > 0 ? apiServices : mapIconsToData(FALLBACK_SERVICES)),
    [apiServices, mapIconsToData],
  );
  const companyItems = useMemo(
    () => (apiCompanyItems.length > 0 ? apiCompanyItems : mapIconsToData(FALLBACK_COMPANY_ITEMS)),
    [apiCompanyItems, mapIconsToData],
  );

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const closeAllMenus = useCallback(() => {
    setMobileOpen(false);
    setSidebarOpen(false);
    setOpenDropdowns({});
  }, []);

  const toggleDropdown = useCallback((dropdownName) => {
    setOpenDropdowns((prev) => ({ ...prev, [dropdownName]: !prev[dropdownName] }));
  }, []);

  // ─── Render helpers ───────────────────────────────────────────────────────────
  const renderDropdownItems = (items, level = 0) => {
    if (level === 1) {
      return (
        <div className="grid grid-cols-1 py-2 px-4 w-[350px]">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-start p-1.5 hover:bg-red-50 rounded-lg transition-all duration-300 group/item"
              onClick={closeAllMenus}
            >
              <span className="mt-1 mr-3 text-red-600 transform transition-transform duration-300 group-hover/item:scale-110">
                {item.icon}
              </span>
              <div>
                <div className="font-medium text-gray-700 group-hover/item:text-red-700">{item.name}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    return items.map((item, index) => (
      <div key={index} className="group/item relative">
        {item.link ? (
          <Link
            to={item.link}
            className="flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300"
            onClick={closeAllMenus}
          >
            {item.icon && (
              <span className="mr-3 transform transition-transform duration-300 group-hover/item:scale-110">
                {item.icon}
              </span>
            )}
            <span className="flex-1 text-gray-700 font-medium">{item.name}</span>
            {item.subItems && (
              <FiChevronDown className="ml-1 transition-transform duration-300 group-hover/item:rotate-180" />
            )}
          </Link>
        ) : (
          <div className="flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 cursor-default">
            {item.icon && (
              <span className="mr-3 transform transition-transform duration-300 group-hover/item:scale-110">
                {item.icon}
              </span>
            )}
            <span className="flex-1 text-gray-700 font-medium">{item.name}</span>
            {item.subItems && (
              <FiChevronDown className="ml-1 transition-transform duration-300 group-hover/item:rotate-180" />
            )}
          </div>
        )}
        {item.subItems && (
          <div className="absolute left-full top-0 hidden group-hover/item:block bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-fadeIn">
            {renderDropdownItems(item.subItems, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const renderMobileDropdownItems = (items, level = 0, parentIndex = "") => {
    return items.map((item, index) => {
      const uniqueKey = `${parentIndex}-${index}`;
      const isOpen = openDropdowns[`mobileCategory-${uniqueKey}`];

      return (
        <div key={index}>
          {item.link && !item.subItems ? (
            <Link
              to={item.link}
              className={`w-full flex justify-between items-center py-2 px-3 text-gray-700 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-1 ${level > 0 ? "pl-6" : ""}`}
              onClick={closeAllMenus}
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.name}
              </div>
            </Link>
          ) : (
            <button
              className={`w-full flex justify-between items-center py-2 px-3 text-gray-700 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-1 ${level > 0 ? "pl-6" : ""} ${isOpen ? "bg-red-50 text-red-600" : ""}`}
              onClick={() => toggleDropdown(`mobileCategory-${uniqueKey}`)}
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.name}
              </div>
              {item.subItems && (
                <span className={`text-lg transition-colors duration-300 ${isOpen ? "text-red-600" : "text-gray-400"}`}>
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              )}
            </button>
          )}

          {item.subItems && (
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
              <div className={`${level > 0 ? "pl-8" : "pl-6"} mt-1 space-y-2`}>
                {renderMobileDropdownItems(item.subItems, level + 1, uniqueKey)}
              </div>
            </div>
          )}

          {/* Avoid duplicate rendering: only show desc block for leaf items not already rendered above */}
          {!item.subItems && item.desc && item.link && (
            <Link
              to={item.link}
              className={`block py-2 px-3 text-sm text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2 ${level > 0 ? "pl-10" : "pl-8"}`}
              onClick={closeAllMenus}
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
            </Link>
          )}
        </div>
      );
    });
  };

  // ─── Announcement bar ─────────────────────────────────────────────────────────
  const renderAnnouncementBar = () => (
    <div
      id="announcement-bar"
      className="bg-[#FB252D] fixed w-full z-50 text-white text-center text-xs md:text-sm py-2 px-4 lg:px-8 xl:px-12 flex items-center justify-between min-h-[36px]"
    >
      <div className="items-center hidden md:flex space-x-3">
        {socialLinks.map((social, index) => {
          const IconComponent = iconMap[social.icon] || FaFacebook;
          return (
            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
              <IconComponent />
            </a>
          );
        })}
      </div>
      <div className="flex-1" />
      <div className="md:flex hidden items-center space-x-2 lg:space-x-4">
        <div className="flex items-center text-xs lg:text-sm">
          <FaPhone className="mr-1 lg:mr-2 text-yellow-300" />
          <a href={`tel:${contactInfo.phone}`} className="hover:underline">{contactInfo.phone}</a>
        </div>
        <div className="flex items-center text-xs lg:text-sm">
          <FaEnvelope className="mr-1 lg:mr-2 text-yellow-300" />
          <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
        </div>
      </div>
    </div>
  );

  // ─── JSX ──────────────────────────────────────────────────────────────────────
  return (
    <>
      {renderAnnouncementBar()}
      <nav
        id="main-navbar"
        className="bg-white/95 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/007/100/608/small/abstract-geometric-white-and-gray-on-light-silver-gradient-background-modern-banner-design-illustration-free-vector.jpg')] bg-cover bg-center backdrop-blur-md border-b border-gray-200 sticky top-9 z-50 shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center group">
              <Link to="/" className="relative overflow-hidden rounded-lg">
                <img
                  src={logo}
                  alt="Red Lion Logo"
                  className="w-24 h-auto md:w-32 md:h-[80px] object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { e.target.src = "/assets/logo/new-final-logo.png"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-6">
              <Link to="/" className="relative text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group text-sm xl:text-base whitespace-nowrap">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Products dropdown */}
              <div className="relative group">
                <Link to="/products">
                  <div className="flex items-center text-gray-700 hover:text-red-600 font-medium transition-all duration-300 cursor-pointer text-sm xl:text-base whitespace-nowrap">
                    Products
                    <FiChevronDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                  </div>
                  <div className="absolute -left-10 xl:-left-52 mt-2 w-80 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                    {renderDropdownItems(products)}
                  </div>
                </Link>
              </div>

              {/* Services dropdown */}
              <div className="relative group">
                <div className="flex items-center text-gray-700 hover:text-red-600 font-medium transition-all duration-300 cursor-pointer text-sm xl:text-base whitespace-nowrap">
                  Services
                  <FiChevronDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </div>
                <div className="absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.link}
                      className="flex items-start px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 group/service relative overflow-hidden transform hover:translate-x-2 rounded-lg mx-2 my-1"
                      onClick={closeAllMenus}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover/service:opacity-100 transition-opacity duration-300" />
                      <span className="mt-1 mr-3 transform transition-transform duration-300 group-hover/service:scale-110 group-hover/service:rotate-12 relative z-10">{service.icon}</span>
                      <div className="relative z-10">
                        <div className="text-gray-700 font-medium group-hover/service:text-red-700 transition-colors duration-300">{service.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{service.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Our Company dropdown */}
              <div className="relative group">
                <Link to="/our-company">
                  <div className="flex items-center text-gray-700 hover:text-red-600 font-medium transition-all duration-300 cursor-pointer text-sm xl:text-base whitespace-nowrap">
                    Our Company
                    <FiChevronDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                  </div>
                </Link>
                <div className="absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                  {companyItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      className="flex items-start px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 group/item relative overflow-hidden transform hover:translate-x-2 rounded-lg mx-2 my-1"
                      onClick={closeAllMenus}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                      <span className="mt-1 mr-3 transform transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-12 relative z-10">{item.icon}</span>
                      <div className="relative z-10">
                        <div className="text-gray-700 font-medium group-hover/item:text-red-700 transition-colors duration-300">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/turn-key" className="relative text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group text-sm xl:text-base whitespace-nowrap">
                Turn Key
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link to="/case-studies" className="relative text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group text-sm xl:text-base whitespace-nowrap">
                Case Studies
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link to="/contact-us" className="relative text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group text-sm xl:text-base whitespace-nowrap">
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </Link>

              <button
                onClick={onOpenQuote}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-2 xl:px-5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ml-1 xl:ml-2 text-sm xl:text-base whitespace-nowrap"
              >
                Get a Quote
              </button>
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 xl:p-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-200/50 relative group"
                title="Product Catalog"
              >
                <FiGrid className="text-lg xl:text-xl transition-transform duration-300 group-hover:rotate-90" />
              </button>
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-2 xl:p-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-200/50 relative group"
              >
                <FiSearch className={`text-lg xl:text-xl transition-transform duration-300 ${searchOpen ? "rotate-90" : "group-hover:rotate-90"}`} />
              </button>
              <LanguageSelector />
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center space-x-2 sm:space-x-4">
              <button onClick={() => setSearchOpen((prev) => !prev)} className="p-2 text-gray-700 hover:text-red-600 transition-all duration-300">
                <FiSearch className="text-xl" />
              </button>
              <button onClick={() => setMobileOpen((prev) => !prev)} className="p-2 text-gray-700 hover:text-red-600 transition-all duration-300">
                {mobileOpen
                  ? <FiX className="text-xl transition-transform duration-300 rotate-90" />
                  : <FiMenu className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-y-auto overflow-x-hidden transition-all duration-500 custom-scrollbar ${mobileOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-6 py-4 space-y-2">
            <Link to="/" className="block py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2" onClick={closeAllMenus}>
              Home
            </Link>

            {/* Products */}
            <div>
              <button
                className={`w-full flex justify-between items-center py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 ${openDropdowns["mobileProducts"] ? "bg-red-50 text-red-600" : ""}`}
                onClick={() => toggleDropdown("mobileProducts")}
              >
                <span>Products</span>
                <span className={`text-lg transition-colors duration-300 ${openDropdowns["mobileProducts"] ? "text-red-600" : "text-gray-400"}`}>
                  {openDropdowns["mobileProducts"] ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openDropdowns["mobileProducts"] ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="pl-2 mt-1 space-y-2">{renderMobileDropdownItems(products)}</div>
              </div>
            </div>

            {/* Services */}
            <div>
              <button
                className={`w-full flex justify-between items-center py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 ${openDropdowns["mobileServices"] ? "bg-red-50 text-red-600" : ""}`}
                onClick={() => toggleDropdown("mobileServices")}
              >
                <span>Services</span>
                <span className={`text-lg transition-colors duration-300 ${openDropdowns["mobileServices"] ? "text-red-600" : "text-gray-400"}`}>
                  {openDropdowns["mobileServices"] ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openDropdowns["mobileServices"] ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="pl-6 mt-1 space-y-2">
                  {services.map((service, index) => (
                    <Link key={index} to={service.link} className="block py-2 px-3 text-gray-700 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2" onClick={closeAllMenus}>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{service.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Our Company */}
            <div>
              <button
                className={`w-full flex justify-between items-center py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 ${openDropdowns["mobileCompany"] ? "bg-red-50 text-red-600" : ""}`}
                onClick={() => toggleDropdown("mobileCompany")}
              >
                <span>Our Company</span>
                <span className={`text-lg transition-colors duration-300 ${openDropdowns["mobileCompany"] ? "text-red-600" : "text-gray-400"}`}>
                  {openDropdowns["mobileCompany"] ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openDropdowns["mobileCompany"] ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="pl-6 mt-1 space-y-2">
                  {companyItems.map((item, index) => (
                    <Link key={index} to={item.link} className="block py-2 px-3 text-gray-700 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2" onClick={closeAllMenus}>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/turn-key" className="block py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2" onClick={closeAllMenus}>Turn Key</Link>
            <Link to="/case-studies" className="block py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2" onClick={closeAllMenus}>Case Studies</Link>
            <Link to="/contact-us" className="block py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2" onClick={closeAllMenus}>Contact</Link>

            <button
              onClick={() => { onOpenQuote(); closeAllMenus(); }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mt-2"
            >
              Get a Quote
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-2xl z-40 overflow-hidden transition-all duration-500 ${searchOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search machinery, specs, documentation..."
                className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 focus:border-red-600 text-gray-800 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-500 transition-all duration-300 focus:shadow-lg focus:shadow-red-200/50"
                autoFocus
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-300">
                <FiSearch className="text-xl" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["UPVC Cutting", "Router Specs", "Welding Guides"].map((tag, index) => (
                <Link
                  key={index}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-red-100 hover:to-red-200 hover:text-red-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                  onClick={() => setSearchOpen(false)}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Product catalog sidebar */}
      <div className={`fixed inset-y-0 right-0 w-[85vw] sm:w-96 bg-white/95 backdrop-blur-lg border-l border-gray-200 z-50 shadow-2xl overflow-y-auto transform transition-all duration-500 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-red-600 animate-pulse">Product</span> Catalog
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-300 transform hover:scale-110 hover:rotate-90">
              <FiX className="text-xl" />
            </button>
          </div>
          <div className="space-y-4">
            {products.map((category, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-200/50 group">
                <Link to={category.link} className="flex items-center" onClick={closeAllMenus}>
                  <div className="mr-4 p-3 bg-white rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-200/50">
                    <span className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 inline-block">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-red-700 transition-colors duration-300">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{category.subItems.length} models available</p>
                  </div>
                </Link>
                <div className="mt-3 pl-2 space-y-2">
                  {category.subItems.map((item, itemIndex) => (
                    <Link key={itemIndex} to={item.link} className="block p-3 text-sm hover:bg-white/80 rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:shadow-md group/item" onClick={closeAllMenus}>
                      <div className="flex items-start">
                        <span className="mt-1 mr-3 text-red-600">{item.icon}</span>
                        <div>
                          <div className="font-medium text-gray-700 group-hover/item:text-red-700 transition-colors duration-300">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-500 ${sidebarOpen || mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeAllMenus}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #999; }
      `}</style>
    </>
  );
};

export default RedLionNavbar;