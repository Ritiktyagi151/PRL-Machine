import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../../utils/motion";

const OurCompanyPage = () => {
  const location = useLocation();

  const menuItems = [
    { path: "about", name: "About Us" },
    { path: "faq", name: "FAQ" },
    { path: "ourblogs", name: "Our Blogs" },
    { path: "team", name: "Our Team" },
    { path: "news", name: "News" },
    { path: "missionvision", name: "Mission & Vision" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-11">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="relative h-[50vh] w-full overflow-hidden"
      >
        {/* Background Video */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/vedios/HomePageVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-red-900/80"></div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-purple-400 opacity-20"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-1/3 right-1/3 w-12 h-12 rounded-full bg-red-400 opacity-20"
        />

        {/* Content */}
        <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
          <motion.div
            variants={staggerContainer(0.1, 0.3)}
            className="text-center md:text-left max-w-3xl"
          >
            <motion.h1
              variants={textVariant(0.2)}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              About <span className="text-red-300">Parida Red Lion</span>
            </motion.h1>
            <motion.p
              variants={textVariant(0.4)}
              className="text-xl md:text-2xl text-gray-100 mb-8"
            >
              Pioneering Excellence in uPVC & Aluminium Window Machinery
            </motion.p>
            <motion.div variants={fadeIn("up", "tween", 0.6, 1)}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              ></motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Fixed Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-32 space-y-8">
                <div
                  className="bg-white rounded-xl shadow-lg overflow-hidden border"
                  style={{ borderColor: "#EC1C24" }}
                >
                  <div
                    className="px-6 py-4 text-white"
                    style={{ backgroundColor: "#281E5A" }}
                  >
                    <h2 className="text-xl font-semibold">Our Company</h2>
                  </div>
                  <ul className="divide-y" style={{ borderColor: "#EC1C24" }}>
                    {menuItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={`/ourcompany/${item.path}`}
                          className={`block px-6 py-3 transition duration-150 ${
                            location.pathname === `/ourcompany/${item.path}`
                              ? "font-medium border-l-4 text-black"
                              : "text-gray-700 hover:text-black"
                          }`}
                          style={{
                            backgroundColor:
                              location.pathname === `/ourcompany/${item.path}`
                                ? "#F3F4F6" // Gray background
                                : "transparent",
                            borderColor:
                              location.pathname === `/ourcompany/${item.path}`
                                ? "#281E5A"
                                : "transparent",
                          }}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar Image */}
                <div
                  className="bg-white rounded-xl shadow-lg overflow-hidden p-4 border"
                  style={{ borderColor: "#EC1C24" }}
                >
                  <img
                    src="/assets/Aboutimg/factory-worker-working-industrial-production-line.jpg"
                    alt="Manufacturing Facility"
                    className="w-full h-48 object-fill rounded-lg mb-4"
                  />
                  <h3
                    className="font-semibold text-center"
                    style={{ color: "#281E5A" }}
                  >
                    Our State-of-the-Art Facility
                  </h3>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    10,000 sq. ft. manufacturing plant in Greater Noida
                  </p>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4">
              <div
                className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8 border"
                style={{ borderColor: "#EC1C24" }}
              >
                <div className="mb-6">
                  <h2
                    className="text-2xl font-bold text-gray-900 border-b pb-2"
                    style={{ borderColor: "#EC1C24" }}
                  >
                    Discover Parida Red Lion India Pvt Ltd
                  </h2>
                </div>

                {/* Nested Route Content */}
                <Outlet />
              </div>

              {/* Culture CTA with Image */}
              <div className="mt-8 rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div
                    className="md:w-1/2 p-8 text-white"
                    style={{ backgroundColor: "#281E5A" }}
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      Our Commitment to Excellence
                    </h3>
                    <p className="mb-6 opacity-90">
                      At Parida Red Lion, we believe in innovation, precision
                      engineering, and customer satisfaction. Our mission is to
                      empower window and door manufacturers with reliable,
                      cost-effective machinery that enhances productivity and
                      meets diverse fabrication needs. With years of industry
                      experience, ensuring our machines deliver unmatched
                      efficiency, durability, and performance. At Parida Red
                      Lion, we don’t just build machines; we build long-term
                      partnerships founded on trust, innovation, and customer
                      success.
                    </p>
                    <Link to="/contact">
                      <button
                        className="px-6 py-2 rounded-lg font-medium transition text-white"
                        style={{ backgroundColor: "#EC1C24" }}
                      >
                        Contact Us
                      </button>
                    </Link>
                  </div>
                  <div className="md:w-1/2">
                    <img
                      src="/assets/Aboutimg/Our-Commitment-Excellence.jpg"
                      alt="Team Collaboration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Quality Assurance with Image */}
              <div
                className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden p-6 border"
                style={{ borderColor: "#EC1C24" }}
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <img
                      src="/assets/Aboutimg/support.jpg"
                      alt="Quality Control"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ color: "#281E5A" }}
                    >
                      Quality & Support
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4
                          className="font-semibold mb-2"
                          style={{ color: "#EC1C24" }}
                        >
                          Quality Standards
                        </h4>
                        <p className="text-sm" style={{ color: "#281E5A" }}>
                          We adhere to the highest industry standards,
                          delivering machines trusted for their reliability and
                          performance. All our products undergo rigorous quality
                          checks to ensure durability and precision.
                        </p>
                      </div>
                      <div>
                        <h4
                          className="font-semibold mb-2"
                          style={{ color: "#EC1C24" }}
                        >
                          After-Sales Support
                        </h4>
                        <p className="text-sm" style={{ color: "#281E5A" }}>
                          Our comprehensive support includes training, spare
                          parts availability, and technical assistance to ensure
                          maximum uptime and operational success for our
                          customers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurCompanyPage;
