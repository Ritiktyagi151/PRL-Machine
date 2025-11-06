import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative py-8 text-white overflow-hidden bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: 'url("/assets/Aboutimg/about-for-bg.png")',
      }}
    >
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image Column */}
            <motion.div className="lg:w-1/2 w-full" variants={imageVariants}>
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                <img
                  src="/assets/Aboutimg/about.png"
                  alt="Red Lion Manufacturing"
                  className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover rounded-2xl shadow-lg border border-white/20 transform transition-all duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>

            {/* Text Column */}
            <motion.div
              className="lg:w-1/2 w-full text-center lg:text-left"
              variants={itemVariants}
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6"
                variants={itemVariants}
              >
                <span className="font-normal">About</span>{" "}
                <span className="text-red-500 font-medium">Red</span> Lion
              </motion.h2>

              <motion.div className="mb-6" variants={itemVariants}>
                <div className="w-16 h-[2px] bg-red-500 mb-6 mx-auto lg:mx-0"></div>
                <div className="space-y-4 leading-relaxed text-gray-200">
                  <p>
                    PARIDA RED LION INDIA PVT LTD (PRL) is a leading
                    manufacturer of uPVC Aluminium window-making machines,
                    dedicated to delivering innovative, high-quality solutions
                    for the fabrication industry.
                  </p>
                  <p>
                    Established in 2017 & entered uPVC & Aluminium Machine
                    Manufacturing in 2022, our manufacturing facility is located
                    in Greater Noida, focusing on innovation and sustainability.
                  </p>
                </div>
              </motion.div>

              <Link to="/ourcompany/about">
                <motion.button
                  className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More About Us
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
