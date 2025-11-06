import React from "react";
import {
  FaChalkboardTeacher,
  FaUserShield,
  FaCertificate,
  FaCogs,
  FaClock,
  FaUsers,
  FaBookOpen,
  FaQrcode,
} from "react-icons/fa";

export default function Training() {
  const trainingPrograms = [
    {
      icon: <FaChalkboardTeacher className="text-3xl text-red-600" />,
      title: "Operator Certification",
      description:
        "Comprehensive training covering all aspects of machine operation and safety protocols",
    },
    {
      icon: <FaUserShield className="text-3xl text-red-600" />,
      title: "Safety Training",
      description:
        "OSHA-compliant programs to ensure workplace safety and accident prevention",
    },
    {
      icon: <FaCogs className="text-3xl text-red-600" />,
      title: "Maintenance Basics",
      description:
        "Essential maintenance skills to help operators identify and prevent common issues",
    },
    {
      icon: <FaQrcode className="text-3xl text-red-600" />,
      title: "Digital Systems Training",
      description:
        "Instruction on modern control systems and digital interfaces",
    },
  ];

  const trainingFeatures = [
    {
      title: "Hands-on Learning",
      description: "70% practical training on actual equipment",
    },
    {
      title: "Customized Content",
      description: "Tailored to your specific machines and processes",
    },
    {
      title: "Multi-lingual Options",
      description: "Available in English, Spanish, and other languages",
    },
    {
      title: "Ongoing Support",
      description: "Post-training resources and refresher courses",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Industrial Equipment Training Programs
        </h1>
        <p className="text-gray-700 text-lg mb-6 max-w-3xl">
          Our comprehensive training programs empower your staff with the
          knowledge and skills needed for safe, efficient machine operation. We
          combine classroom instruction with hands-on practice to ensure maximum
          knowledge retention and operational confidence.
        </p>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8">
          <p className="text-gray-800">
            <strong>Proven Results:</strong> Companies report 45% fewer
            operational errors after completing our training programs.
          </p>
        </div>
      </section>

      {/* Training Programs Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-2">
          Our Training Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingPrograms.map((program, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">{program.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {program.title}
              </h3>
              <p className="text-gray-600 text-center">{program.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Training Approach */}
      <section className="mb-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Our Training Methodology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaBookOpen className="text-red-600 mr-3" />
              Classroom Instruction
            </h3>
            <p className="text-gray-600 mb-6">
              Detailed technical overviews covering equipment principles,
              operational theory, and manufacturer specifications. Includes
              interactive Q&A sessions and visual presentations.
            </p>

            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaUsers className="text-red-600 mr-3" />
              Hands-on Practice
            </h3>
            <p className="text-gray-600">
              Supervised practical sessions where trainees operate equipment
              under expert guidance. Includes realistic scenarios and
              troubleshooting exercises.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaClock className="text-red-600 mr-3" />
              Program Structure
            </h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  1
                </span>
                Pre-training assessment of skill levels
              </li>
              <li className="flex items-start">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  2
                </span>
                Customized training plan development
              </li>
              <li className="flex items-start">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  3
                </span>
                Progressive skill-building modules
              </li>
              <li className="flex items-start">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  4
                </span>
                Final competency evaluation
              </li>
            </ul>

            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-semibold mb-2">Typical Duration:</h4>
              <p className="text-gray-600">
                2-5 days depending on equipment complexity and trainee
                experience level
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Program Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-full mt-1">
                <FaCertificate className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certification */}
      <section className="mb-12 bg-blue-50 p-8 rounded-lg border border-blue-100">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <FaCertificate className="text-5xl text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-3">
              Industry-Recognized Certification
            </h2>
            <p className="text-gray-700 mb-4">
              Upon successful completion, participants receive formal
              certification valid for three years. Our certificates are
              recognized by major equipment manufacturers and industry
              associations.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Includes photo ID certification card</li>
              <li>Digital credentials available</li>
              <li>Employer verification portal</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white p-8 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Train Your Team?</h2>
          <p className="mb-6 text-lg">
            Contact our training coordinators to discuss your specific needs and
            schedule sessions.
          </p>
          <button className="bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
            Schedule Training
          </button>
        </div>
      </section>
    </div>
  );
}
