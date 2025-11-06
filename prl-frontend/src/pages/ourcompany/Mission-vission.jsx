import React from "react";

const MissionVision = () => {
  return (
    <div className="space-y-8">
      <h3
        className="text-2xl font-bold border-b pb-2"
        style={{ color: "#1E1D5C", borderColor: "#EC1C24" }}
      >
        Mission & Vision
      </h3>

      {/* Vision Section */}
      <div
        className="p-6 rounded-lg border"
        style={{ backgroundColor: "#F8F9FA", borderColor: "#EC1C24" }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              alt="Global Vision"
              className="w-full sticky top-52 h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="md:w-2/3">
            <h4 className="text-xl font-bold mb-4" style={{ color: "#1E1D5C" }}>
              Our Vision
            </h4>
            <p className="mb-4" style={{ color: "#1E1D5C" }}>
              PRL aims to become the global benchmark in uPVC machinery
              manufacturing by empowering industries with cutting-edge uPVC
              fabrication machines, energy-efficient production technologies,
              and sustainable solutions. We envision a future where precision
              engineering and uPVC machine innovation meet environmental
              consciousness—delivering machinery that sets the standard for
              performance, durability, and reliability.
            </p>
            <p className="mb-6" style={{ color: "#1E1D5C" }}>
              Our goal is to lead the transformation of the window and door
              fabrication industry through intelligent uPVC automation,
              world-class service, and unwavering commitment to quality. We
              envision a world where every window and door crafted with our uPVC
              & aluminium window machines contributes to enhanced living spaces,
              reduced environmental impact, and enduring architectural beauty.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Lead with Innovation",
                  content:
                    "Constantly push the boundaries of uPVC window machine technology by investing in R&D and fostering a culture of creativity and technical excellence.",
                },
                {
                  title: "Deliver Unmatched Value",
                  content:
                    "Provide clients with high-performance uPVC welding, cutting, and cleaning machines that offer superior performance, lower operational costs, and enhanced product quality.",
                },
                {
                  title: "Support Sustainable Growth",
                  content:
                    "Design eco-friendly uPVC and aluminium machines that minimize waste, reduce energy consumption, and support green practices.",
                },
                {
                  title: "Be Globally Recognized",
                  content:
                    "Expand our global footprint in the uPVC fabrication equipment market by building trust and delivering excellence worldwide.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border shadow-sm"
                  style={{ borderColor: "#EC1C24" }}
                >
                  <h5
                    className="font-semibold mb-2"
                    style={{ color: "#EC1C24" }}
                  >
                    {item.title}
                  </h5>
                  <p className="text-sm" style={{ color: "#1E1D5C" }}>
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div
        className="p-6 rounded-lg border"
        style={{ backgroundColor: "#F8F9FA", borderColor: "#EC1C24" }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-2/3">
            <h4 className="text-xl font-bold mb-4" style={{ color: "#1E1D5C" }}>
              Our Mission
            </h4>
            <p className="mb-4" style={{ color: "#1E1D5C" }}>
              Our mission is to design, manufacture, and deliver
              high-performance uPVC and aluminium fabrication machinery that
              exceeds customer expectations and promotes operational excellence.
              Through continuous machine innovation, precision manufacturing,
              and dedicated customer support, we aim to empower businesses
              globally to create superior uPVC windows and doors with accuracy
              and efficiency.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h5 className="font-semibold mb-3" style={{ color: "#EC1C24" }}>
                  We are committed to:
                </h5>
                <ul className="space-y-2" style={{ color: "#1E1D5C" }}>
                  {[
                    "Engineering Excellence: Crafting uPVC profile cutting machines, multi-head welding machines, and more—using the latest technology and world-class materials.",
                    "Customer-Centric Approach: Building long-term partnerships by understanding client needs and offering custom uPVC machinery solutions with dedicated support.",
                    "Sustainable Practices: Integrating energy-efficient components and low-waste production systems into all uPVC machine models.",
                    "Skilled Workforce Development: Training our team to deliver excellence in both machine innovation and after-sales service.",
                    "Global Competitiveness: Offering scalable, affordable, and premium uPVC fabrication machines with strong global distribution.",
                    "After-Sales Excellence: Ensuring every customer has access to timely maintenance, installation, training, and ongoing support for all uPVC machine users.",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2" style={{ color: "#EC1C24" }}>
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="bg-white p-4 rounded-lg border shadow-sm"
                style={{ borderColor: "#EC1C24" }}
              >
                <h5 className="font-semibold mb-3" style={{ color: "#EC1C24" }}>
                  Strategic Focus:
                </h5>
                <ul className="space-y-2 text-sm" style={{ color: "#1E1D5C" }}>
                  {[
                    "Innovating Relentlessly with intelligent, automated uPVC fabrication machines",
                    "Ensuring Uncompromising Quality with stringent quality control processes",
                    "Empowering Customer Success with comprehensive support and tailored solutions",
                    "Championing Sustainability through energy-efficient machine design",
                    "Fostering a Culture of Excellence within our team",
                    "Expanding Global Reach through strategic market presence",
                    "Driving Industry Advancement through collaboration and expertise sharing",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2" style={{ color: "#EC1C24" }}>
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              alt="Mission Excellence"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              alt="Precision Engineering"
              className="w-full h-48 object-cover rounded-lg shadow-md mt-4"
            />
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div
        className="p-6 rounded-lg border"
        style={{ backgroundColor: "#F8F9FA", borderColor: "#EC1C24" }}
      >
        <h4 className="text-xl font-bold mb-4" style={{ color: "#1E1D5C" }}>
          Our Core Values
        </h4>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Excellence",
              content:
                "By offering the most technologically advanced uPVC machines, we've introduced new innovations in PVC and aluminium machine tools. PRL is now one of the fastest-growing uPVC machinery producers in India. We are performance-driven, embrace change, and constantly improve our processes, service, and solutions to meet the dynamic demands of the fabrication machinery industry.",
              image:
                "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            },
            {
              title: "Team Work",
              content:
                "Using the latest technology in uPVC and aluminium window machine production, and applying a quality-first philosophy, PRL delivers machines that meet international standards. Our commitment to capital investment helps our partners grow sustainably and efficiently.",
              image:
                "https://images.unsplash.com/photo-1573164574230-db1d5e960238?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            },
            {
              title: "Genuine",
              content:
                "We at PRL believe in integrity, honesty, and responsibility. We stand behind our uPVC machines so your production doesn't stop. Every PRL machine is backed by decades of technical experience, innovation, and dedication to long-term client success.",
              image:
                "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            },
            {
              title: "Customer Delight",
              content:
                "From our transparent business practices to our personalized support, clients appreciate our fair and professional approach. Our focus on client-first service, backed by a deep understanding of their uPVC production needs, helps businesses grow and succeed.",
              image:
                "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md border"
              style={{ borderColor: "#EC1C24" }}
            >
              <img
                src={value.image}
                alt={value.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h5 className="font-semibold mb-2" style={{ color: "#EC1C24" }}>
                  {value.title}
                </h5>
                <p className="text-sm" style={{ color: "#1E1D5C" }}>
                  {value.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <div
        className="p-6 rounded-lg border"
        style={{ backgroundColor: "#1E1D5C", borderColor: "#EC1C24" }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/3">
            <img
              src="/assets/Aboutimg/Our-Philosophy.png"
              alt="Company Philosophy"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-2/3">
            <h4 className="text-xl font-bold mb-4 text-white">
              Our Philosophy
            </h4>
            <p className="mb-4 text-white">
              Our commitment to continuous innovation has helped PRL become a
              respected name in the window machinery industry. Our core goal is
              to meet client expectations in both machine quality and
              cost-efficiency.
            </p>
            <p className="mb-4 text-white">
              We pursue win-win partnerships based on transparency, trust, and
              long-term collaboration. We combine practical industry insights
              with proven technology to improve our uPVC machinery manufacturing
              processes, and deliver future-ready fabrication solutions.
            </p>
            <p className="text-white">
              Backed by decades of experience and strong relationships with
              fabricators, PRL has risen to the top tier of the uPVC machine
              manufacturing sector. Our operations are driven by efficiency,
              precision, and the constant integration of customer feedback and
              intelligent design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
