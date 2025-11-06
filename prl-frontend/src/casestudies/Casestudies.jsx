import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const CaseStudiesPage = () => {
  // Case studies data
  const caseStudies = [
    {
      id: 1,
      title: "uPVC Window Manufacturing Automation",
      client: "Premium Windows Ltd.",
      challenge: "Manual processes causing production bottlenecks",
      solution: "Installed PRL-4500 CNC Cutting Center with automated feeding",
      results: [
        "Increased production by 220%",
        "Reduced material waste by 35%",
        "Improved precision to ±0.1mm",
      ],
      image:
        "https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Aluminum Profile Fabrication Upgrade",
      client: "Urban Spaces Architects",
      challenge: "Inability to handle complex profile designs",
      solution:
        "PRL-7000 Multi-Function Machining Center with 5-axis capability",
      results: [
        "Enabled complex geometric profiles",
        "Reduced setup time by 60%",
        "Achieved 99.8% repeatability",
      ],
      image:
        "https://images.unsplash.com/photo-1581093450021-4a7360e9a6a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "High-Volume Production Line",
      client: "National Window Systems",
      challenge: "Inconsistent quality in high-volume production",
      solution: "Complete PRL production line with automated quality control",
      results: [
        "Consistent output of 500+ units/day",
        "Defect rate reduced to 0.2%",
        "Energy savings of 25%",
      ],
      image:
        "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote:
        "Parida Red Lion's machines transformed our production capacity while maintaining exceptional precision.",
      author: "Rajiv Sharma, CTO, Premium Windows",
      position: "Chief Technology Officer",
    },
    {
      id: 2,
      quote:
        "The 5-axis capability of PRL-7000 has allowed us to realize architectural designs we previously couldn't execute.",
      author: "Priya Mehta, Lead Designer",
      position: "Urban Spaces Architects",
    },
    {
      id: 3,
      quote:
        "Our ROI on the PRL production line was achieved in just 11 months due to the dramatic efficiency gains.",
      author: "Amit Patel, Operations Head",
      position: "National Window Systems",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* banner Section */}

      <div className="mt-[41px] relative">
        {/* Desktop Banner with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
          <img
            src="/assets/banners/case-study.jpg"
            alt="case study"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Mobile Banner with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="block md:hidden"
        >
          <img
            src="/assets/banners/services-mobile-view.jpg"
            alt="case study mobile"
            className="w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Case Studies Grid */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Case Studies
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how industry leaders are achieving remarkable results with
            our uPVC and aluminum window manufacturing solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {study.title}
                </h3>
                <p className="text-sm text-blue-600 font-medium mb-4">
                  Client: {study.client}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                    Challenge
                  </h4>
                  <p className="text-gray-700">{study.challenge}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                    PRL Solution
                  </h4>
                  <p className="text-gray-700">{study.solution}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                    Results Achieved
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {study.results.map((result, i) => (
                      <li key={i}>{result}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear directly from manufacturers who have transformed their
              operations with our machines.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop={true}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-white p-8 rounded-xl shadow-md">
                    <svg
                      className="w-12 h-12 text-red-500 mb-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-xl italic text-gray-700 mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-bold text-gray-800">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Manufacturing?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how Parida Red Lion machines can solve your
              production challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 font-medium rounded-lg transition-colors duration-300"
              >
                Request Case Study Details
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 font-medium rounded-lg transition-colors duration-300"
              >
                Contact Our Experts
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;
