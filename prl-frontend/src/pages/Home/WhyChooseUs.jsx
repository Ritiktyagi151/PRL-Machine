import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield, // Keep imports as user might be swapping them
  Award,
  Users,
  Clock,
  Star,
  Heart,
  Factory,
  Settings,
  ToolCase,
  CheckCircle,
  Globe,
  PieChart,
} from "lucide-react";

const WhyChooseUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // --- Animation Variants ---

  // Stagger container for main sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Pop-in effect for header elements
  const headerItemVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
      },
    },
  };

  // Scale/pop-in effect for feature cards
  const cardItemVariants = {
    hidden: { scale: 0.9, y: 20, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // --- Data ---

  const features = [
    {
      icon: <Factory className="w-6 h-6" />,
      title: "Hands-On Experience",
      description:
        "Since 2017, our team has assembled, serviced, and rebuilt hundreds of uPVC fabrication machines including welding, cutting, and cleaning machines.",
      highlights: [
        "8+ years in uPVC machine manufacturing",
        "250+ machine lines installed across India",
        "Factory-certified technical team",
      ],
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Top Quality Machinery",
      description:
        "We supply only the best-rated uPVC and aluminium fabrication machines for consistent performance and reliability.",
      highlights: [
        "Premium components from Delta, Siemens, Schneider",
        "CE, SGS, and ISO 9001 certified",
        "Multiple QC checks before dispatch",
      ],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Exceptional Support",
      description:
        "Round-the-clock customer support ensuring minimal downtime for your operations.",
      highlights: [
        "Emergency repairs available",
        "On-site installation and training",
        "Remote diagnostics",
      ],
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Solutions",
      description:
        "Tailored machinery setups that align with your specific production goals and budget.",
      highlights: [
        "OEM/ODM ready for specialized requirements",
        "Custom fabrication lines designed",
        "Application engineering services",
      ],
    },
    {
      icon: <ToolCase className="w-6 h-6" />,
      title: "Quality Commitment",
      description:
        "We never compromise on quality, using graded casting and best quality raw materials.",
      highlights: [
        "Advanced infrastructure",
        "Talented R&D team",
        "International quality standards",
      ],
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Economic Value",
      description:
        "Cost-effective solutions without compromising quality, ensuring your ROI.",
      highlights: [
        "Competitive pricing",
        "Transparent business deals",
        "Lifetime satisfaction promise",
      ],
    },
  ];

  const keyPoints = [
    { icon: <CheckCircle className="w-4 h-4" />, text: "Quality commitment" },
    { icon: <CheckCircle className="w-4 h-4" />, text: "Authenticity" },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Customer oriented approach",
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Economical Working Process",
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Experience you can rely on",
    },
    { icon: <CheckCircle className="w-4 h-4" />, text: "Talented team" },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Graded casting and best quality raw material",
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "An advance infrastructure",
    },
    { icon: <CheckCircle className="w-4 h-4" />, text: "Time bound delivery" },
    { icon: <CheckCircle className="w-4 h-4" />, text: "Customizing facility" },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Economical & Competitive Prices",
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Transparent business deal",
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Promise of lifetime satisfaction",
    },
    { icon: <Globe className="w-4 h-4" />, text: "Worldwide market" },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "International Quality Standards",
    },
  ];

  // --- Ticker Component ---
  const Ticker = ({ points }) => {
    // We duplicate the points to create a seamless loop
    const duplicatedPoints = [...points, ...points];

    return (
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 before:bg-gradient-to-r before:from-slate-900/90 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:bg-gradient-to-l after:from-slate-900/90 after:to-transparent after:z-10">
        <motion.div
          className="flex gap-4"
          animate={{ x: "-100%" }}
          transition={{
            duration: 60, // Adjust duration for speed
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedPoints.map((point, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center bg-slate-800/70 border border-slate-700 rounded-full px-5 py-2.5 whitespace-nowrap"
            >
              <div className="text-violet-400 mr-2 flex-shrink-0">
                {point.icon}
              </div>
              <span className="text-gray-300 font-medium text-sm">
                {point.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  // --- Main Component ---
  return (
    <section
      ref={ref}
      className="relative py-10 md:py-14 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600132806306-9694c0279c36?q=80&w=2070&auto=format&fit=crop')", // New industrial background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={headerItemVariants}
            className="inline-block px-4 py-1 text-base font-semibold bg-violet-500/20 text-violet-300 rounded-full mb-4"
          >
            Why PRL Machines
          </motion.span>
          <motion.h2
            variants={headerItemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Engineering Excellence in{" "}
            <span className="text-violet-400">Every Machine</span>
          </motion.h2>
          <motion.p
            variants={headerItemVariants}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            At PRL, we live and breathe fabrication technology. With over 8
            years of experience, we specialize in high-performance uPVC
            machinery, customized for every fabrication requirement.
          </motion.p>
          <motion.div
            variants={headerItemVariants}
            className="w-24 h-1 bg-gradient-to-r from-violet-500 to-violet-300 mx-auto mt-6 rounded-full"
          ></motion.div>
        </motion.div>

        {/* Features Grid (2-column layout on large screens) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardItemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative p-8 bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-violet-500/10 transition-all duration-300 border border-slate-700/50 hover:border-violet-400/50"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-700/50 to-slate-800/40 rounded-xl mb-6 group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-violet-500 transition-all duration-500 shadow-md">
                <div className="text-violet-400 group-hover:text-white transition-colors duration-500">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 mb-5 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
              <ul className="space-y-2.5">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-violet-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Points Ticker Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={headerItemVariants} // Re-use header variant for simple pop-in
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Our <span className="text-violet-400">Commitment</span> to
            Excellence
          </h3>
          <Ticker points={keyPoints} />
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center"
        >
          <motion.div
            variants={headerItemVariants}
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-600 to-violet-400 rounded-full mb-6 shadow-lg"
          >
            <Star className="w-6 h-6 text-white" />
          </motion.div>
          <motion.h3
            variants={headerItemVariants}
            className="text-3xl font-bold text-white mb-4"
          >
            We're More Than Just a{" "}
            <span className="text-violet-400">uPVC Machine Manufacturer</span>
          </motion.h3>
          <motion.p
            variants={headerItemVariants}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We're problem solvers committed to helping you build the future of
            fenestration. Whether selecting the right machine, increasing
            output, or solving technical challenges - PRL is here to help.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
