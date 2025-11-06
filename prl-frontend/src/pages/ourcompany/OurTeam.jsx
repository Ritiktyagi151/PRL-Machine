import React from "react";

const OurTeam = () => {
  const leadershipTeam = [
    {
      name: "Mr. Rajesh Kumar",
      role: "Founder & Director",
      bio: "Visionary leader with extensive experience in machinery manufacturing and business development.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Mr. xyz",
      role: "Co-Founder & Director",
      bio: "Technical expert specializing in uPVC and Aluminium window machine engineering and innovation.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const departments = [
    {
      title: "Engineering & Design",
      description:
        "Our skilled engineers and designers create precision machinery with innovative features.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      title: "Manufacturing",
      description:
        "State-of-the-art production facility with advanced equipment for quality manufacturing.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Research & Development",
      description:
        "Continuous innovation to improve machine performance and incorporate new technologies.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      title: "Customer Support",
      description:
        "Comprehensive after-sales service including training, spare parts, and technical assistance.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  const stats = [
    { number: "50+", label: "Team Members" },
    { number: "10,000+", label: "Sq Ft Facility" },
    { number: "8+", label: "Years Experience" },
    { number: "25+", label: "Machine Types" },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#281E5A] mb-4">
            Our Team & Expertise
          </h2>
          <div className="w-20 h-1 bg-[#EC1C24] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At PARIDA RED LION INDIA PVT LTD (PRL), we combine decades of
            expertise with cutting-edge innovation to deliver exceptional uPVC
            and Aluminium window making machines.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#281E5A] mb-8 text-center">
            Leadership Team
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadershipTeam.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-[#281E5A] mb-1">
                    {member.name}
                  </h4>
                  <p className="text-[#EC1C24] font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-[#281E5A] to-[#1c1345] rounded-2xl p-8 text-white mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Story */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-16">
          <h3 className="text-2xl font-bold text-[#281E5A] mb-6">
            Our Journey
          </h3>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Established in 2017, we started with nothing—no funding, no
              facility, not even a proper workspace. Just a vision. What we
              lacked in resources, we made up for in determination, grit, and
              hard work. From a small 4-person team building our first
              prototypes with basic tools, every step of our journey was powered
              by the belief that one day, we'd build something that matters.
            </p>
            <p className="mb-4">
              Today, that belief has taken shape. We now operate a full-fledged
              manufacturing facility of 10,000 sq ft, equipped with advanced
              machinery and run by a dedicated team of over 50 full-time
              professionals. From humble beginnings to a growing name in the
              machine manufacturing industry, our focus has never wavered:
              quality, innovation, and customer trust.
            </p>
            <p>
              We are not just a company. We are proof that big dreams, backed by
              hard work, can build something real. Something lasting.
            </p>
          </div>
        </div>

        {/* Departments/Expertise */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#281E5A] mb-8 text-center">
            Our Expertise
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#EC1C24] text-center"
              >
                <div className="text-[#281E5A] mb-4 flex justify-center">
                  {dept.icon}
                </div>
                <h4 className="text-lg font-bold text-[#281E5A] mb-2">
                  {dept.title}
                </h4>
                <p className="text-gray-600 text-sm">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-16">
          <h3 className="text-2xl font-bold text-[#281E5A] mb-6">
            What We Offer
          </h3>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              We specialize in the complete lifecycle of uPVC machine
              manufacturing, from conceptualization and design to fabrication,
              assembly, testing, and deployment. Our core offerings include:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2">
                <strong>
                  uPVC & Aluminium Window Making Cutting Machines:
                </strong>{" "}
                Precision single and double-head cutting saws for accurate
                profile preparation.
              </li>
              <li className="mb-2">
                <strong>Welding Machines:</strong> State-of-the-art single,
                double, triple, and four-head welding machines for strong and
                seamless frame fabrication.
              </li>
              <li className="mb-2">
                <strong>Corner Cleaning Machines:</strong> Automated and manual
                corner cleaning solutions for a perfect finish.
              </li>
              <li className="mb-2">
                <strong>Milling Machines:</strong> Water slot, end milling, and
                other specialized milling machines for various profile
                operations.
              </li>
              <li className="mb-2">
                <strong>Glazing Bead Saws:</strong> Dedicated machines for
                precise cutting of glazing beads.
              </li>
              <li className="mb-2">
                <strong>Reinforcement Screw Fixing Machines:</strong> Efficient
                solutions for securing steel reinforcements.
              </li>
              <li>
                <strong>Ancillary Equipment:</strong> A full suite of supporting
                machinery and tools for a complete production line.
              </li>
            </ul>
          </div>
        </div>

        {/* Why Choose PRL */}
        <div className="bg-gradient-to-r from-[#281E5A] to-[#1c1345] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Why Choose PRL?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">
                Our Commitment to Quality & Innovation
              </h4>
              <p className="mb-4 opacity-90">
                At PRL, quality is not just a standard; it's our foundation.
                Every machine is meticulously engineered using high-grade
                materials and components, undergoing rigorous testing to ensure
                durability, reliability, and optimal performance.
              </p>
              <p className="opacity-90">
                We continuously invest in research and development,
                incorporating the latest technological advancements such as PLC
                control systems, servo motors, and intuitive HMI interfaces to
                enhance automation, accuracy, and ease of use for our clients.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Our Advantages</h4>
              <ul className="list-disc pl-5 opacity-90">
                <li className="mb-2">
                  <strong>Expertise:</strong> Decades of collective experience
                  in uPVC machinery design and manufacturing.
                </li>
                <li className="mb-2">
                  <strong>Reliability:</strong> Machines built for continuous,
                  heavy-duty operation with minimal downtime.
                </li>
                <li className="mb-2">
                  <strong>Precision:</strong> Advanced technology ensuring high
                  accuracy and consistent product quality.
                </li>
                <li className="mb-2">
                  <strong>Customization:</strong> Solutions tailored to meet
                  specific production requirements and capacities.
                </li>
                <li>
                  <strong>Comprehensive Support:</strong> Excellent pre-sales
                  consultation, installation, training, and prompt after-sales
                  service.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
