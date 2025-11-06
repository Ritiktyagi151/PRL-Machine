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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Machine Customization Services
        </h1>
        <p className="text-gray-700 text-lg mb-6 max-w-3xl">
          We engineer precision modifications to transform standard equipment
          into optimized solutions for your unique production challenges. Our
          customizations enhance performance, extend capabilities, and
          future-proof your operations.
        </p>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8">
          <p className="text-gray-800">
            <strong>Proven Results:</strong> Customized machines achieve 30-50%
            higher productivity in specialized applications.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-2">
          Our Customization Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customizationServices.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 text-gray-700">
                {service.details.map((detail, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Process */}
      <section className="mb-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Our Customization Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-8">
              {processSteps.slice(0, 3).map((step) => (
                <div key={step.step} className="flex items-start gap-6">
                  <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="space-y-8">
              {processSteps.slice(3).map((step) => (
                <div key={step.step} className="flex items-start gap-6">
                  <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Customization Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <FaLightbulb className="text-2xl text-red-600" />
              <h3 className="text-lg font-semibold">
                Automotive Parts Manufacturer
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              Modified CNC machines to handle new alloy materials, increasing
              production speed by 40% while maintaining precision tolerances.
            </p>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Results:</span> 35% cost reduction
              per part
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <FaShieldAlt className="text-2xl text-red-600" />
              <h3 className="text-lg font-semibold">Medical Device Producer</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Customized packaging equipment to meet sterile environment
              requirements while doubling throughput capacity.
            </p>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Results:</span> 99.8% defect-free
              production
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-12 bg-blue-50 p-8 rounded-lg border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          Why Customize Instead of Replace?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <FaChartLine className="text-2xl text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Cost Effective</h3>
              <p className="text-gray-600">
                Typically 40-60% less expensive than new equipment purchases
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaClipboardCheck className="text-2xl text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Minimal Downtime</h3>
              <p className="text-gray-600">
                Modifications can often be completed during planned maintenance
                windows
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaCogs className="text-2xl text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Proven Reliability</h3>
              <p className="text-gray-600">
                Maintain the known performance of your existing equipment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white p-8 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Transform Your Equipment?
          </h2>
          <p className="mb-6 text-lg">
            Contact our engineering team to discuss your customization needs and
            get a free assessment.
          </p>
          <button className="bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
            Request Customization Quote
          </button>
        </div>
      </section>
    </div>
  );
};

export default MachineCustomization;
