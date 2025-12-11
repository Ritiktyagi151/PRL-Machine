import React from "react";
import {
  FaTools,
  FaCalendarAlt,
  FaChartLine,
  FaShieldAlt,
  FaCogs,
  FaHeadset,
  FaClipboardCheck,
  FaIndustry,
} from "react-icons/fa";

export default function Maintenance() {
  const maintenancePlans = [
    {
      icon: <FaTools className="text-3xl text-red-600" />,
      title: "Preventive Maintenance",
      description:
        "Regular scheduled service to prevent breakdowns before they occur",
      features: [
        "Lubrication and adjustments",
        "Component inspections",
        "Performance testing",
        "Early problem detection",
      ],
    },
    {
      icon: <FaClipboardCheck className="text-3xl text-red-600" />,
      title: "Predictive Maintenance",
      description: "Advanced monitoring to predict and prevent failures",
      features: [
        "Vibration analysis",
        "Thermal imaging",
        "Oil analysis",
        "Condition monitoring",
      ],
    },
    {
      icon: <FaIndustry className="text-3xl text-red-600" />,
      title: "Corrective Maintenance",
      description: "Repairs and restoration when issues are identified",
      features: [
        "Component replacement",
        "Alignment and calibration",
        "System troubleshooting",
        "Emergency repairs",
      ],
    },
  ];

  const benefits = [
    {
      title: "Increased Uptime",
      description: "Reduce unplanned downtime by up to 75%",
    },
    {
      title: "Extended Equipment Life",
      description: "Proper maintenance can double machinery lifespan",
    },
    {
      title: "Cost Savings",
      description: "Prevent expensive breakdowns and major repairs",
    },
    {
      title: "Safety Compliance",
      description: "Maintain OSHA and manufacturer safety standards",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Section */}
      <section className="mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 mb-4 sm:mb-6 leading-tight">
          Industrial Maintenance Services
        </h1>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl leading-relaxed">
          Our comprehensive maintenance programs keep your equipment running at
          peak performance while minimizing unexpected downtime. We combine
          scheduled preventive care with advanced diagnostic techniques.
        </p>

        <div className="bg-red-50 border-l-4 border-red-600 p-4 sm:p-5 mb-8 rounded-r-lg">
          <p className="text-gray-800 text-sm sm:text-base">
            <strong className="block sm:inline">Industry Standard:</strong>{" "}
            Proper maintenance can reduce overall maintenance costs by 18-25%
            compared to reactive approaches.
          </p>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-10 border-b pb-4">
          Our Maintenance Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {maintenancePlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex justify-center mb-6 bg-red-50 p-4 rounded-full w-20 h-20 mx-auto items-center">
                {plan.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-900">
                {plan.title}
              </h3>
              <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
                {plan.description}
              </p>
              <ul className="space-y-3 text-gray-700 mt-auto">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm sm:text-base">
                    <span className="text-red-600 mr-2 mt-1 text-lg">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Maintenance Process */}
      <section className="mb-16 sm:mb-20 bg-gray-50 p-6 sm:p-10 rounded-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-10">
          Our Maintenance Process
        </h2>

        {/* Mobile: 1 Col, Desktop: 2 Cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Column 1 */}
          <div className="space-y-8">
            <div className="flex items-start gap-4 sm:gap-6 bg-white p-4 rounded-lg shadow-sm sm:shadow-none sm:bg-transparent">
              <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                <FaCalendarAlt className="text-xl sm:text-2xl text-red-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  Scheduled Maintenance
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  We establish customized maintenance schedules based on your
                  equipment's:
                </p>
                <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base space-y-1">
                  <li>Manufacturer recommendations</li>
                  <li>Operational hours</li>
                  <li>Production cycles</li>
                  <li>Environmental conditions</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-6 bg-white p-4 rounded-lg shadow-sm sm:shadow-none sm:bg-transparent">
              <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                <FaChartLine className="text-xl sm:text-2xl text-red-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  Performance Tracking
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  Detailed reporting on equipment health and maintenance
                  history, including:
                </p>
                <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base space-y-1">
                  <li>Maintenance logs</li>
                  <li>Performance trends</li>
                  <li>Parts replacement history</li>
                  <li>Cost analysis</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-8">
            <div className="flex items-start gap-4 sm:gap-6 bg-white p-4 rounded-lg shadow-sm sm:shadow-none sm:bg-transparent">
              <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                <FaShieldAlt className="text-xl sm:text-2xl text-red-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  Safety & Compliance
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  All maintenance includes comprehensive safety checks:
                </p>
                <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base space-y-1">
                  <li>OSHA compliance verification</li>
                  <li>Safety system testing</li>
                  <li>Emergency stop checks</li>
                  <li>Guarding inspections</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-6 bg-white p-4 rounded-lg shadow-sm sm:shadow-none sm:bg-transparent">
              <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                <FaCogs className="text-xl sm:text-2xl text-red-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  Parts Management
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  We help optimize your spare parts inventory:
                </p>
                <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base space-y-1">
                  <li>Genuine OEM parts</li>
                  <li>Critical spares identification</li>
                  <li>Vendor management</li>
                  <li>Cost-effective alternatives</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Responsive Grid (1 -> 2 -> 4 cols) */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Maintenance Benefits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold mb-3 text-red-600">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Services */}
      <section className="mb-12 sm:mb-16 bg-blue-50 p-6 sm:p-10 rounded-2xl border border-blue-100">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex-shrink-0 bg-white p-4 rounded-full shadow-sm">
            <FaHeadset className="text-4xl sm:text-5xl text-blue-600" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">
              24/7 Emergency Support
            </h2>
            <p className="text-gray-700 mb-6 text-sm sm:text-lg">
              Our rapid response team is available around the clock for
              emergency repairs and breakdowns. Average response time: 2-4 hours
              for critical issues.
            </p>
            <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block shadow-sm">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                Emergency Hotline:{" "}
                <span className="text-red-600 block sm:inline mt-1 sm:mt-0 text-lg sm:text-base font-bold">
                  1-800-MAINT-NOW
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 sm:p-12 rounded-2xl shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Optimize Your Equipment Performance
          </h2>
          <p className="mb-8 text-base sm:text-lg md:text-xl text-red-100">
            Contact us today to develop a customized maintenance plan for your
            facility.
          </p>
          <button className="w-full sm:w-auto bg-white text-red-700 hover:bg-gray-100 font-bold py-3 sm:py-4 px-8 rounded-lg transition transform hover:-translate-y-1 shadow-md text-base sm:text-lg">
            Schedule Maintenance
          </button>
        </div>
      </section>
    </div>
  );
}
