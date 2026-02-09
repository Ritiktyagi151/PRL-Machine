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
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// 1. Manual Quick Links (Ab ye code se aayenge)
const manualQuickLinks = [
  { name: "About Us", link: "/about" },
  { name: "Case Studies", link: "/casestudies" },
  { name: "Careers", link: "/careers" },
  { name: "Blogs", link: "/blogs" },
  { name: "Services", link: "/services/machine-customization" },
  { name: "Contact Us", link: "/contact" },
  { name: "Admin Login", link: "/admin", target: "_blank" },
  { name: "Privacy Policy", link: "/privacypolicy" },
  { name: "Terms & Conditions", link: "/termsandconditions" },
];

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
    contactInfo: {
      address:
        "PARIDA RED LION INDIA PVT LTD GST NO - 09AAJCP6402H1ZC Address - Khasra No 295, Jalpura, Greater Noida, Gautam buddha Nagar ,Uttar Pradesh, 201306",
      phone: "+917065500903",
      email: "prlinquiry@gmail.com",
    },
    products: [
      {
        name: "uPVC Window Machine",

        icon: "tools",

        link: "/products/upvcwindowmachines",

        subItems: [
          {
            name: "uPVC Welding Machine",

            link: "/products/upvcwindowmachines",
          },

          {
            name: "uPVC Cutting Machine",

            link: "/products/upvcwindowmachines",
          },

          {
            name: "uPVC Cleaning Machine",

            link: "/products/upvcwindowmachines",
          },

          {
            name: "uPVC Copy Router & Lock Hole Machine",

            link: "/products/upvcwindowmachines",
          },

          {
            name: "Other Special Machine",

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

            link: "/products/aluminumwindowmachines",
          },

          {
            name: "Aluminum Lock Hole Machine",

            link: "/products/aluminumwindowmachines",
          },

          {
            name: "Aluminum Mullion Machine",

            link: "/products/aluminumwindowmachines",
          },

          {
            name: "Aluminum Punching & Crimping Machine",

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

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(`${API_URL}/footer`);
        const data = response.data || {};
        const defaultData = getDefaultFooterData();

        const mergedData = {
          logo: data.logo || defaultData.logo,
          description: data.description || defaultData.description,
          socialLinks: data.socialLinks || defaultData.socialLinks,
          // quickLinks: data.quickLinks || defaultData.quickLinks, // Is line ki ab zaroorat nahi
          contactInfo: data.contactInfo || defaultData.contactInfo,
          products: data.products || defaultData.products,
        };

        if (mergedData.socialLinks && mergedData.socialLinks.length > 0) {
          mergedData.socialLinks = mergedData.socialLinks.map((social) => ({
            icon: social.icon || social.name || "facebook",
            link: social.link || "#",
          }));
        }

        setFooterData(mergedData);
      } catch (error) {
        console.error("Error fetching footer data, using default:", error);
        setFooterData(getDefaultFooterData());
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const renderIcon = (iconName, className = "") => {
    if (!iconName) return <FaTools className={className} />;
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

  if (loading || !footerData) {
    return (
      <div className="bg-gray-50 py-12 text-center text-gray-500">
        Loading Footer...
      </div>
    );
  }

  return (
    <footer className="relative mt-12 bg-gray-50 text-[#312674] pt-16 pb-8 border-t border-gray-200 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-3 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={footerData.logo}
                alt="Brand Logo"
                className="h-16 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <p className="text-gray-600 leading-relaxed text-sm pr-4 text-justify">
              {footerData.description}
            </p>
            <div className="flex gap-3 flex-wrap">
              {footerData.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-[#312674] shadow-sm transition-all duration-300 hover:bg-[#FC252E] hover:text-white hover:-translate-y-1 hover:shadow-md"
                >
                  {renderIcon(social.icon, "text-lg")}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Using manualQuickLinks instead of API) */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-[#312674] mb-6 border-l-4 border-[#FC252E] pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {manualQuickLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    target={item.target || "_self"}
                    className="group flex items-center text-gray-600 hover:text-[#FC252E] transition-colors duration-200"
                  >
                    <FiChevronRight className="mr-2 text-gray-400 group-hover:text-[#FC252E] transition-transform duration-200 group-hover:translate-x-1" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-bold text-[#312674] mb-6 border-l-4 border-[#FC252E] pl-3">
              Our Products
            </h3>
            <div className="space-y-8">
              {footerData.products.map((product, index) => (
                <div key={index} className="group">
                  <Link
                    to={product.link}
                    className="flex items-center gap-2 font-bold text-[#312674] hover:text-[#FC252E] transition-colors mb-3"
                  >
                    <span className="text-[#FC252E] bg-red-50 p-1.5 rounded-md">
                      {renderIcon(product.icon, "text-sm")}
                    </span>
                    {product.name}
                  </Link>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pl-2 border-l-2 border-gray-100 ml-3">
                    {product.subItems &&
                      product.subItems.map((sub, idx) => (
                        <li key={idx}>
                          <Link
                            to={sub.link}
                            className="flex items-start text-sm text-gray-500 hover:text-[#FC252E] group/item transition-all duration-200"
                          >
                            <span className="mt-1.5 w-1 h-1 bg-gray-300 rounded-full mr-2 group-hover/item:bg-[#FC252E]"></span>
                            <span className="hover:translate-x-1 transition-transform duration-200">
                              {sub.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-[#312674] mb-6 border-l-4 border-[#FC252E] pl-3">
              Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="mt-1 min-w-[32px] h-8 flex items-center justify-center rounded bg-red-50 text-[#FC252E]">
                  <FaMapMarkerAlt />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {footerData.contactInfo.address}
                </p>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 flex items-center justify-center rounded bg-red-50 text-[#FC252E] group-hover:bg-[#FC252E] group-hover:text-white transition-colors duration-300">
                  <FaPhone />
                </div>
                <a
                  href={`tel:${footerData.contactInfo.phone}`}
                  className="text-sm font-medium text-gray-600 hover:text-[#FC252E] transition-colors"
                >
                  {footerData.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 flex items-center justify-center rounded bg-red-50 text-[#FC252E] group-hover:bg-[#FC252E] group-hover:text-white transition-colors duration-300">
                  <FaEnvelope />
                </div>
                <a
                  href={`mailto:${footerData.contactInfo.email}`}
                  className="text-sm font-medium text-gray-600 hover:text-[#FC252E] transition-colors break-all"
                >
                  {footerData.contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Parida Red Lion. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Designed & Developed by</span>
            <Link to="/" className="text-[#FC252E] font-medium hover:underline">
              Jaikvik Technology India Pvt Ltd
            </Link>
          </div>
        </div>
      </div>

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PPMDF6KM"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
    </footer>
  );
};

export default Footer;
