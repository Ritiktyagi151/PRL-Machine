import React, { useState, useEffect, useRef } from "react";
import {
  UsersIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

// --- Custom CSS for Animation ---
const CustomStyles = () => (
  <style>{`
    .scroll-reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .scroll-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `}</style>
);

// --- Scroll Reveal Wrapper ---
const ScrollRevealWrapper = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            observer.unobserve(currentRef);
          }, delay);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-reveal ${isVisible ? "is-visible" : ""}`}>
      {children}
    </div>
  );
};

// --- Main Component ---
function PRL_Journey() {
  // Defined colors for cleaner usage in the array
  const colors = {
    red: "#EB1C24",
    blue: "#2A1E5A",
    white: "#FFFFFF",
    grayBg: "#F8FAFC",
  };

  const journeySteps = [
    {
      year: "2017",
      title: "The Vision",
      description:
        "Established in 2017, we started with nothing. From a small 4-person office, our journey was powered by belief and a drive to build something that matters.",
      icon: UsersIcon,
      // Alternating colors for visual interest
      themeColor: colors.blue,
    },
    {
      year: "2022",
      title: "Manufacturing Facility",
      description:
        "We established our 10,000 sq ft manufacturing facility in Greater Noida, growing to a dedicated team of over 50 professionals.",
      icon: BuildingOffice2Icon,
      themeColor: colors.red,
    },
    {
      year: "Expertise",
      title: "Precision Engineering",
      description:
        "We specialize in a wide range of machines, including cutting saws, welding machines, CNC corner cleaning, and auxiliary equipment for uPVC & Aluminium.",
      icon: Cog6ToothIcon,
      themeColor: colors.blue,
    },
    {
      year: "Mission",
      title: "Your Trusted Partner",
      description:
        "To empower manufacturers with reliable, cost-effective machinery and build the future of window fabrication with precision, efficiency, and innovation.",
      icon: GlobeAltIcon,
      themeColor: colors.red,
    },
  ];

  return (
    <>
      <CustomStyles />
      <section
        className="min-h-screen py-20 px-4 sm:px-6 relative overflow-hidden"
        style={{ backgroundColor: colors.grayBg }}
      >
        {/* Decorative background grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${colors.blue} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1
              className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
              style={{ color: colors.blue }}
            >
              PARIDA RED LION INDIA (PRL)
            </h1>
            <div className="flex items-center justify-center gap-3">
              <span
                className="h-0.5 w-12"
                style={{ backgroundColor: colors.red }}
              ></span>
              <p
                className="text-xl font-medium uppercase tracking-widest"
                style={{ color: colors.red }}
              >
                Our Journey
              </p>
              <span
                className="h-0.5 w-12"
                style={{ backgroundColor: colors.red }}
              ></span>
            </div>
          </div>

          <div className="relative">
            {/* Central Vertical Spine (Desktop Only) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 hidden md:block"></div>

            {journeySteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <ScrollRevealWrapper key={index} delay={index * 100}>
                  <div className="flex flex-col md:flex-row items-center justify-center mb-16 relative">
                    {/* --- Card Section --- */}
                    <div
                      className={`w-full md:w-5/12 relative ${
                        isEven
                          ? "md:text-right md:pr-12"
                          : "md:order-2 md:text-left md:pl-12"
                      }`}
                    >
                      <div className="p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group bg-white">
                        {/* Mobile: Icon sits inside/on top of card */}
                        <div className="md:hidden flex items-center gap-3 mb-4">
                          <div
                            className="p-2 rounded-lg text-white shadow-md"
                            style={{ backgroundColor: step.themeColor }}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <span
                            className="text-sm font-bold uppercase tracking-wider"
                            style={{ color: step.themeColor }}
                          >
                            {step.year}
                          </span>
                        </div>

                        <h3
                          className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-300"
                          style={{ color: colors.blue }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Desktop: Year Badge on the side */}
                        <div
                          className={`hidden md:block absolute top-1/2 -translate-y-1/2 text-4xl font-black opacity-10 select-none ${
                            isEven ? "left-4" : "right-4"
                          }`}
                          style={{ color: colors.blue }}
                        >
                          {step.year}
                        </div>
                      </div>
                    </div>

                    {/* --- Center Connector (Desktop) --- */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                      <div
                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative z-10 transition-transform duration-500 hover:scale-110"
                        style={{ backgroundColor: step.themeColor }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* --- Connecting Lines (Desktop) --- */}
                    {/* Horizontal lines connecting card to spine */}
                    <div
                      className={`hidden md:block absolute top-1/2 h-0.5 w-[5%] -z-10 bg-gray-200 ${
                        isEven ? "left-[45%]" : "right-[45%]"
                      }`}
                    ></div>

                    {/* --- Empty Space for Grid Alignment --- */}
                    <div className="w-full md:w-5/12"></div>
                  </div>
                </ScrollRevealWrapper>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default PRL_Journey;
