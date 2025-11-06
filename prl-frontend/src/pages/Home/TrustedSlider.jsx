import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const OurPartners = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "",
    requirements: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // <-- ADDED: State for the new details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  // <-- UPDATED: Added description and website to each partner
  const partners = [
    {
      name: "Delta",
      img: "/assets/partner-logo/delta.jpg",
      description:
        "Delta is a global leader in power and thermal management solutions. They are known for their high-efficiency power electronics and advanced automation products.",
      website: "https://www.deltaww.com",
    },
    {
      name: "LAPP",
      img: "/assets/partner-logo/lapp.jpg",
      description:
        "LAPP is a leading supplier of integrated solutions for cable and connection technology. Their products are used in manufacturing, automation, and more.",
      website: "https://www.lappgroup.com",
    },
    {
      name: "Pneumax",
      img: "/assets/partner-logo/pneumax.jpg",
      description:
        "Pneumax is a major manufacturer of components for pneumatic automation, offering a wide range of valves, cylinders, and air preparation units.",
      website: "https://www.pneumax.com",
    },
    {
      name: "RotoMotive",
      img: "/assets/partner-logo/rotomotive.jpg",
      description:
        "Rotomotive specializes in high-performance electric motors and gearboxes, providing reliable drive solutions for various industrial applications.",
      website: "https://www.rotomotive.com",
    },
    {
      name: "Schneider",
      img: "/assets/partner-logo/schneider.jpg",
      description:
        "Schneider Electric is at the forefront of digital transformation in energy management and automation, offering connected products and solutions.",
      website: "https://www.se.com",
    },
    {
      name: "Siemens",
      img: "/assets/partner-logo/siemens.jpg",
      description:
        "A technology powerhouse in electrification, automation, and digitalization. Siemens is a world leader in industrial software and automation hardware.",
      website: "https://www.siemens.com",
    },
    {
      name: "SMC",
      img: "/assets/partner-logo/smc.jpg",
      description:
        "SMC Corporation is a global leader in pneumatic technology, providing a broad range of control components and systems for industrial automation.",
      website: "https://www.smcworld.com",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    // ... (Your existing validation logic, no changes needed)
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    // ... (Your existing submit logic, no changes needed)
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      setTimeout(() => {
        setShowForm(false);
        setIsSubmitted(false);
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          industry: "",
          requirements: "",
        });
      }, 3000);
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setErrors({});
    setIsSubmitted(false);
  };

  // <-- ADDED: Handlers for the new details modal
  const handleViewDetails = (partner) => {
    setSelectedPartner(partner);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedPartner(null);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-red-100 rounded-full -translate-x-20 -translate-y-20 opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-100 rounded-full translate-x-24 translate-y-24 opacity-70 animate-bounce"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">
              Valued Partners
            </span>
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-purple-600 mx-auto mb-4 animate-expand"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading innovators in the industry to deliver
            exceptional solutions
          </p>
        </div>

        <div className="relative px-4 sm:px-6">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            // ... (All your existing Swiper props)
            grabCursor={true}
            speed={1000}
            loop={true}
            slidesPerView={5}
            slidesPerGroup={1}
            spaceBetween={30}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              className: "custom-navigation",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: ".swiper-pagination",
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 25 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
              1280: { slidesPerView: 5, spaceBetween: 30 },
            }}
            className="mySwiper"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div
                  className="bg-white p-6 rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 h-auto flex flex-col items-center justify-between border border-gray-100 hover:border-purple-200 max-w-xs mx-auto animate-slide-up" // <-- Changed to flex-col and justify-between
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="rounded-xl bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 p-3 mb-4 flex items-center justify-center shadow-inner">
                      <img
                        src={partner.img}
                        alt={partner.name}
                        className="w-32 h-24 object-contain rounded-lg hover:rotate-3 transition-transform duration-300"
                        title={partner.name}
                      />
                    </div>
                    <p className="text-base font-semibold text-gray-800 text-center hover:text-purple-600 transition-colors duration-200">
                      {partner.name}
                    </p>
                  </div>

                  {/* <-- ADDED: View Details Button --> */}
                  <button
                    onClick={() => handleViewDetails(partner)}
                    className="mt-4 px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-100 transition-all duration-200"
                  >
                    View Details
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="swiper-button-next custom-navigation-btn bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 absolute right-0 top-1/2 transform -translate-y-1/2 z-10"></div>
          <div className="swiper-button-prev custom-navigation-btn bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 absolute left-0 top-1/2 transform -translate-y-1/2 z-10"></div>

          {/* Custom Pagination */}
          <div className="swiper-pagination absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4"></div>
        </div>

        <div
          className="text-center mt-12 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-full font-semibold hover:from-red-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Become a Partner
          </button>
        </div>
      </div>

      {/* Modal Form (Your existing modal) */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform scale-100 hover:scale-105 transition-transform duration-200">
            {!isSubmitted ? (
              <>
                {/* ... (Your existing form JSX, no changes needed) ... */}
                <div className="bg-gradient-to-r from-red-600 to-purple-600 p-6 text-white">
                  <h2 className="text-2xl font-bold">Become a Partner</h2>
                  <p className="mt-2">
                    Fill out the form below and we'll get in touch with you
                    shortly.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {" "}
                  {/* Added space-y-4 for better spacing */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.companyName
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-purple-200 focus:border-purple-500"
                      }`}
                      placeholder="Enter company name"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-600 animate-pulse">
                        {errors.companyName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contactPerson"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.contactPerson
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-purple-200 focus:border-purple-500"
                      }`}
                      placeholder="Full name"
                    />
                    {errors.contactPerson && (
                      <p className="mt-1 text-sm text-red-600 animate-pulse">
                        {errors.contactPerson}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-purple-200 focus:border-purple-500"
                      }`}
                      placeholder="your@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 animate-pulse">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-purple-200 focus:border-purple-500"
                      }`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 animate-pulse">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Industry *
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.industry
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-purple-200 focus:border-purple-500"
                      }`}
                    >
                      <option value="">Select industry</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Construction">Construction</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="mt-1 text-sm text-red-600 animate-pulse">
                        {errors.industry}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="requirements"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Requirements
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 focus:outline-none transition-all duration-200"
                      placeholder="Tell us about your partnership needs"
                    />
                  </div>
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-gradient-to-r from-red-600 to-purple-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="p-8 text-center">
                {/* ... (Your existing success message JSX, no changes needed) ... */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  We've received your information and will contact you shortly.
                </p>
                <button
                  onClick={closeModal}
                  className="px-5 py-2 bg-gradient-to-r from-red-600 to-purple-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* <-- ADDED: New Partner Details Modal --> */}
      {showDetailsModal && selectedPartner && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform scale-100 transition-transform duration-200 relative">
            <button
              onClick={closeDetailsModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 p-4 rounded-xl shadow-inner mb-4 sm:mb-0">
                  <img
                    src={selectedPartner.img}
                    alt={selectedPartner.name}
                    className="w-40 h-32 object-contain rounded-lg"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedPartner.name}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {selectedPartner.description}
                  </p>
                  <a
                    href={selectedPartner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center px-5 py-2 bg-gradient-to-r from-red-600 to-purple-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Visit Website
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ... (Your existing CSS, no changes needed) ... */
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-expand {
          animation: expand 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 96px; /* 6rem */
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .custom-navigation-btn {
          background-image: linear-gradient(
            to right,
            #9333ea,
            #dc2626
          ) !important;
        }
        .custom-navigation-btn:hover {
          transform: scale(1.1) !important;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 12px !important;
          color: white !important;
        }
        .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 0.5 !important;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #dc2626, #9333ea) !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default OurPartners;