import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import upvcData from "../Products/data/upvc.json"; 
import aluminumData from "../Products/data/aluminium.json";

const MachineCategoryPage = () => {
  // Enhanced animation variants
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

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-black/90 text-white py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/assets/bg-img/wlding-bg.jpg')] opacity-20 bg-cover bg-center"></div>
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
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-all"
              >
                Request Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-all"
              >
                View Catalog
              </motion.button>
            </div>
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
          <span className="text-blue-600 font-semibold uppercase tracking-wider mb-4 inline-block">
            Precision Engineering
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            uPVC Window Machinery
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
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
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-8"
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
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={slideUp}
                  className="flex items-start"
                >
                  <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3">
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
                  className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Explore uPVC Machines <ArrowRight className="ml-3" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" /> Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* uPVC Product Slider */}
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
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 mt-4 md:mt-0"
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
              {upvcData.slice(0, 8).map((product) => (
                <SwiperSlide key={product.id}>
                  <motion.div
                    variants={scaleUp}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col"
                  >
                    <div className="overflow-hidden h-48 relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <h4 className="font-bold text-lg mb-3 text-gray-800">
                        {product.name}
                      </h4>
                      <Link to={`/productdetailupvc/${product.id}`}>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="flex items-center text-blue-600 font-semibold"
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
        className="py-8 bg-gray-900 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={slideUp} className="text-center mb-16">
            <span className="text-blue-400 font-semibold uppercase tracking-wider mb-4 inline-block">
              Heavy-Duty Performance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Aluminum Window Machinery
            </h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
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
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-8"
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
                    <span className="bg-blue-400/20 text-blue-400 rounded-full p-1 mr-3">
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
                    className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
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

      {/* Aluminum Product Slider */}
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
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 mt-4 md:mt-0"
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
              {aluminumData.slice(0, 8).map((product) => (
                <SwiperSlide key={product.id}>
                  <motion.div
                    variants={scaleUp}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col"
                  >
                    <div className="overflow-hidden h-48 relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <h4 className="font-bold text-lg mb-3 text-gray-800">
                        {product.name}
                      </h4>
                    </div>
                    <Link to={`/productdetailaluminium/${product.id}`}>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center text-blue-600 font-semibold"
                      >
                        View Details{" "}
                        <ArrowRight className="ml-2 transition-transform" />
                      </motion.button>
                    </Link>
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
            <span className="text-blue-600 font-semibold uppercase tracking-wider mb-4 inline-block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry-Leading Technology
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
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
                icon: (
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Smart Automation",
                description:
                  "Advanced CNC controls and automation features maximize productivity and minimize errors.",
                icon: (
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Durable Construction",
                description:
                  "Heavy-duty steel frames and premium components ensure long service life in demanding environments.",
                icon: (
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
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
        className="py-8 bg-blue-900 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={slideUp} className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Performance
            </h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
          </motion.div>

          <motion.div
            variants={staggerItems}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "250+", label: "Machines Installed" },
              { number: "98%", label: "Customer Satisfaction" },
              { number: "24/7", label: "Technical Support" },
              { number: "15+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div key={index} variants={slideUp} className="p-6">
                <motion.p
                  className="text-4xl md:text-5xl font-bold mb-3 text-blue-300"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-lg text-blue-200">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
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
            className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-12 text-center shadow-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Production?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Contact our experts today to discuss your requirements and
              discover the perfect machinery solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-all"
              >
                Request Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-all"
              >
                Call Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default MachineCategoryPage;