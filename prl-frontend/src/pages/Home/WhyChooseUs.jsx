import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Settings,
  Factory,
  ShieldCheck,
  Zap,
  X,
  ArrowRight,
  Star,
  Cpu,
  Globe,
  Target,
} from "lucide-react";

// Official Colors
const COLORS = {
  red: "#FB252D",
  blue: "#292677",
  white: "#FFFFFF",
  black: "#121212",
};

const WhyChooseUs = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      id: 1,
      icon: <Factory className="w-8 h-8" />,
      title: "Advanced Fabrication",
      shortDesc: "Assembling hundreds of uPVC machines since 2017.",
      longDesc:
        "Our fabrication process involves aerospace-grade casting and high-precision assembly. We have successfully deployed over 250+ units globally, ensuring each machine meets international industrial standards.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
      entry: { x: -50, opacity: 0 },
    },
    {
      id: 2,
      icon: <Cpu className="w-8 h-8" />,
      title: "Smart Engineering",
      shortDesc: "IoT-ready machinery with Siemens & Delta parts.",
      longDesc:
        "We don't just build machines; we build smart systems. Using premium components from Siemens and Delta, our machines feature remote diagnostics and automated error reporting to minimize production downtime.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
      entry: { y: 50, opacity: 0 },
    },
    {
      id: 3,
      icon: <Target className="w-8 h-8" />,
      title: "ISO 9001 Quality",
      shortDesc: "Graded casting and QC tested for high ROI.",
      longDesc:
        "Quality is our DNA. Every machine undergoes a rigorous 48-hour stress test before shipment. We use heavy-duty graded casting to ensure long-term stability and unmatched return on investment.",
      image:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
      entry: { y: 50, opacity: 0 },
    },
    {
      id: 4,
      icon: <Globe className="w-8 h-8" />,
      title: "Global Support",
      shortDesc: "24/7 dedicated support and on-site training.",
      longDesc:
        "Our commitment doesn't end at delivery. We provide worldwide on-site installation, staff training, and 24/7 technical support to ensure your production line never stops moving.",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=400",
      entry: { x: 50, opacity: 0 },
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 bg-white overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Styled Heading (As per your image) */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            <span className="text-[#292677]">Why </span>
            <span className="text-[#FB252D]">PRL </span>
            <span className="text-[#292677]">Machinery</span>
          </motion.h2>

          {/* Gradient Underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: "120px" } : {}}
            className="h-2 bg-gradient-to-r from-[#292677] to-[#FB252D] mx-auto rounded-full mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#292677]/70 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            Delivering excellence and industrial innovation at Parida Red Lion
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={feature.entry}
              animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -15, scale: 1.02 }}
              onClick={() => setSelectedFeature(feature)}
              className="group cursor-pointer bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#FB252D]/10 transition-all flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-[#292677]/5 text-[#292677] rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-[#FB252D] group-hover:text-white transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#121212] mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {feature.shortDesc}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[#FB252D] font-bold text-xs uppercase tracking-widest">
                Learn More <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* POP-UP MODAL */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-[#121212]/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl relative z-[110] flex flex-col md:flex-row min-h-[500px]"
            >
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-[#FB252D] hover:text-white rounded-full transition-colors z-20"
              >
                <X size={24} />
              </button>

              <div className="md:w-1/2 relative">
                <img
                  src={selectedFeature.image}
                  className="w-full h-full object-cover"
                  alt="PRL"
                />
                <div className="absolute inset-0 bg-[#292677]/40 mix-blend-multiply" />
              </div>

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-[#FB252D] font-black uppercase tracking-[0.3em] text-xs mb-4">
                  Quality Standard
                </span>
                <h3 className="text-4xl font-black text-[#121212] mb-6">
                  {selectedFeature.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {selectedFeature.longDesc}
                </p>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="bg-[#292677] text-white py-4 px-8 rounded-2xl font-bold hover:bg-[#FB252D] transition-all self-start"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Ticker Section */}
      <div className="mt-20 py-10 border-t border-slate-100">
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12"
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-12 items-center">
              {[
                "GRADED CASTING",
                "ISO 9001",
                "24/7 SUPPORT",
                "FAST DELIVERY",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <Star size={16} className="text-[#FB252D] fill-[#FB252D]" />
                  <span className="text-[#292677] font-bold tracking-[0.3em] text-[10px]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ChevronRight = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default WhyChooseUs;
