import React, { useState, useEffect, useRef } from "react";
// Updated icons to match the company content
import {
  UsersIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

// Define the custom CSS for scroll animation
const CustomStyles = () => (
  <style>{`
    .scroll-reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      will-change: opacity, transform; /* Performance hint */
    }
    
    .scroll-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `}</style>
);

// Wrapper component for scroll-triggered animation
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
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-reveal ${isVisible ? "is-visible" : ""}`}>
      {children}
    </div>
  );
};

// Main component for the PRL Journey
function PRL_Journey() {
  // NEW: Updated data using your company's information
  const journeySteps = [
    {
      week: "2017",
      title: "The Vision",
      description:
        "Established in 2017, we started with nothing. From a small 4-person office, our journey was powered by belief and a drive to build something that matters.",
      icon: UsersIcon,
      iconBg: "bg-blue-500",
      lineColor: "bg-blue-500",
    },
    {
      week: "2022",
      title: "Manufacturing Facility",
      description:
        "We established our 10,000 sqr ft manufacturing facility in Greater Noida, growing to a dedicated team of over 50 professionals.",
      icon: BuildingOffice2Icon,
      iconBg: "bg-orange-500",
      lineColor: "bg-orange-500",
    },
    {
      week: "Our Expertise",
      title: "Precision Engineering",
      description:
        "We specialize in a wide range of machines, including cutting saws, welding machines, CNC corner cleaning, and auxiliary equipment for uPVC & Aluminium.",
      icon: Cog6ToothIcon,
      iconBg: "bg-red-600", // Using company red
      lineColor: "bg-red-600",
    },
    {
      week: "Our Mission",
      title: "Your Trusted Partner",
      description:
        "To empower manufacturers with reliable, cost-effective machinery and build the future of window fabrication with precision, efficiency, and innovation.",
      icon: GlobeAltIcon, // Icon for 'Pan India & Globe'
      iconBg: "bg-teal-500",
      lineColor: "bg-teal-500",
    },
  ];

  return (
    <>
      <CustomStyles />
      <div className="block md:hidden min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* NEW: Updated Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4 tracking-tight">
            PARIDA RED LION INDIA (PRL)
          </h1>
          <p className="text-2xl text-center text-red-400 mb-16">Our Journey</p>

          <div className="relative">
            {/* Central Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-700 hidden md:block"></div>

            {journeySteps.map((step, index) => {
              const isEven = index % 2 === 0; // For alternating left/right layout
              const IconComponent = step.icon; // Get the actual icon component

              return (
                <ScrollRevealWrapper key={index} delay={index * 150}>
                  <div className="flex flex-col md:flex-row items-center justify-center mb-10 relative">
                    {/* Content Card (Left for even index, Right for odd) */}
                    <div
                      className={`w-full md:w-5/12 p-4 rounded-xl shadow-xl bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                        isEven ? "md:text-right" : "md:order-2 md:text-left"
                      }`}
                    >
                      {/* NEW: Using 'week' as the year/step title */}
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {step.week}: {step.title}
                      </h3>
                      {/* NEW: Using company description */}
                      <p className="text-gray-300">{step.description}</p>
                    </div>

                    {/* Circle and Line Connector (Mobile/Tablet) */}
                    <div className="md:hidden flex items-center justify-center w-full my-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl shadow-lg z-10 ${step.iconBg}`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className={`h-1 w-8 ${step.lineColor}`}></div>
                      <div
                        className={`h-1 w-full mr-auto ${step.lineColor}`}
                      ></div>{" "}
                      {/* Line extending to the card */}
                    </div>

                    {/* Circle and Line Connector (Desktop) */}
                    <div className="hidden md:flex items-center justify-center w-2/12 z-10">
                      <div
                        className={`relative w-full h-1 ${step.lineColor} ${
                          isEven ? "order-2 ml-4" : "order-1 mr-4"
                        }`}
                      ></div>
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-3xl shadow-lg z-20 ${step.iconBg} flex-shrink-0`}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div
                        className={`relative w-full h-1 ${step.lineColor} ${
                          isEven ? "order-1 mr-4" : "order-2 ml-4"
                        }`}
                      ></div>
                    </div>
                  </div>
                </ScrollRevealWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default PRL_Journey;
