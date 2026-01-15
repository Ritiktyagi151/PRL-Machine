import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// API URLs from your environment variables
const UPVC_API_URL = `${import.meta.env.VITE_API_BASE_URL}/upvcmachines`;
const ALUMINUM_API_URL = `${
  import.meta.env.VITE_API_BASE_URL
}/aluminum-machines`;

const MachineCategoryPage = () => {
  const [upvcData, setUpvcData] = useState([]);
  const [aluminumData, setAluminumData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Backend APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [upvcRes, alumRes] = await Promise.all([
          fetch(UPVC_API_URL),
          fetch(ALUMINUM_API_URL),
        ]);
        const upvcJson = await upvcRes.json();
        const alumJson = await alumRes.json();
        setUpvcData(upvcJson);
        setAluminumData(alumJson);
      } catch (err) {
        console.error("Error fetching machinery data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const pvcSwiperRef = useRef(null);
  const aluminumSwiperRef = useRef(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#46266A]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Banner - Updated Color to Purple/Red Gradient */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-[#46266A] to-[#FB252E] text-white mt-10 py-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Industrial-Grade Window Machinery Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light max-w-3xl mx-auto">
              Precision-engineered uPVC and aluminum processing equipment for
              modern manufacturing facilities
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* uPVC Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="py-8 container mx-auto px-4"
      >
        <motion.div variants={slideUp} className="text-center mb-8">
          <span className="text-[#FB252E] font-semibold uppercase tracking-wider mb-4 inline-block">
            Precision Engineering
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            uPVC Window Machinery
          </h2>
          <div className="w-20 h-1 bg-[#46266A] mx-auto"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            variants={scaleUp}
            className="lg:w-1/2 relative overflow-hidden rounded-xl shadow-xl"
          >
            <img
              src="https://as1.ftcdn.net/v2/jpg/05/55/96/26/1000_F_555962661_HbaLVSx2dIeZ1oGTqVtl5bbMpZtqUOie.jpg"
              alt="uPVC Window Machines"
              className="w-full h-[55vh]"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#46266A]/90 to-transparent p-8"
            >
              <h3 className="text-white text-2xl font-bold">
                High-Efficiency uPVC Solutions
              </h3>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeIn} className="lg:w-1/2">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our uPVC window machinery portfolio includes cutting-edge welding,
              cutting and processing equipment designed for high-volume
              production with consistent quality. Engineered for precision and
              durability.
            </p>

            <motion.ul variants={staggerItems} className="space-y-4 mb-8">
              {[
                "Fully automated operation modes",
                "CNC-controlled precision",
                "Energy-efficient designs",
                "Low maintenance requirements",
                "Integrated safety systems",
                "Integrated safety systems",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={slideUp}
                  className="flex items-start"
                >
                  <span className="bg-red-100 text-[#FB252E] rounded-full p-1 mr-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products/upvcwindowmachines">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-[#46266A] text-white px-6 py-3 rounded-lg hover:bg-[#5a3188] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Explore uPVC Machines <ArrowRight className="ml-3" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-white text-[#46266A] border border-[#46266A] px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" /> Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* uPVC Product Slider - Backend API Integrated */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="py-8 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={slideUp}
            className="flex flex-col md:flex-row justify-between items-center mb-12"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                uPVC Machinery Portfolio
              </h3>
              <p className="text-gray-600">
                High-performance solutions for every production need
              </p>
            </div>
            <Link to="/products/upvcwindowmachines">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-[#FB252E] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 mt-4 md:mt-0"
              >
                View All <ArrowRight className="ml-3" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={staggerItems}>
            <Swiper
              ref={pvcSwiperRef}
              slidesPerView={1}
              spaceBetween={30}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              modules={[Navigation, Pagination, Autoplay]}
              className="mySwiper pb-12"
            >
              {upvcData.map((product) => (
                <SwiperSlide key={product._id || product.id}>
                  <motion.div
                    variants={scaleUp}
                    className="relative group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col"
                  >
                    {/* Mirror Shine Effect */}
                    <span className="absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[100%] z-20 pointer-events-none"></span>

                    <div className="overflow-hidden h-48 relative">
                      <img
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <h4 className="font-bold text-lg mb-3 text-gray-800">
                        {product.name}
                      </h4>
                      <Link
                        to={`/productdetailupvc/${product.id || product._id}`}
                      >
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="flex items-center text-[#FB252E] font-semibold"
                        >
                          View Details{" "}
                          <ArrowRight className="ml-2 transition-transform" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </motion.section>

      {/* Aluminum Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="py-8 bg-[#46266A] text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={slideUp} className="text-center mb-16">
            <span className="text-red-400 font-semibold uppercase tracking-wider mb-4 inline-block">
              Heavy-Duty Performance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Aluminum Window Machinery
            </h2>
            <div className="w-20 h-1 bg-[#FB252E] mx-auto"></div>
          </motion.div>

          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <motion.div
              variants={scaleUp}
              className="lg:w-1/2 relative overflow-hidden rounded-xl shadow-xl"
            >
              <img
                src="https://as2.ftcdn.net/v2/jpg/11/47/87/93/1000_F_1147879368_s583WHuONdWrP2ypW8gE3r9B5sp1xdq4.jpg"
                alt="Aluminum Window Machines"
                className="w-full h-[55vh]"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8"
              >
                <h3 className="text-white text-2xl font-bold">
                  Industrial Aluminum Processing
                </h3>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeIn} className="lg:w-1/2">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Our aluminum machinery range delivers exceptional precision for
                modern window systems. Robust construction combined with
                advanced CNC technology ensures optimal performance.
              </p>

              <motion.ul variants={staggerItems} className="space-y-4 mb-8">
                {[
                  "High-torque cutting power",
                  "Multi-axis CNC control",
                  "Automated material handling",
                  "Dust extraction systems",
                  "Energy-saving operation modes",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={slideUp}
                    className="flex items-start"
                  >
                    <span className="bg-red-400/20 text-[#FB252E] rounded-full p-1 mr-3">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products/aluminumwindowmachines">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center bg-[#FB252E] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Explore Aluminum Machines <ArrowRight className="ml-3" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-transparent text-white border border-white px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" /> Watch Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Aluminum Product Slider - Backend API Integrated */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={slideUp}
            className="flex flex-col md:flex-row justify-between items-center mb-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Aluminum Machinery Portfolio
              </h3>
              <p className="text-gray-600">
                Precision solutions for aluminum fabrication
              </p>
            </div>
            <Link to="/products/aluminumwindowmachines">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-[#46266A] text-white px-6 py-3 rounded-lg hover:bg-[#5a3188] transition-all duration-300 mt-4 md:mt-0"
              >
                View All <ArrowRight className="ml-3" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={staggerItems}>
            <Swiper
              ref={aluminumSwiperRef}
              slidesPerView={1}
              spaceBetween={30}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              modules={[Navigation, Pagination, Autoplay]}
              className="mySwiper pb-12"
            >
              {aluminumData.map((product) => (
                <SwiperSlide key={product._id || product.id}>
                  <motion.div
                    variants={scaleUp}
                    className="relative group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col"
                  >
                    {/* Mirror Shine Effect */}
                    <span className="absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[100%] z-20 pointer-events-none"></span>

                    <div className="overflow-hidden h-48 relative">
                      <img
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <h4 className="font-bold text-lg mb-3 text-gray-800">
                        {product.name}
                      </h4>
                      <Link
                        to={`/productdetailaluminium/${
                          product.id || product._id
                        }`}
                      >
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="flex items-center text-[#46266A] font-semibold"
                        >
                          View Details{" "}
                          <ArrowRight className="ml-2 transition-transform" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="py-8 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={slideUp} className="text-center mb-8">
            <span className="text-[#46266A] font-semibold uppercase tracking-wider mb-4 inline-block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry-Leading Technology
            </h2>
            <div className="w-20 h-1 bg-[#FB252E] mx-auto"></div>
          </motion.div>

          <motion.div
            variants={staggerItems}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                title: "Precision Engineering",
                description:
                  "Our machines are built with micron-level precision for consistent, high-quality output.",
                color: "#46266A",
              },
              {
                title: "Smart Automation",
                description:
                  "Advanced CNC controls and automation features maximize productivity and minimize errors.",
                color: "#FB252E",
              },
              {
                title: "Durable Construction",
                description:
                  "Heavy-duty steel frames and premium components ensure long service life in demanding environments.",
                color: "#46266A",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4"
                style={{ borderTopColor: feature.color }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="py-8 bg-[#46266A] text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={staggerItems}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "250+", label: "Machines Installed" },
              { number: "98%", label: "Customer Satisfaction" },
              { number: "24/7", label: "Technical Support" },
              { number: "15+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div key={index} variants={slideUp}>
                <p className="text-4xl md:text-5xl font-bold mb-3 text-[#FB252E]">
                  {stat.number}
                </p>
                <p className="text-lg opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section - Purple Red Gradient */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="py-8 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={scaleUp}
            className="bg-gradient-to-r from-[#46266A] to-[#FB252E] rounded-2xl p-12 text-center shadow-xl text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Production?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Contact our experts today to discuss your requirements and
              discover the perfect machinery solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white text-[#46266A] px-8 py-4 rounded-lg font-bold"
              >
                Request Consultation
              </motion.button>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default MachineCategoryPage;
