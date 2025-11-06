import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX, FiMenu, FiChevronDown, FiGrid } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
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
} from "react-icons/fa";
import LanguageSelector from "../common/LanguageSelector/LanguageSelector";

// Icon mapping for API-driven icons
const iconMap = {
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
};

const RedLionNavbar = ({ onOpenQuote }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "" });
  const [apiProducts, setApiProducts] = useState([]);
  const [apiServices, setApiServices] = useState([]);
  const [apiCompanyItems, setApiCompanyItems] = useState([]);

  const API_URL = "http://localhost:3000/api/navbar";

  // Fallback data
  const fallbackProducts = [
    {
      name: "uPVC Window Machine",
      icon: "FaTools",
      link: "/products/upvcwindowmachines",
      subItems: [
        {
          name: "uPVC Welding Machine",
          desc: "Includes Single Head...",
          icon: "FaTools",
          link: "/products/upvcwindowmachines",
        },
        {
          name: "uPVC Cutting Machine",
          desc: "Precision cutting...",
          icon: "FaTools",
          link: "/products/upvcwindowmachines",
        },
        {
          name: "uPVC Cleaning Machine",
          desc: "Ensures clean edges...",
          icon: "FaTools",
          link: "/products/upvcwindowmachines",
        },
        {
          name: "uPVC Copy Router & Lock Hole Machine",
          desc: "Drilling and routing...",
          icon: "FaTools",
          link: "/products/upvcwindowmachines",
        },
        {
          name: "uPVC Glazing Bead Cutting Machine",
          desc: "Cuts glazing bead profiles...",
          icon: "FaTools",
          link: "/products/upvcwindowmachines",
        },
        {
          name: "uPVC Drainage Water Slot Machine",
          desc: "Creates drainage slots...",
          icon: "FaTools",
          link: "/products/upvcwindowmachines",
        },
        {
          name: "uPVC Mullion Cutting Machine",
          desc: "Precise cutting for mullions...",
          icon: "FaTools",
          link: "/products/upvcwindowmachines",
        },
        {
          name: "uPVC Interlock punching (IPL-300)",
          desc: "Efficient interlock punching...",
          icon: "FaTools",
          link: "/products/upvcwindowmachines",
        },
        {
          name: "Hand Tools",
          desc: "Manual tools for uPVC tasks...",
          icon: "FaTools",
          link: "/products/upvcwindowmachines",
        },
        {
          name: "Other Special Machine",
          desc: "Custom machines for uPVC...",
          icon: "FaTools",
          link: "/products/upvcwindowmachines",
        },
      ],
    },
    {
      name: "Aluminum Window Machine",
      icon: "FaIndustry",
      link: "/products/aluminumwindowmachines",
      subItems: [
        {
          name: "Aluminum Cutting Machine",
          desc: "Precision cutting...",
          icon: "FaIndustry",
          link: "/products/aluminumwindowmachines",
        },
        {
          name: "Aluminum Lock Hole Machine",
          desc: "Routing and drilling...",
          icon: "FaIndustry",
          link: "/products/aluminumwindowmachines",
        },
        {
          name: "Aluminum Mullion Machine",
          desc: "Designed to cut mullions...",
          icon: "FaIndustry",
          link: "/products/aluminumwindowmachines",
        },
        {
          name: "Aluminum Punching & Crimping Machine",
          desc: "Punch and crimp frames...",
          icon: "FaIndustry",
          link: "/products/aluminumwindowmachines",
        },
      ],
    },
  ];
  const fallbackServices = [
    {
      name: "Maintenance",
      desc: "Preventive care",
      icon: "FaIndustry",
      link: "/services/maintenance",
    },
    {
      name: "Installation",
      desc: "Professional setup",
      icon: "FaTools",
      link: "/services/installation",
    },
    {
      name: "Training",
      desc: "Operator courses",
      icon: "FaBook",
      link: "/services/training",
    },
    {
      name: "Machine Customization",
      desc: "Tailored solutions",
      icon: "FaUserCog",
      link: "/services/machine-customization",
    },
  ];
  const fallbackCompanyItems = [
    {
      name: "About Us",
      desc: "Our story and journey",
      icon: "FaIndustry",
      link: "/ourcompany/about",
    },
    {
      name: "Mission & Vision",
      desc: "Our goals and aspirations",
      icon: "FaEye",
      link: "/ourcompany/missionvision",
    },
    {
      name: "Our Team",
      desc: "Meet our experts",
      icon: "FaUsers",
      link: "/ourcompany/team",
    },
    {
      name: "Blogs",
      desc: "Latest industry insights",
      icon: "FaBlog",
      link: "/ourcompany/ourblogs",
    },
    {
      name: "News",
      desc: "Company updates and events",
      icon: "FaNewspaper",
      link: "/ourcompany/news",
    },
    {
      name: "FAQ",
      desc: "Frequently asked questions",
      icon: "FaQuestionCircle",
      link: "/ourcompany/faq",
    },
  ];

  // Helper function to map icon strings to components recursively
  const mapIconsToData = (items) => {
    return items.map((item) => {
      const IconComponent = iconMap[item.icon] || FaTools;
      const newItem = {
        ...item,
        icon: <IconComponent className="text-red-600" />,
      };
      if (item.subItems) {
        newItem.subItems = mapIconsToData(item.subItems);
      }
      return newItem;
    });
  };

  // Fetch navbar data from API
  useEffect(() => {
    const fetchNavbarData = () => {
      setLoading(true);
      axios
        .get(API_URL)
        .then((res) => {
          const data = res.data;
          setLogo(data.logo || "/assets/logo/new-final-logo.png");
          setAnnouncements(
            data.announcements || [
              "Free Installation Support | 🚚 Free Shipping on Orders Over ₹50,000",
              "New Product Launch | 🔥 Advanced uPVC Welding Machine Now Available",
            ]
          );
          setSocialLinks(
            data.socialLinks || [
              {
                platform: "Facebook",
                icon: "FaFacebook",
                url: "https://www.facebook.com/profile.php?id=61558994608251",
              },
              {
                platform: "WhatsApp",
                icon: "FaWhatsapp",
                url: "https://www.youtube.com/@PRLuPVCMACHINE",
              },
              {
                platform: "Instagram",
                icon: "FaInstagram",
                url: "https://www.instagram.com/parida_red_lion/",
              },
              {
                platform: "LinkedIn",
                icon: "FaLinkedin",
                url: "https://linkedin.com/company/redlionmachinery",
              },
            ]
          );
          setContactInfo(
            data.contactInfo || {
              phone: "+91 7065500903",
              email: "r.k.parida015@gmail.com",
            }
          );

          // Process API data and map icons
          if (data.products && data.products.length > 0) {
            setApiProducts(mapIconsToData(data.products));
          }
          if (data.services && data.services.length > 0) {
            setApiServices(mapIconsToData(data.services));
          }
          if (data.companyItems && data.companyItems.length > 0) {
            setApiCompanyItems(mapIconsToData(data.companyItems));
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching navbar, using fallback data:", err);
          setLogo("/assets/logo/new-final-logo.png");
          setAnnouncements([
            "Free Installation Support | 🚚 Free Shipping on Orders Over ₹50,000",
            "New Product Launch | 🔥 Advanced uPVC Welding Machine Now Available",
          ]);
          setSocialLinks([
            {
              platform: "Facebook",
              icon: "FaFacebook",
              url: "https://www.facebook.com/profile.php?id=61558994608251",
            },
            {
              platform: "WhatsApp",
              icon: "FaWhatsapp",
              url: "https://www.youtube.com/@PRLuPVCMACHINE",
            },
            {
              platform: "Instagram",
              icon: "FaInstagram",
              url: "https://www.instagram.com/parida_red_lion/",
            },
            {
              platform: "LinkedIn",
              icon: "FaLinkedin",
              url: "https://linkedin.com/company/redlionmachinery",
            },
          ]);
          setContactInfo({
            phone: "+91 7065500903",
            email: "r.k.parida015@gmail.com",
          });

          // Use processed fallback data
          setApiProducts(mapIconsToData(fallbackProducts));
          setApiServices(mapIconsToData(fallbackServices));
          setApiCompanyItems(mapIconsToData(fallbackCompanyItems));

          setLoading(false);
        });
    };

    fetchNavbarData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use API data with fallback
  const products =
    apiProducts.length > 0 ? apiProducts : mapIconsToData(fallbackProducts);
  const services =
    apiServices.length > 0 ? apiServices : mapIconsToData(fallbackServices);
  const companyItems =
    apiCompanyItems.length > 0
      ? apiCompanyItems
      : mapIconsToData(fallbackCompanyItems);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const renderDropdownItems = (items, level = 0) => {
    if (level === 1) {
      return (
        <div className="grid grid-cols-1 py-2 px-4 w-[350px]">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-start p-1.5 hover:bg-red-50 rounded-lg transition-all duration-300 group/item"
              onClick={() => {
                setMobileOpen(false);
                setSidebarOpen(false);
              }}
            >
              <span className="mt-1 mr-3 text-red-600 transform transition-transform duration-300 group-hover/item:scale-110">
                {item.icon}
              </span>
              <div>
                <div className="font-medium text-gray-700 group-hover/item:text-red-700">
                  {item.name}
                </div>
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
            onClick={() => setSidebarOpen(false)}
          >
            {item.icon && (
              <span className="mr-3 transform transition-transform duration-300 group-hover/item:scale-110">
                {item.icon}
              </span>
            )}
            <span className="flex-1 text-gray-700 font-medium">
              {item.name}
            </span>
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
            <span className="flex-1 text-gray-700 font-medium">
              {item.name}
            </span>
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
      return (
        <div key={index}>
          {item.link && !item.subItems ? (
            <Link
              to={item.link}
              className={`w-full flex justify-between items-center py-2 px-3 text-gray-700 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-1 ${
                level > 0 ? "pl-6" : ""
              }`}
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex items-center">
                {item.icon && (
                  <span className="mr-3 transition-transform duration-300 hover:scale-110">
                    {item.icon}
                  </span>
                )}
                {item.name}
              </div>
            </Link>
          ) : (
            <button
              className={`w-full flex justify-between items-center py-2 px-3 text-gray-700 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-1 ${
                level > 0 ? "pl-6" : ""
              }`}
              onClick={() => toggleDropdown(`mobileCategory-${uniqueKey}`)}
            >
              <div className="flex items-center">
                {item.icon && (
                  <span className="mr-3 transition-transform duration-300 hover:scale-110">
                    {item.icon}
                  </span>
                )}
                {item.name}
              </div>
              {item.subItems && (
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeDropdown === `mobileCategory-${uniqueKey}`
                      ? "rotate-180"
                      : ""
                  }`}
                />
              )}
            </button>
          )}
          {item.subItems && (
            <div
              className={`overflow-hidden transition-all duration-500 ${
                activeDropdown === `mobileCategory-${uniqueKey}`
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className={`${level > 0 ? "pl-8" : "pl-6"} mt-1 space-y-2`}>
                {renderMobileDropdownItems(item.subItems, level + 1, uniqueKey)}
              </div>
            </div>
          )}
          {!item.subItems && item.desc && (
            <Link
              to={item.link}
              className={`block py-2 px-3 text-sm text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2 ${
                level > 0 ? "pl-10" : "pl-8"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
            </Link>
          )}
        </div>
      );
    });
  };

  const renderAnnouncementBar = () => {
    const displayAnnouncements =
      announcements.length > 0
        ? announcements
        : [
            "Free Installation Support | 🚚 Free Shipping on Orders Over ₹50,000",
            "New Product Launch | 🔥 Advanced uPVC Welding Machine Now Available",
          ];

    if (windowWidth < 768) {
      return (
        <div className="bg-[#FB252D] fixed w-[100vw] z-50 text-white text-center text-xs py-2 px-4">
          <Swiper
            direction="vertical"
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
            className="h-6"
          >
            {displayAnnouncements.map((announcement, index) => (
              <SwiperSlide key={index}>
                <div className="text-center whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="font-bold text-yellow-300">
                    {announcement}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      );
    }

    return (
      <div className="bg-[#FB252D] fixed w-[100vw] z-50 text-white text-center text-sm py-2 px-8 md:flex items-center justify-between">
        <div className="items-center hidden md:flex space-x-3 mr-4">
          {socialLinks.map((social, index) => {
            const IconComponent = iconMap[social.icon] || FaFacebook;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition-colors"
              >
                <IconComponent />
              </a>
            );
          })}
        </div>

        <div className="flex-1 max-w-2xl ml-24 mx-4">
          <Swiper
            direction="vertical"
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
            className="h-6"
          >
            {displayAnnouncements.map((announcement, index) => (
              <SwiperSlide key={index}>
                <div className="text-center">
                  <span className="font-bold ml-1 text-yellow-300">
                    {announcement}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="md:flex hidden items-center space-x-4 ml-4">
          <div className="flex items-center">
            <FaPhone className="mr-2 text-yellow-300" />
            <a href={`tel:${contactInfo.phone}`} className="hover:underline">
              {contactInfo.phone || "+91 7065500903"}
            </a>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-yellow-300" />
            <a href={`mailto:${contactInfo.email}`} className="hover:underline">
              {contactInfo.email || "r.k.parida015@gmail.com"}
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderAnnouncementBar()}

      <nav className="bg-white/95 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/007/100/608/small/abstract-geometric-white-and-gray-on-light-silver-gradient-background-modern-banner-design-illustration-free-vector.jpg')] bg-cover bg-center backdrop-blur-md border-b border-gray-200 sticky top-10 z-50 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="max-w-8xl mx-auto px-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center group">
              <Link to="/" className="relative overflow-hidden rounded-lg">
                <img
                  src={logo}
                  alt="Red Lion Logo"
                  className="w-32 h-[80px] transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/assets/logo/new-final-logo.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <Link
                to="/"
                className="relative text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <div className="relative group">
                <Link to="/products">
                  <div className="flex items-center text-gray-700 hover:text-red-600 font-medium transition-all duration-300 cursor-pointer">
                    Products
                    <FiChevronDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                  </div>
                  <div className="absolute -left-52 mt-2 w-80 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                    {renderDropdownItems(products)}
                  </div>
                </Link>
              </div>

              <div className="relative group">
                <div className="flex items-center text-gray-700 hover:text-red-600 font-medium transition-all duration-300 cursor-pointer">
                  Services
                  <FiChevronDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </div>
                <div className="absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.link}
                      className="flex items-start px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 group/service relative overflow-hidden transform hover:translate-x-2 rounded-lg mx-2 my-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover/service:opacity-100 transition-opacity duration-300"></div>
                      <span className="mt-1 mr-3 transform transition-transform duration-300 group-hover/service:scale-110 group-hover/service:rotate-12 relative z-10">
                        {service.icon}
                      </span>
                      <div className="relative z-10">
                        <div className="text-gray-700 font-medium group-hover/service:text-red-700 transition-colors duration-300">
                          {service.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {service.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <Link to="/ourcompany">
                  <div className="flex items-center text-gray-700 hover:text-red-600 font-medium transition-all duration-300 cursor-pointer">
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
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                      <span className="mt-1 mr-3 transform transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-12 relative z-10">
                        {item.icon}
                      </span>
                      <div className="relative z-10">
                        <div className="text-gray-700 font-medium group-hover/item:text-red-700 transition-colors duration-300">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/turnkeypage"
                className="relative text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group"
              >
                Turn Key
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/casestudies"
                className="relative text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group"
              >
                Case Studies
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/contact"
                className="relative text-gray-700 hover:text-red-600 transition-all duration-300 font-medium group"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <button
                onClick={onOpenQuote}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ml-2"
              >
                Get a Quote
              </button>

              <button
                onClick={() => setSidebarOpen(true)}
                className="p-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-200/50 relative group"
                title="Product Catalog"
              >
                <FiGrid className="text-xl transition-transform duration-300 group-hover:rotate-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-200/50 relative group"
              >
                <FiSearch
                  className={`text-xl transition-transform duration-300 ${
                    searchOpen ? "rotate-90" : "group-hover:rotate-90"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>

              <LanguageSelector />
            </div>

            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-700 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
              >
                <FiSearch className="text-xl" />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-gray-700 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
              >
                <div className="relative">
                  {mobileOpen ? (
                    <FiX className="text-xl transition-transform duration-300 rotate-90" />
                  ) : (
                    <FiMenu className="text-xl transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden transition-all duration-500 ${
            mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/"
              className="block py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <div>
              <button
                className="w-full flex justify-between items-center py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300"
                onClick={() => toggleDropdown("mobileProducts")}
              >
                <span>Products</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeDropdown === "mobileProducts" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeDropdown === "mobileProducts"
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-2 mt-1 space-y-2">
                  {renderMobileDropdownItems(products)}
                </div>
              </div>
            </div>

            <div>
              <button
                className="w-full flex justify-between items-center py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300"
                onClick={() => toggleDropdown("mobileServices")}
              >
                <span>Services</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeDropdown === "mobileServices" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeDropdown === "mobileServices"
                    ? "max-h-64 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-6 mt-1 space-y-2">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.link}
                      className="block py-2 px-3 text-gray-700 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="font-medium">{service.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {service.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <button
                className="w-full flex justify-between items-center py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300"
                onClick={() => toggleDropdown("mobileCompany")}
              >
                <span>Our Company</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeDropdown === "mobileCompany" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeDropdown === "mobileCompany"
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-6 mt-1 space-y-2">
                  {companyItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      className="block py-2 px-3 text-gray-700 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/turnkey"
              className="block py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setMobileOpen(false)}
            >
              Turn Key
            </Link>

            <Link
              to="/casestudies"
              className="block py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setMobileOpen(false)}
            >
              Case Studies
            </Link>

            <Link
              to="/contact"
              className="block py-3 px-3 text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>

            <button
              onClick={() => {
                onOpenQuote();
                setMobileOpen(false);
              }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mt-2"
            >
              Get a Quote
            </button>
          </div>
        </div>

        <div
          className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-2xl z-40 overflow-hidden transition-all duration-500 ${
            searchOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
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
              {["UPVC Cutting", "Router Specs", "Welding Guides"].map(
                (tag, index) => (
                  <Link
                    key={index}
                    to={`/search?q=${encodeURIComponent(tag)}`}
                    className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-red-100 hover:to-red-200 hover:text-red-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                    onClick={() => setSearchOpen(false)}
                  >
                    {tag}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white/95 backdrop-blur-lg border-l border-gray-200 z-50 shadow-2xl overflow-y-auto transform transition-all duration-500 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-red-600 animate-pulse">Product</span>{" "}
              Catalog
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          <div className="space-y-4">
            {products.map((category, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-200/50 group"
              >
                <Link to={category.link} className="flex items-center">
                  <div className="mr-4 p-3 bg-white rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-200/50">
                    <span className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 inline-block">
                      {category.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {category.subItems.length} models available
                    </p>
                  </div>
                </Link>
                <div className="mt-3 pl-2 space-y-2">
                  {category.subItems.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.link}
                      className="block p-3 text-sm hover:bg-white/80 rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:shadow-md group/item"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="flex items-start">
                        <span className="mt-1 mr-3 text-red-600">
                          {item.icon}
                        </span>
                        <div>
                          <div className="font-medium text-gray-700 group-hover/item:text-red-700 transition-colors duration-300">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.desc}
                          </div>
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

      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-500 ${
          sidebarOpen || mobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onClick={() => {
          setSidebarOpen(false);
          setMobileOpen(false);
        }}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .group:hover .group-hover\\:animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </>
  );
};

export default RedLionNavbar;
