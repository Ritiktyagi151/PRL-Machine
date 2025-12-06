import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Award,
  Clock,
  Star,
  Factory,
  Settings,
  ToolCase,
  CheckCircle,
  Globe,
  PieChart,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

// Color Palette Definition
const THEME = {
  red: "#EB1C24",
  blue: "#2A1E5A",
  white: "#FFFFFF",
  grayBg: "#F8FAFC", // Very light gray for contrast against white cards
};

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // --- Data ---
  const features = [
    {
      icon: <Factory className="w-6 h-6" />,
      title: "Hands-On Experience",
      description:
        "Since 2017, assembling and servicing hundreds of uPVC fabrication machines.",
      highlights: [
        "8+ Years Experience",
        "250+ Installations",
        "Certified Team",
      ],
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Top Quality Machinery",
      description:
        "We supply only the best-rated machines ensuring consistent performance.",
      highlights: ["Delta & Siemens Parts", "ISO 9001 Certified", "QC Tested"],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Exceptional Support",
      description:
        "Round-the-clock customer support ensuring minimal downtime.",
      highlights: ["24/7 Support", "On-site Training", "Remote Diagnostics"],
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Solutions",
      description:
        "Tailored machinery setups aligned with your production goals.",
      highlights: ["OEM/ODM Ready", "Custom Lines", "App Engineering"],
    },
    {
      icon: <ToolCase className="w-6 h-6" />,
      title: "Quality Commitment",
      description:
        "We never compromise, using graded casting and best raw materials.",
      highlights: ["Graded Casting", "R&D Focused", "Global Standards"],
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Economic Value",
      description:
        "Cost-effective solutions without compromising quality for high ROI.",
      highlights: ["Competitive Price", "Transparent Deals", "High ROI"],
    },
  ];

  const keyPoints = [
    "Quality commitment",
    "Authenticity",
    "Customer oriented",
    "Talented team",
    "Graded casting",
    "Advance infrastructure",
    "Time bound delivery",
    "Customizing facility",
    "Competitive Prices",
    "Transparent deals",
    "Worldwide market",
  ];

  // --- Ticker Component ---
  const Ticker = ({ points }) => {
    return (
      <div className="relative w-full overflow-hidden bg-[#2A1E5A] py-4 shadow-inner">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#2A1E5A] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#2A1E5A] to-transparent z-10"></div>

        <motion.div
          className="flex gap-12 w-max"
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...points, ...points, ...points].map((point, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-[#EB1C24] fill-[#EB1C24]" />
              <span className="text-white text-sm font-medium tracking-wider uppercase">
                {point}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section
      ref={ref}
      className="relative bg-slate-50 pt-20 pb-16 overflow-hidden"
    >
      {/* Background Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#2A1E5A 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center justify-center space-x-2 bg-white border border-[#EB1C24]/20 px-4 py-1.5 rounded-full shadow-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#EB1C24] animate-pulse"></span>
            <span className="text-[#EB1C24] font-bold text-xs uppercase tracking-widest">
              Why Choose PRL
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold text-[#2A1E5A] mb-6 leading-tight"
          >
            Engineering Excellence in <br className="hidden md:block" />
            <span className="relative inline-block">
              Every Machine
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-[#EB1C24] opacity-80"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            With over 8 years of expertise, we don't just sell machines; we
            build the foundation of your production line with precision and
            care.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-[#2A1E5A]/10 hover:border-[#EB1C24]/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2A1E5A] to-[#2A1E5A] group-hover:from-[#EB1C24] group-hover:to-[#EB1C24] transition-all duration-500"></div>

              {/* Hover Background Circle */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-slate-50 rounded-full group-hover:bg-[#EB1C24]/5 transition-colors duration-500"></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-slate-50 text-[#2A1E5A] flex items-center justify-center mb-6 group-hover:bg-[#EB1C24] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-[#EB1C24]/30">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-[#2A1E5A] mb-3 group-hover:text-[#EB1C24] transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-slate-500 mb-6 text-sm leading-relaxed min-h-[60px]">
                  {feature.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  {feature.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-slate-600 font-medium"
                    >
                      <CheckCircle className="w-4 h-4 text-[#EB1C24] mr-2" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Ticker Section - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 transform -rotate-1 mb-8 scale-105 origin-center"
      >
        <div className="bg-[#EB1C24] absolute inset-0 transform rotate-1"></div>{" "}
        {/* Red Background Layer for style */}
        <Ticker points={keyPoints} />
      </motion.div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 text-center pb-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={scaleIn}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden"
        >
          {/* Decorative Blobs */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#2A1E5A]/5 rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#EB1C24]/5 rounded-tl-full"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#2A1E5A] text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#2A1E5A]/20">
              <Zap className="w-8 h-8 fill-current" />
            </div>

            <h3 className="text-3xl font-bold text-[#2A1E5A] mb-4">
              Ready to Upgrade Your Production?
            </h3>
            <p className="text-slate-600 mb-8 max-w-xl">
              Join the industry leaders who trust PRL for their fabrication
              needs. Let's build the future together.
            </p>

            <button className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-[#EB1C24] rounded-full hover:bg-[#c4161d] shadow-lg hover:shadow-[#EB1C24]/40 hover:-translate-y-1">
              <Link to="/contact">Contact Our Team</Link>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
