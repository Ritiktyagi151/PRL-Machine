import React from "react";
import { FaTools, FaCalendarAlt, FaCheckCircle, FaShieldAlt, FaCogs, FaHeadset } from "react-icons/fa";

export default function Installation() {
  const features = [
    {
      icon: <FaTools className="text-2xl md:text-3xl text-red-600" />,
      title: "Expert Installation",
      description: "Factory-trained technicians with specialized knowledge of your equipment"
    },
    {
      icon: <FaCalendarAlt className="text-2xl md:text-3xl text-red-600" />,
      title: "Flexible Scheduling",
      description: "We work around your production schedule to minimize downtime"
    },
    {
      icon: <FaCheckCircle className="text-2xl md:text-3xl text-red-600" />,
      title: "Quality Assurance",
      description: "Rigorous testing protocols ensure optimal performance"
    },
    {
      icon: <FaShieldAlt className="text-2xl md:text-3xl text-red-600" />,
      title: "Safety Compliance",
      description: "Full adherence to OSHA and industry safety standards"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Pre-Installation Assessment",
      description: "We evaluate your facility's requirements and prepare the installation plan"
    },
    {
      step: "2",
      title: "Equipment Receiving & Inspection",
      description: "Thorough examination of all components before installation begins"
    },
    {
      step: "3",
      title: "Precision Installation",
      description: "Proper alignment, leveling, and assembly by certified technicians"
    },
    {
      step: "4",
      title: "Calibration & Testing",
      description: "Fine-tuning and comprehensive operational testing"
    },
    {
      step: "5",
      title: "Operator Training",
      description: "Hands-on instruction for your team on proper operation"
    },
    {
      step: "6",
      title: "Final Documentation",
      description: "Complete installation reports and maintenance recommendations"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      {/* Hero Section */}
      <section className="mb-8 sm:mb-12 pt-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-3 sm:mb-4">
          Professional Installation Services
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6 max-w-3xl">
          Our comprehensive installation service ensures your machinery is set up for peak performance from day one. 
          We handle everything from initial site preparation to final calibration, minimizing your downtime and 
          maximizing your return on investment.
        </p>
        <div className="bg-red-50 border-l-4 border-red-600 p-3 sm:p-4 mb-6 sm:mb-8">
          <p className="text-gray-800 text-sm sm:text-base">
            <strong>Industry-leading:</strong> 98% of installations completed ahead of schedule with zero safety incidents
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 border-b pb-2">
          Why Choose Our Installation Services?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-center mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-center mb-1 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Installation Process */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 border-b pb-2">
          Our Installation Process
        </h2>
        <div className="space-y-6 sm:space-y-8">
          {processSteps.map((step) => (
            <div key={step.step} className="flex items-start gap-4 sm:gap-6">
              <div className="bg-red-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 mt-1">
                {step.step}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="mb-8 sm:mb-12 bg-gray-50 p-6 sm:p-8 rounded-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          Complementary Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <FaCogs className="text-xl sm:text-2xl text-red-600 mt-1" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                Post-Installation Support
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                30-day follow-up period with priority support to address any operational questions or minor adjustments.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:gap-4">
            <FaHeadset className="text-xl sm:text-2xl text-red-600 mt-1" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                24/7 Emergency Support
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Immediate assistance available for any critical issues that may arise after installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white p-6 sm:p-8 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Ready for a Flawless Installation?
          </h2>
          <p className="mb-4 sm:mb-6 text-sm sm:text-lg">
            Contact our installation specialists today to schedule your equipment setup or to discuss your specific requirements.
          </p>
          <button className="bg-white text-red-600 hover:bg-gray-100 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg transition duration-300 text-sm sm:text-base">
            Schedule Installation
          </button>
        </div>
      </section>
    </div>
  );
}