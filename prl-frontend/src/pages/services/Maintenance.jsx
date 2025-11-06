import React from "react";
import { FaTools, FaCalendarAlt, FaChartLine, FaShieldAlt, FaCogs, FaHeadset, FaClipboardCheck, FaIndustry } from "react-icons/fa";

export default function Maintenance() {
  const maintenancePlans = [
    {
      icon: <FaTools className="text-3xl text-red-600" />,
      title: "Preventive Maintenance",
      description: "Regular scheduled service to prevent breakdowns before they occur",
      features: [
        "Lubrication and adjustments",
        "Component inspections",
        "Performance testing",
        "Early problem detection"
      ]
    },
    {
      icon: <FaClipboardCheck className="text-3xl text-red-600" />,
      title: "Predictive Maintenance",
      description: "Advanced monitoring to predict and prevent failures",
      features: [
        "Vibration analysis",
        "Thermal imaging",
        "Oil analysis",
        "Condition monitoring"
      ]
    },
    {
      icon: <FaIndustry className="text-3xl text-red-600" />,
      title: "Corrective Maintenance",
      description: "Repairs and restoration when issues are identified",
      features: [
        "Component replacement",
        "Alignment and calibration",
        "System troubleshooting",
        "Emergency repairs"
      ]
    }
  ];

  const benefits = [
    {
      title: "Increased Uptime",
      description: "Reduce unplanned downtime by up to 75%"
    },
    {
      title: "Extended Equipment Life",
      description: "Proper maintenance can double machinery lifespan"
    },
    {
      title: "Cost Savings",
      description: "Prevent expensive breakdowns and major repairs"
    },
    {
      title: "Safety Compliance",
      description: "Maintain OSHA and manufacturer safety standards"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Industrial Maintenance Services</h1>
        <p className="text-gray-700 text-lg mb-6 max-w-3xl">
          Our comprehensive maintenance programs keep your equipment running at peak performance while minimizing unexpected downtime.
          We combine scheduled preventive care with advanced diagnostic techniques to maximize your operational efficiency.
        </p>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8">
          <p className="text-gray-800">
            <strong>Industry Standard:</strong> Proper maintenance can reduce overall maintenance costs by 18-25% compared to reactive approaches.
          </p>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-2">Our Maintenance Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {maintenancePlans.map((plan, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex justify-center mb-4">{plan.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-3">{plan.title}</h3>
              <p className="text-gray-600 text-center mb-4">{plan.description}</p>
              <ul className="space-y-2 text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Maintenance Process */}
      <section className="mb-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Maintenance Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <FaCalendarAlt className="text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Scheduled Maintenance</h3>
                <p className="text-gray-600">
                  We establish customized maintenance schedules based on your equipment's:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
                  <li>Manufacturer recommendations</li>
                  <li>Operational hours</li>
                  <li>Production cycles</li>
                  <li>Environmental conditions</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <FaChartLine className="text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
                <p className="text-gray-600">
                  Detailed reporting on equipment health and maintenance history, including:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
                  <li>Maintenance logs</li>
                  <li>Performance trends</li>
                  <li>Parts replacement history</li>
                  <li>Cost analysis</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <FaShieldAlt className="text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Safety & Compliance</h3>
                <p className="text-gray-600">
                  All maintenance includes comprehensive safety checks:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
                  <li>OSHA compliance verification</li>
                  <li>Safety system testing</li>
                  <li>Emergency stop checks</li>
                  <li>Guarding inspections</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <FaCogs className="text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Parts Management</h3>
                <p className="text-gray-600">
                  We help optimize your spare parts inventory:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
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

      {/* Benefits */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Maintenance Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-red-600">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Services */}
      <section className="mb-12 bg-blue-50 p-8 rounded-lg border border-blue-100">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <FaHeadset className="text-5xl text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-3">24/7 Emergency Support</h2>
            <p className="text-gray-700 mb-4">
              Our rapid response team is available around the clock for emergency repairs and breakdowns.
              Average response time: 2-4 hours for critical issues.
            </p>
            <div className="bg-white p-4 rounded border border-gray-200 inline-block">
              <p className="font-semibold text-gray-800">
                Emergency Hotline: <span className="text-red-600">1-800-MAINT-NOW</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white p-8 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Optimize Your Equipment Performance</h2>
          <p className="mb-6 text-lg">
            Contact us today to develop a customized maintenance plan for your facility.
          </p>
          <button className="bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
            Schedule Maintenance
          </button>
        </div>
      </section>
    </div>
  );
}