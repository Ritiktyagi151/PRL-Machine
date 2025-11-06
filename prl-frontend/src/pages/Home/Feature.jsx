import { motion } from "framer-motion";

const FeaturesSection = () => {
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div
      className="p-6 sm:p-8 md:p-10 lg:p-16 bg-cover"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/496402539/photo/glow-light-of-petrochemical-industry-on-sunset.jpg?s=612x612&w=0&k=20&c=IRm_h6-2jaBgg5lDkjkETveMR9pm3FaqCnhQl7LLiv8=')",
      }}
    >
      <div className="backdrop-blur-md bg-slate-200/10 rounded-3xl min-h-[80vh] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-1">
              OUR FEATURES
            </h1>
            <div className="section-subtitle">
              <h4 className="text-xl md:text-2xl font-bold text-blue-600">
                INNOVATION | DURABILITY | EXCELLENCE
              </h4>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-4 xl:gap-8"
          >
            {/* Left Column */}
            <div className="w-full lg:w-1/4 flex flex-col gap-8">
              <motion.div
                variants={featureVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                  <img
                    className="mx-auto h-16 w-24 object-contain"
                    src="/assets/extra-img/Precision-Cutting-bg-preview.png"
                    alt="Advanced Engineering"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Advanced Engineering
                </h3>
                <p className="text-gray-600">
                  We use precision engineering and high-grade materials to
                  produce auto parts that ensure superior performance and
                  reliability.
                </p>
              </motion.div>

              <motion.div
                variants={featureVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                  <img
                    className="mx-auto h-16 w-24 object-contain"
                    src="/assets/extra-img/Smart-manufacturing-automation-removebg-preview.png"
                    alt="Manufacturing Innovation"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Manufacturing Innovation
                </h3>
                <p className="text-gray-600">
                  Our automated production lines ensure consistency, accuracy,
                  and faster delivery of high-quality automotive components.
                </p>
              </motion.div>
            </div>

            {/* Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full lg:w-2/4 flex items-center justify-center my-8 lg:my-0"
            >
              <div className="relative h-64 sm:h-80 md:h-[600px] w-full">
                <img
                  className="absolute inset-0 w-full h-full object-contain animate-float"
                  src="/assets/extra-img/feature-img2.png"
                  alt="Featured"
                />
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="w-full lg:w-1/4 flex flex-col gap-8">
              <motion.div
                variants={featureVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                  <img
                    className="mx-auto h-16 w-24 object-contain"
                    src="/assets/extra-img/Machine-testing-Photoroom.png"
                    alt="Quality Assurance"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Rigorous Quality Assurance
                </h3>
                <p className="text-gray-600">
                  Every part undergoes strict testing to meet OEM standards,
                  ensuring maximum strength and longevity under real-world
                  conditions.
                </p>
              </motion.div>

              <motion.div
                variants={featureVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                  <img
                    className="mx-auto h-16 w-24 object-contain"
                    src="/assets/extra-img/Global-Machine-Solutions-removebg-preview.png"
                    alt="Customer Support"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Global Supply & Support
                </h3>
                <p className="text-gray-600">
                  We deliver our automotive components globally with dedicated
                  after-sales service, ensuring seamless client satisfaction.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Float Animation */}
        <style jsx>{`
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FeaturesSection;
