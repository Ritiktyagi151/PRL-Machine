import React from "react";
import {
  FaCogs,
  FaTools,
  FaIndustry,
  FaClipboardCheck,
  FaLightbulb,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

const MachineCustomization = () => {
  const customizationServices = [
    {
      icon: <FaCogs className="text-3xl text-red-600" />,
      title: "Mechanical Modifications",
      description:
        "Structural changes to accommodate specific production needs",
      details: [
        "Frame extensions/adaptations",
        "Conveyor system integrations",
        "Tooling head replacements",
        "Loading/unloading system upgrades",
      ],
    },
    {
      icon: <FaTools className="text-3xl text-red-600" />,
      title: "Control System Upgrades",
      description: "Modernization of machine controls and interfaces",
      details: [
        "PLC programming updates",
        "HMI interface customization",
        "IoT connectivity integration",
        "Automation sequence optimization",
      ],
    },
    {
      icon: <FaIndustry className="text-3xl text-red-600" />,
      title: "Production Enhancements",
      description: "Improvements to increase output and efficiency",
      details: [
        "Speed optimization",
        "Material handling upgrades",
        "Quality control integrations",
        "Energy efficiency modifications",
      ],
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Needs Assessment",
      description: "Detailed analysis of your production requirements",
    },
    {
      step: "2",
      title: "Feasibility Study",
      description: "Technical evaluation of modification options",
    },
    {
      step: "3",
      title: "Design & Engineering",
      description: "Custom CAD designs and engineering plans",
    },
    {
      step: "4",
      title: "Implementation",
      description: "Precision modification by certified technicians",
    },
    {
      step: "5",
      title: "Testing & Validation",
      description: "Rigorous quality and performance testing",
    },
    {
      step: "6",
      title: "Training & Documentation",
      description: "Operator training and technical documentation",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Section */}
      <section className="mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 mb-4 sm:mb-6 leading-tight">
          Machine Customization Services
        </h1>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl leading-relaxed">
          We engineer precision modifications to transform standard equipment
          into optimized solutions for your unique production challenges. Our
          customizations enhance performance, extend capabilities, and
          future-proof your operations.
        </p>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 sm:p-5 mb-8 rounded-r-lg">
          <p className="text-gray-800 text-sm sm:text-base">
            <strong className="block sm:inline">Proven Results:</strong>{" "}
            Customized machines achieve 30-50% higher productivity in
            specialized applications.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-10 border-b pb-4">
          Our Customization Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {customizationServices.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex justify-center mb-6 bg-red-50 p-4 rounded-full w-20 h-20 mx-auto items-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-6 text-sm">
                {service.description}
              </p>
              <ul className="space-y-3 text-gray-700 mt-auto">
                {service.details.map((detail, i) => (
                  <li key={i} className="flex items-start text-sm sm:text-base">
                    <span className="text-red-600 mr-2 mt-1 text-lg">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Process */}
      <section className="mb-16 sm:mb-20 bg-gray-50 p-6 sm:p-10 rounded-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-10">
          Our Customization Process
        </h2>

        

        {/* Mobile: 1 Column, Desktop: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Column 1 (Steps 1-3) */}
          <div className="space-y-8">
            {processSteps.slice(0, 3).map((step) => (
              <div key={step.step} className="flex items-start gap-4 sm:gap-6">
                <div className="bg-red-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 mt-1 font-bold text-lg shadow-md">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 (Steps 4-6) */}
          <div className="space-y-8">
            {processSteps.slice(3).map((step) => (
              <div key={step.step} className="flex items-start gap-4 sm:gap-6">
                <div className="bg-red-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 mt-1 font-bold text-lg shadow-md">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <FaLightbulb className="text-xl sm:text-2xl text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Automotive Parts Manufacturer
              </h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
              Modified CNC machines to handle new alloy materials, increasing
              production speed by 40% while maintaining precision tolerances.
            </p>
            <div className="text-sm font-semibold text-gray-800 bg-gray-50 p-3 rounded-lg inline-block">
              <span className="text-red-600">Result:</span> 35% cost reduction
              per part
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <FaShieldAlt className="text-xl sm:text-2xl text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Medical Device Producer
              </h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
              Customized packaging equipment to meet sterile environment
              requirements while doubling throughput capacity.
            </p>
            <div className="text-sm font-semibold text-gray-800 bg-gray-50 p-3 rounded-lg inline-block">
              <span className="text-red-600">Result:</span> 99.8% defect-free
              production
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-12 sm:mb-16 bg-blue-50 p-6 sm:p-10 rounded-2xl border border-blue-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-8 sm:mb-10 text-center md:text-left">
          Why Customize Instead of Replace?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col sm:flex-row md:flex-col items-start gap-4">
            <FaChartLine className="text-3xl sm:text-4xl text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-2 text-blue-900">
                Cost Effective
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Typically 40-60% less expensive than new equipment purchases.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-start gap-4">
            <FaClipboardCheck className="text-3xl sm:text-4xl text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-2 text-blue-900">
                Minimal Downtime
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Modifications can often be completed during planned maintenance
                windows.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-start gap-4">
            <FaCogs className="text-3xl sm:text-4xl text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-2 text-blue-900">
                Proven Reliability
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Maintain the known performance of your existing equipment infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 sm:p-12 rounded-2xl shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Transform Your Equipment?
          </h2>
          <p className="mb-8 text-base sm:text-lg md:text-xl text-red-100">
            Contact our engineering team to discuss your customization needs and
            get a free technical assessment.
          </p>
          <button className="w-full sm:w-auto bg-white text-red-700 hover:bg-gray-100 font-bold py-3 sm:py-4 px-8 rounded-lg transition transform hover:-translate-y-1 shadow-md text-base sm:text-lg">
            Request Customization Quote
          </button>
        </div>
      </section>
    </div>
  );
};

export default MachineCustomization;