import { motion } from "framer-motion";
import { useState } from "react";
import {
  fadeIn,
  staggerContainer,
  textVariant,
  slideIn,
} from "../../utils/motion";

const AboutPage = () => {
  const [expandedOurCompany, setExpandedOurCompany] = useState(false);
  const [expandedWhoWeAre, setExpandedWhoWeAre] = useState(false);

  const ourCompanyShort = `PARIDA RED LION INDIA PVT LTD (PRL) is a leading manufacturer of uPVC Aluminium window making machines, dedicated to delivering innovative, high-quality solutions for the uPVC & Aluminium window and door fabrication industry.`;

  const ourCompanyFull = `PARIDA RED LION INDIA PVT LTD (PRL) is a leading manufacturer of uPVC Aluminium window making machines, dedicated to delivering innovative, high-quality solutions for the uPVC & Aluminium window and door fabrication industry. Established in 2017& Entered uPVC & Aluminium Machine Manufacturing Facility in 2022, our company is Manufacturing Facility Located in Greater Noida, and we pride ourselves on our commitment to excellence, precision engineering, and customer satisfaction.

By using the newest technologies that are discovered for the area of uPVC & Aluminium window and door production, PRL uPVC & ALUMINUM Window Making Machine constantly improves and updates the window and door manufacturing equipment and window machines designs according to market requirements. The uPVC & Aluminium window Making machines assortment of the company includes various models of uPVC window machines and aluminium window machines especially built for a smooth and reliable window manufacturing experience.

With over 8yr years of experience, we specialize in designing and producing a wide range of uPVC & Aluminium window manufacturing machines, including uPVC Aluminium Window Making cutting saws Machine, uPVC Corner welding machines, CNC corner cleaning, and auxiliary equipment like water slot milling and glazing bead cutting machines. Our state-of-the-art production facilities, spanning 10,000sqr ft, are equipped with advanced technology to ensure superior performance, durability, and efficiency in every machine we create.

Our mission is to empower uPVC & Aluminium window and door manufacturers with reliable, cost-effective, and user-friendly machinery that enhances productivity and meets diverse fabrication needs. We cater to both small-scale workshops and large industrial operations, offering customizable solutions tailored to specific requirements. Our uPVC & Aluminium Window Making Machine machines are designed for ease of use, low maintenance, and energy efficiency, helping our clients reduce operational costs while maintaining high-quality output.

At PRL, we prioritize innovation and sustainability. Our dedicated research and development team continuously works to improve our products, incorporating the latest advancements in automation and precision engineering. We are committed to environmentally responsible practices, ensuring our machines minimize waste and energy consumption.

We are proud to serve a Pan India & Globe clientele, with a strong presence. Our comprehensive after-sales support, including training, spare parts availability, and technical assistance, ensures our customers achieve maximum uptime and operational success., we adhere to the highest industry standards, delivering machines that are trusted worldwide for their reliability and performance.

Choose PARIDA RED LION INDIA PVT LTD (PRL) as your trusted partner for uPVC window making machinery, and let us help you build the future of window and door fabrication with precision, efficiency, and innovation.The special side of the company is thatuPVC & Aluminium window machinery are sold at affordable prices, which is one of its advantages of being the manufacturer and seller at the same time. This allows to purchase high quality uPVC & Aluminium machines door manufacturing equipment anduPVC & Aluminium window machinery not only for large companies but also for small companies as well.All production has guaranteed high quality proven by long-term experience of successful operation in a world wide market of window machinery and door machinery.`;

  const whoWeAreShort = `Established in 2017We started with nothing no funding, no facility, not even a proper workspace. Just a vision. A big one. What we lacked in money, we made up for in determination, grit, and hard work. From a small 4 person sitting office building our first prototypes with basic tools, every step of our journey was powered by belief that one day, we’d build something that matters.`;

  const whoWeAreFull = `

Today, that belief has taken shape. We now operate a full-fledged manufacturing facility of 10000sqrft, equipped with advanced machinery and run by a dedicated team of over 50 full-time professionals. From humble beginnings to a growing name in the machine manufacturing industry, our focus has never wavered: quality, innovation, and customer trust.

has grown into a reputable name in the uPVC machinery sector. Our journey began with a deep understanding of the evolving demands of the window fabrication industry and a dedication to addressing these needs through robust and intelligent machine solutions. We pride ourselves on our team of experienced engineers, designers, and technical experts who continuously push the boundaries of what's possible in uPVC machinery

We design and build high-performance machinery that empowers industries from aluminium and uPVC fabrication to advanced automation solutions. Every machine that leaves our floor carries the spirit of where we came from and where we’re headed.
We are not just a company. We are proof that big dreams, backed by hard work, can build something real. Something lasting.`;

  const expandVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="bg-gray-50 overflow-x-hidden">
      {/* Floating scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="flex justify-center py-4"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center"
        >
          <span className="text-gray-500 mb-2">Scroll Down</span>
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Section 1: Company Overview */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer()}
        className="py-6 px-6 z-30 relative"
      >
        <div className="container mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
          {/* Decorative floating elements */}
          <motion.div
            initial={{ x: -100, y: -100, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute -left-20 -top-20 w-40 h-40 py-11 rounded-full bg-purple-500 blur-3xl"
          />
          <motion.div
            initial={{ x: 100, y: 100, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full bg-red-500 blur-3xl"
          />

          <div className="flex flex-col md:flex-row">
            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className="md:w-1/2 relative"
            >
              <img
                src="/assets/Aboutimg/parida-image.png"
                alt="PRL Manufacturing Facility"
                className="w-full rounded-2xl h-full object-cover min-h-[400px]"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl border-2 border-purple-200"
              >
                <div className="text-4xl font-bold text-purple-600">12+</div>
                <div className="text-gray-600">Years Experience</div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={slideIn("right", "tween", 0.4, 1)}
              className="md:w-1/2 p-8 md:p-12"
            >
              <motion.div variants={textVariant(0.1)}>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Our Company
                </h2>
              </motion.div>
              <motion.p
                variants={fadeIn("up", "tween", 0.3, 1)}
                className="text-lg text-gray-600 mb-4"
              >
                {ourCompanyShort}
              </motion.p>
              {!expandedOurCompany && (
                <motion.button
                  variants={fadeIn("up", "tween", 0.5, 1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpandedOurCompany(true)}
                  className="text-purple-600 font-semibold underline mb-6 hover:text-purple-800 transition"
                >
                  Read More
                </motion.button>
              )}
              <motion.div
                variants={expandVariants}
                initial="hidden"
                animate={expandedOurCompany ? "visible" : "hidden"}
                className="text-lg text-gray-600 mb-6"
              >
                <p className="mb-4">{ourCompanyFull}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpandedOurCompany(false)}
                  className="text-purple-600 font-semibold underline hover:text-purple-800 transition"
                >
                  Read Less
                </motion.button>
              </motion.div>
              <motion.div
                variants={staggerContainer(0.1, 0.2)}
                className="grid grid-cols-2 gap-4"
              >
                <motion.div
                  variants={fadeIn("right", "tween", 0.6, 1)}
                  whileHover={{ y: -5 }}
                  className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600"
                >
                  <h3 className="font-bold text-gray-800">10,000+ sq.ft.</h3>
                  <p className="text-gray-600 text-sm">Manufacturing Area</p>
                </motion.div>
                <motion.div
                  variants={fadeIn("left", "tween", 0.7, 1)}
                  whileHover={{ y: -5 }}
                  className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600"
                >
                  <h3 className="font-bold text-gray-800">50+</h3>
                  <p className="text-gray-600 text-sm">Team Members</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 2: Who We Are */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-6 px-6 bg-purple-50 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          initial={{ x: -200, y: -100, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-purple-600 blur-3xl"
        />
        <motion.div
          initial={{ x: 200, y: 100, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-red-600 blur-3xl"
        />

        <div className="container mx-auto relative">
          <motion.div variants={textVariant(0.2)} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="w-20 h-1 bg-red-600 mx-auto"
            ></motion.div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              variants={slideIn("right", "tween", 0.4, 1)}
              className="lg:w-1/2 relative"
            >
              <img
                src="https://media.istockphoto.com/id/688587628/photo/aluminium-and-pvc-industry-worker.jpg?s=612x612&w=0&k=20&c=j3W5LQbi0yV0RH0-DLqGs6VeFGlV60Vm_OaiIAMPoTo="
                alt="PRL Team"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border-2 border-red-200"
              >
                <div className="flex items-center">
                  <div className="text-red-500 mr-2">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">100%</div>
                    <div className="text-gray-600 text-sm">Quality Check</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideIn("left", "tween", 0.6, 1)}
              className="lg:w-1/2"
            >
              <motion.p
                variants={fadeIn("up", "tween", 0.5, 1)}
                className="text-gray-600 mb-6"
              >
                {whoWeAreShort}
              </motion.p>
              {!expandedWhoWeAre && (
                <motion.button
                  variants={fadeIn("up", "tween", 0.7, 1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpandedWhoWeAre(true)}
                  className="text-purple-600 font-semibold underline mb-6 hover:text-purple-800 transition"
                >
                  Read More
                </motion.button>
              )}
              <motion.div
                variants={expandVariants}
                initial="hidden"
                animate={expandedWhoWeAre ? "visible" : "hidden"}
                className="text-gray-600 mb-6"
              >
                <p className="mb-4">{whoWeAreFull}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpandedWhoWeAre(false)}
                  className="text-purple-600 font-semibold underline hover:text-purple-800 transition"
                >
                  Read Less
                </motion.button>
              </motion.div>
              <motion.div
                variants={fadeIn("up", "tween", 1.1, 1)}
                className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-600"
              >
                <p className="text-purple-800 italic">
                  "We are not just a company. We are proof that big dreams,
                  backed by hard work, can build something real. Something
                  lasting."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 3: What We Offer */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-16 px-6 bg-white relative"
      >
        {/* Floating decorative elements */}
        <motion.div
          initial={{ x: -100, y: -100, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-purple-600 blur-3xl"
        />
        <motion.div
          initial={{ x: 100, y: 100, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-red-600 blur-3xl"
        />

        <div className="container mx-auto relative">
          <motion.div variants={textVariant(0.2)} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What We Offer
            </h2>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="w-20 h-1 bg-purple-600 mx-auto"
            ></motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Cutting Machines",
                desc: "Precision single and double-head cutting saws for accurate profile preparation",
                icon: (
                  <svg
                    className="w-12 h-12 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.757a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
                    />
                  </svg>
                ),
              },
              {
                title: "Welding Machines",
                desc: "State-of-the-art welding machines for strong and seamless frame fabrication",
                icon: (
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                ),
              },
              {
                title: "Corner Cleaning",
                desc: "Automated and manual corner cleaning solutions for a perfect finish",
                icon: (
                  <svg
                    className="w-12 h-12 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                ),
              },
              {
                title: "Milling Machines",
                desc: "Water slot, end milling, and other specialized milling machines",
                icon: (
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a1.5 1.5 0 003 0m0-6V9m0 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                  </svg>
                ),
              },
              {
                title: "Glazing Bead Saws",
                desc: "Dedicated machines for precise cutting of glazing beads",
                icon: (
                  <svg
                    className="w-12 h-12 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.757a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
                    />
                  </svg>
                ),
              },
              {
                title: "Ancillary Equipment",
                desc: "Complete suite of supporting machinery and tools",
                icon: (
                  <svg
                    className="w-12 h-12 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.1, 0.8)}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-600 hover:border-red-600"
              >
                <motion.div
                  className="mb-6"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Section 4: Why Choose PRL */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-16 px-6 bg-red-50 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-full filter blur-3xl"
        />

        <div className="container mx-auto relative">
          <motion.div variants={textVariant(0.2)} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose PRL?
            </h2>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="w-20 h-1 bg-purple-600 mx-auto"
            ></motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                title: "Expertise",
                desc: "Decades of collective experience in uPVC machinery design and manufacturing",
                icon: "👨‍🔧",
              },
              {
                title: "Reliability",
                desc: "Machines built for continuous, heavy-duty operation with minimal downtime",
                icon: "⚙️",
              },
              {
                title: "Precision",
                desc: "Advanced technology ensuring high accuracy and consistent product quality",
                icon: "🎯",
              },
              {
                title: "Customization",
                desc: "Solutions tailored to meet specific production requirements",
                icon: "🛠️",
              },
              {
                title: "Quality",
                desc: "Stringent quality control at every stage of manufacturing",
                icon: "🏆",
              },
              {
                title: "Innovation",
                desc: "Continuous R&D to incorporate the latest technological advancements",
                icon: "💡",
              },
              {
                title: "Support",
                desc: "Comprehensive pre-sales and after-sales service",
                icon: "🛡️",
              },
              {
                title: "Value",
                desc: "High quality machines at affordable prices",
                icon: "💰",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.1, 0.8)}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Section 5: Our Commitment */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-16 px-6 bg-purple-50 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-purple-600 blur-3xl"
        />
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-red-600 blur-3xl"
        />

        <div className="container mx-auto relative">
          <motion.div variants={textVariant(0.2)} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Commitment
            </h2>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="w-20 h-1 bg-red-600 mx-auto"
            ></motion.div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div
              variants={slideIn("right", "tween", 0.4, 1)}
              className="lg:w-1/2 relative"
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/054/312/679/non_2x/factory-worker-operating-industrial-machinery-for-aluminum-and-pvc-windows-and-doors-production-photo.jpg"
                alt="PRL Quality Commitment"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg border-2 border-purple-200"
              >
                <div className="text-purple-600 font-bold">ISO 9001:2015</div>
                <div className="text-gray-600 text-sm">Certified</div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideIn("left", "tween", 0.6, 1)}
              className="lg:w-1/2"
            >
              <motion.p
                variants={fadeIn("up", "tween", 0.5, 1)}
                className="text-gray-600 mb-6"
              >
                At PRL, quality is not just a standard; it's our foundation.
                Every machine is meticulously engineered using high-grade
                materials and components, undergoing rigorous testing to ensure
                durability, reliability, and optimal performance.
              </motion.p>
              <motion.p
                variants={fadeIn("up", "tween", 0.7, 1)}
                className="text-gray-600 mb-6"
              >
                We continuously invest in research and development,
                incorporating the latest technological advancements such as PLC
                control systems, servo motors, and intuitive HMI interfaces to
                enhance automation, accuracy, and ease of use for our clients.
              </motion.p>
              <motion.p
                variants={fadeIn("up", "tween", 0.9, 1)}
                className="text-gray-600 mb-6"
              >
                Our machines are built to withstand rigorous industrial
                environments, ensuring exceptional durability, minimal downtime,
                and consistent performance.
              </motion.p>
              <motion.div
                variants={fadeIn("up", "tween", 1.1, 1)}
                className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-600"
              >
                <p className="text-red-800 italic">
                  "Innovation is embedded in our DNA. We aim to deliver machines
                  that are not only efficient and reliable but also intelligent,
                  user-friendly, and future-proof."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 6: Partner With Us */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-16 px-6 bg-white relative overflow-hidden"
      >
        {/* Floating decorative elements */}
        <motion.div
          initial={{ x: -100, y: -100, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-purple-600 blur-3xl"
        />
        <motion.div
          initial={{ x: 100, y: 100, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-red-600 blur-3xl"
        />

        <div className="container mx-auto relative">
          <motion.div variants={textVariant(0.2)} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Partner With Us
            </h2>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="w-20 h-1 bg-purple-600 mx-auto"
            ></motion.div>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              variants={fadeIn("up", "tween", 0.5, 1)}
              className="text-xl text-gray-600 mb-8"
            >
              Whether you are setting up a new uPVC window manufacturing unit or
              looking to upgrade your existing machinery, PRL is your ideal
              partner. We are dedicated to helping you achieve higher
              productivity, superior product quality, and greater profitability.
            </motion.p>
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div
                variants={fadeIn("up", "spring", 0.2, 0.8)}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(124, 58, 237, 0.3), 0 10px 10px -5px rgba(124, 58, 237, 0.1)",
                }}
                className="bg-purple-50 p-8 rounded-xl hover:bg-purple-100 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  For Startups
                </h3>
                <p className="text-gray-600 mb-4">
                  Affordable entry-level machines perfect for new businesses
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition"
                >
                  Explore Options
                </motion.button>
              </motion.div>
              <motion.div
                variants={fadeIn("up", "spring", 0.4, 0.8)}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(220, 38, 38, 0.3), 0 10px 10px -5px rgba(220, 38, 38, 0.1)",
                }}
                className="bg-red-50 p-8 rounded-xl hover:bg-red-100 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  For SMEs
                </h3>
                <p className="text-gray-600 mb-4">
                  Mid-range solutions to scale your production
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition"
                >
                  View Solutions
                </motion.button>
              </motion.div>
              <motion.div
                variants={fadeIn("up", "spring", 0.6, 0.8)}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(124, 58, 237, 0.3), 0 10px 10px -5px rgba(124, 58, 237, 0.1)",
                }}
                className="bg-purple-50 p-8 rounded-xl hover:bg-purple-100 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  For Large Enterprises
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete automated production lines
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition"
                >
                  Contact Sales
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 7: Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-16 px-6 bg-gray-100 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-full filter blur-3xl"
        />

        <div className="container mx-auto relative">
          <motion.div variants={textVariant(0.2)} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <motion.div
              variants={fadeIn("up", "tween", 0.4, 1)}
              className="w-20 h-1 bg-red-600 mx-auto"
            ></motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                quote:
                  "PRL machines have transformed our production capacity. The quality and efficiency are unmatched in the industry.",
                name: "Rajesh Mehta",
                company: "Sunrise Windows",
                rating: 5,
              },
              {
                quote:
                  "The after-sales support from PRL is exceptional. They truly stand behind their products.",
                name: "Priyanka Singh",
                company: "Elite Aluminium Works",
                rating: 5,
              },
              {
                quote:
                  "We've been using PRL machines for 2 years now with zero downtime. Highly recommended!",
                name: "Amit Patel",
                company: "Modern Fenestration",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.2, 0.8)}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      whileHover={{ scale: 1.2 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <motion.p
                  className="text-gray-600 italic mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  "{testimonial.quote}"
                </motion.p>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-purple-600">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
