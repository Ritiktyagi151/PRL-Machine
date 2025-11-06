import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaTools,
  FaIndustry,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// 🔹 FIX: API_URL ko component se bahar move kiya aur uncomment kiya
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// 🔹 FIX: Default data function ko component se bahar move kiya
// Taa ki yeh har render par re-create na ho.
const getDefaultFooterData = () => {
  return {
    logo: "/assets/logo/parida-red-new-logo.jpg",
    description:
      "PARIDA RED LION INDIA PVT LTD (PRL) is a leading manufacturer of uPVC Aluminium window making machines, dedicated to delivering innovative, high-quality solutions for the uPVC & Aluminium window and door fabrication industry.",
    socialLinks: [
      { icon: "facebook", link: "https://facebook.com" },
      { icon: "twitter", link: "https://twitter.com" },
      { icon: "linkedin", link: "https://linkedin.com" },
      { icon: "instagram", link: "https://instagram.com" },
      { icon: "youtube", link: "https://youtube.com" },
    ],
    quickLinks: [
      { name: "About Us", link: "/about" },
      { name: "Case Studies", link: "/casestudies" },
      { name: "Careers", link: "/careers" },
      { name: "Blogs", link: "/blogs" },
      { name: "Services", link: "/services/machine-customization" },
      { name: "Contact Us", link: "/contact" },
      { name: "Admin Login", link: "/admin", target: "_blank" },
    ],
    contactInfo: {
      address:
        "PARIDA RED LION INDIA PVT LTD GST NO - 09AAJCP6402H1ZC Address - Plot No-106 ,Ecotec -3 Udhyog Kendra-1 ,Greater Noida Gautambuddha Nagar ,Uttar Pradesh ,201306",
      phone: "+917065500903",
      email: "r.k.parida015@gmail.com",
    },
    products: [
      {
        name: "uPVC Window Machine",
        icon: "tools",
        link: "/products/upvcwindowmachines",
        subItems: [
          {
            name: "uPVC Welding Machine",
            icon: "tools",
            link: "/products/upvcwindowmachines",
          },
          {
            name: "uPVC Cutting Machine",
            icon: "tools",
            link: "/products/upvcwindowmachines",
          },
          {
            name: "uPVC Cleaning Machine",
            icon: "tools",
            link: "/products/upvcwindowmachines",
          },
          {
            name: "uPVC Copy Router & Lock Hole Machine",
            icon: "tools",
            link: "/products/upvcwindowmachines",
          },
          {
            name: "uPVC Glazing Bead Cutting Machine",
            icon: "tools",
            link: "/products/upvcwindowmachines",
          },
          {
            name: "uPVC Drainage Water Slot Machine",
            icon: "tools",
            link: "/products/upvcwindowmachines",
          },
          {
            name: "uPVC Mullion Cutting Machine",
            icon: "tools",
            link: "/products/upvcwindowmachines",
          },
          {
            name: "uPVC Interlock punching (IPL-300)",
            icon: "tools",
            link: "/products/upvcwindowmachines",
          },
          {
            name: "Other Special Machine",
            icon: "tools",
            link: "/products/upvcwindowmachines",
          },
        ],
      },
      {
        name: "Aluminum Window Machine",
        icon: "industry",
        link: "/products/aluminumwindowmachines",
        subItems: [
          {
            name: "Aluminum Cutting Machine",
            desc: "Precision cutting of aluminum profiles",
            icon: "industry",
            link: "/products/aluminumwindowmachines",
          },
          {
            name: "Aluminum Lock Hole Machine",
            desc: "Routing and drilling lock slots in aluminum",
            icon: "industry",
            link: "/products/aluminumwindowmachines",
          },
          {
            name: "Aluminum Mullion Machine",
            desc: "Designed to cut aluminum mullions accurately",
            icon: "industry",
            link: "/products/aluminumwindowmachines",
          },
          {
            name: "Aluminum Punching & Crimping Machine",
            desc: "Punch and crimp aluminum frames with precision",
            icon: "industry",
            link: "/products/aluminumwindowmachines",
          },
        ],
      },
    ],
  };
};

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch footer data from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // 🔹 FIX: Ab yeh API_URL defined hai aur API call hogi
        const response = await axios.get(`${API_URL}/footer`);
        // Ensure all required fields exist in the response
        const data = response.data || {};
        const defaultData = getDefaultFooterData();

        // Merge API data with default data to ensure all properties exist
        const mergedData = {
          logo: data.logo || defaultData.logo,
          description: data.description || defaultData.description,
          socialLinks: data.socialLinks || defaultData.socialLinks,
          quickLinks: data.quickLinks || defaultData.quickLinks,
          contactInfo: data.contactInfo || defaultData.contactInfo,
          products: data.products || defaultData.products,
        };

        // Ensure socialLinks have the correct structure
        if (mergedData.socialLinks && mergedData.socialLinks.length > 0) {
          mergedData.socialLinks = mergedData.socialLinks.map((social) => ({
            // 🔹 FIX: Admin se 'name' aa sakta hai ya default se 'icon', dono ko handle karega
            icon: social.icon || social.name || "facebook",
            link: social.link || "#",
          }));
        }

        setFooterData(mergedData);
      } catch (error) {
        console.error("Error fetching footer data:", error);
        // Fallback to default data if API fails
        setFooterData(getDefaultFooterData());
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []); // Empty dependency array is correct

  // Render icon based on string name
  const renderIcon = (iconName, className = "text-red-600") => {
    if (!iconName) {
      return <FaTools className={className} />;
    }
    switch (iconName.toLowerCase()) {
      case "facebook":
        return <FaFacebook className={className} />;
      case "twitter":
        return <FaTwitter className={className} />;
      case "linkedin":
        return <FaLinkedin className={className} />;
      case "instagram":
        return <FaInstagram className={className} />;
      case "youtube":
        return <FaYoutube className={className} />;
      case "tools":
        return <FaTools className={className} />;
      case "industry":
        return <FaIndustry className={className} />;
      default:
        return <FaTools className={className} />;
    }
  };

  if (loading) {
    return (
      <footer className="bg-gray-100 py-10 text-center">
        <div className="container mx-auto">Loading footer...</div>
      </footer>
    );
  }

  // Ensure footerData is not null and has all required properties
  if (!footerData) {
    return (
      <footer className="bg-gray-100 py-10 text-center">
        <div className="container mx-auto">Failed to load footer content.</div>
      </footer>
    );
  }

  return (
    <footer
      className="relative mt-7 rounded-tl-[100px] rounded-tr-[100px] bg-cover border border-purple-500 text-[#312674] pt-10 pb-10"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/white-abstract-background-theme_23-2148831659.jpg')",
      }}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        {/* Modified grid layout with responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 xl:gap-12">
          {/* Company Description - full width on mobile, then 1 column */}
          <div className="md:col-span-2 lg:col-span-1 animate-fade-in">
            <div className="flex items-center mb-6 group">
              <Link to="/">
                <img
                  src={footerData.logo}
                  alt="Parida Red Lion Logo"
                  className="w-auto h-16 object-contain"
                />
              </Link>
            </div>
            <p className="text-[#312674]/80 mb-6 leading-relaxed text-sm sm:text-base">
              {footerData.description}
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {footerData.socialLinks &&
                footerData.socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    to={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#312674] rounded-full text-white hover:bg-[#FC252E] transition-all duration-500 transform hover:-translate-y-2 hover:scale-110 hover:shadow-lg hover:shadow-[#FC252E]/30 social-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* 🔹 FIX: Yahaan 'social.icon' ka istemaal karein (jo humne merge logic mein banaya hai) */}
                    {renderIcon(social.icon, "text-white")}
                  </Link>
                ))}
            </div>
          </div>

          {/* Quick Links - full width on mobile, then 1 column */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 relative inline-block group text-[#312674]">
              Quick Links
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#FC252E] to-[#312674] transition-all duration-500 group-hover:w-full rounded-full"></span>
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerData.quickLinks &&
                footerData.quickLinks.map((item, index) => (
                  <li
                    key={item.name}
                    className="link-hover-effect"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    {item.target === "_blank" ? (
                      // 👉 External / open in new tab
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base text-[#312674]/80 hover:text-[#FC252E] flex items-center transition-all duration-300 group transform hover:translate-x-2"
                      >
                        <FiArrowUpRight className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#FC252E] transform group-hover:rotate-45" />
                        <span className="relative overflow-hidden">
                          {item.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FC252E] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </a>
                    ) : (
                      // 👉 Internal link
                      <Link
                        to={item.link}
                        className="text-sm sm:text-base text-[#312674]/80 hover:text-[#FC252E] flex items-center transition-all duration-300 group transform hover:translate-x-2"
                      >
                        <FiArrowUpRight className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#FC252E] transform group-hover:rotate-45" />
                        <span className="relative overflow-hidden">
                          {item.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FC252E] transition-all duration-300 group-hover:w-full"></span>
	                    </span>
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          {/* Products Section - full width on mobile, spans 2 columns on larger screens */}
          <div
            className="md:col-span-2 lg:col-span-2 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 relative inline-block group text-[#312674]">
              Our Products
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#FC252E] to-[#312674] transition-all duration-500 group-hover:w-full rounded-full"></span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {footerData.products &&
                footerData.products.map((product, index) => (
                  <div key={index} className="group">
                    <Link
                      to={product.link}
                      className="flex items-center mb-2 sm:mb-3"
                    >
                      <div className="mr-2 sm:mr-3 text-[#FC252E] group-hover:animate-pulse">
                        {renderIcon(product.icon)}
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base text-[#312674] group-hover:text-[#FC252E] transition-colors duration-300">
                        {product.name}
                      </h4>
                    </Link>
                    <ul className="space-y-2 sm:space-y-3 pl-7 sm:pl-9">
                      {product.subItems &&
                        product.subItems.map((item, subIndex) => (
                          <li
                            key={subIndex}
                            className="text-xs sm:text-sm text-[#312674]/80 hover:text-[#FC252E] transition-colors duration-300 transform hover:translate-x-1"
                            style={{ animationDelay: `${0.05 * subIndex}s` }}
                          >
                            <Link
                              to={item.link}
                              className="flex items-start group"
                            >
                              <span className="w-1 h-1 bg-[#FC252E] rounded-full mr-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                              <div>
                                <div className="font-medium">{item.name}</div>
                                {item.desc && (
                                  <div className="text-xs text-[#312674]/60">
                                    {item.desc}
                                  </div>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>

          {/* Contact Us - full width on mobile, then 1 column */}
          <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 relative inline-block group text-[#312674]">
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#FC252E] to-[#312674] transition-all duration-500 group-hover:w-full rounded-full"></span>
            </h3>
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-start group contact-item-hover">
                <div className="bg-gradient-to-br from-[#FC252E]/20 to-[#312674]/20 p-2 sm:p-3 rounded-xl mr-3 sm:mr-4 transform transition-all duration-300 group-hover:scale-110 group-hover:from-[#FC252E]/30 group-hover:to-[#312674]/30">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#FC252E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm text-[#312674]/80 group-hover:text-[#312674] transition-colors duration-300">
                  {footerData.contactInfo && footerData.contactInfo.address}
                </span>
              </li>
              <li className="flex items-center group contact-item-hover">
                <div className="bg-gradient-to-br from-[#FC252E]/20 to-[#312674]/20 p-2 sm:p-3 rounded-xl mr-3 sm:mr-4 transform transition-all duration-300 group-hover:scale-110 group-hover:from-[#FC252E]/30 group-hover:to-[#312674]/30">
                  <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 text-[#FC252E]" />
                </div>
                <Link
                  to={`tel:${
                    footerData.contactInfo && footerData.contactInfo.phone
                  }`}
                  className="text-xs sm:text-sm text-[#312674]/80 hover:text-[#FC252E] transition-colors duration-300 transform hover:scale-105"
is             >
                  {footerData.contactInfo && footerData.contactInfo.phone}
                </Link>
              </li>
              <li className="flex items-center group contact-item-hover">
                <div className="bg-gradient-to-br from-[#FC252E]/20 to-[#312674]/20 p-2 sm:p-3 rounded-xl mr-3 sm:mr-4 transform transition-all duration-300 group-hover:scale-110 group-hover:from-[#FC252E]/30 group-hover:to-[#312674]/30">
                  <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 text-[#FC252E]" />
                </div>
                <Link
                  to={`mailto:${
                    footerData.contactInfo && footerData.contactInfo.email
                  }`}
                  className="text-xs sm:text-sm text-[#312674]/80 hover:text-[#FC252E] transition-colors duration-300 transform hover:scale-105"
                >
                  {footerData.contactInfo && footerData.contactInfo.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="border-t border-[#312674]/20 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <p className="text-xs sm:text-sm text-[#312674]/70 mb-3 md:mb-0">
            © {new Date().getFullYear()} Parida Red Lion. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-8">
            <p className="text-xs sm:text-sm">
              Design and Developed By{" "}
              <Link className="text-red-500 hover:text-red-600" to="/">
                Jaikvik Technology India Pvt Ltd
              </Link>{" "}
            </p>
          </div>
        </div>
    	</div>

      <style jsx>{`
        @media (max-width: 767px) {
          footer {
            border-radius: 50px 50px 0 0;
          }
        }

        @media (min-width: 768px) and (max-width: 1199px) {
          footer {
            border-radius: 80px 80px 0 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes floatReverse {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-3deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.1;
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
          	transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
          	transform: translateY(0);
          }
        }

        @keyframes socialBounce {
          0%,
          20%,
          50%,
          80%,
          100% {
          	transform: translateY(0);
          }
          40% {
          	transform: translateY(-10px);
          }
          60% {
          	transform: translateY(-5px);
          }
        }

        .floating-circle {
          animation: float 6s ease-in-out infinite;
        }

        .floating-circle-2 {
          animation: floatReverse 8s ease-in-out infinite;
          animation-delay: -2s;
        }

        .floating-circle-3 {
          animation: float 10s ease-in-out infinite;
          animation-delay: -4s;
        }

        .pulse-ring {
          animation: pulse 4s ease-in-out infinite;
        }

        .wave-animation {
          animation: wave 8s linear infinite;
      	}

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: slideUp 1.2s ease-out forwards;
          opacity: 0;
        }

        .social-bounce:hover {
          animation: socialBounce 0.8s ease;
        }

        .link-hover-effect {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

      	.contact-item-hover {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
      	}

      	.contact-item-hover:nth-child(1) {
          animation-delay: 0.1s;
      	}
      	.contact-item-hover:nth-child(2) {
        	animation-delay: 0.2s;
      	}
      	.contact-item-hover:nth-child(3) {
        	animation-delay: 0.3s;
      	}
      `}</style>
    </footer>
  );
};

export default Footer;