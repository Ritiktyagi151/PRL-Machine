import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Quote, ArrowUpRight, Factory, Zap, Target } from "lucide-react"; // Install lucide-react for icons

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      id: 1,
      title: "uPVC Window Manufacturing Automation",
      client: "Premium Windows Ltd.",
      category: "Automation",
      challenge:
        "Manual processes causing production bottlenecks and inconsistent scaling.",
      solution: "Installed PRL-4500 CNC Cutting Center with automated feeding.",
      results: ["+220% Production", "-35% Waste", "±0.1mm Precision"],
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1470",
    },
    {
      id: 2,
      title: "Aluminum Profile Fabrication Upgrade",
      client: "Urban Spaces Architects",
      category: "5-Axis Machining",
      challenge:
        "Inability to handle complex profile designs for modern skyscrapers.",
      solution:
        "PRL-7000 Multi-Function Machining Center with 5-axis capability.",
      results: ["Complex Geometries", "-60% Setup Time", "99.8% Repeatability"],
      image:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1470",
    },
    {
      id: 3,
      title: "High-Volume Production Line",
      client: "National Window Systems",
      category: "Full Production Line",
      challenge:
        "Quality dip during peak seasonal high-volume production demands.",
      solution: "Complete PRL production line with integrated automated QC.",
      results: ["500+ Units/Day", "0.2% Defect Rate", "25% Energy Saving"],
      image:
        "https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&q=80&w=1470",
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote:
        "Parida Red Lion's machines transformed our production capacity while maintaining exceptional precision.",
      author: "Rajiv Sharma",
      position: "CTO, Premium Windows",
    },
    {
      id: 2,
      quote:
        "The 5-axis capability of PRL-7000 has allowed us to realize architectural designs we previously couldn't execute.",
      author: "Priya Mehta",
      position: "Lead Designer, Urban Spaces",
    },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans">
      {/* --- Modern Hero Section --- */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Factory Floor"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-3 py-1 bg-red-600 text-xs font-bold uppercase tracking-widest mb-4">
              Success Stories
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Engineering <br />{" "}
              <span className="text-red-500">Excellence.</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              We don't just sell machines; we engineer growth. Explore how our
              partners attained industry-leading efficiency using Parida Red
              Lion technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Case Studies Grid --- */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Impact Reports
            </h2>
            <div className="h-1.5 w-20 bg-red-600 mb-6"></div>
            <p className="text-slate-600 italic">
              Proven results across global manufacturing hubs.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-red-600 uppercase shadow-sm">
                  {study.category}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                  {study.title}
                </h3>
                <p className="text-red-600 font-semibold text-sm mb-6 uppercase tracking-wider">
                  Client: {study.client}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <Target className="w-5 h-5 text-slate-400 shrink-0" />
                    <p className="text-sm text-slate-600 leading-snug">
                      <span className="font-bold text-slate-800">
                        Challenge:
                      </span>{" "}
                      {study.challenge}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Zap className="w-5 h-5 text-slate-400 shrink-0" />
                    <p className="text-sm text-slate-600 leading-snug">
                      <span className="font-bold text-slate-800">
                        PRL Solution:
                      </span>{" "}
                      {study.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {study.results.map((res, i) => (
                      <span
                        key={i}
                        className="bg-white border border-slate-200 px-3 py-1 rounded text-xs font-bold text-slate-700 shadow-sm"
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Testimonial Section (Minimalist) --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/10 skew-x-12 translate-x-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            autoplay={{ delay: 6000 }}
            loop={true}
            className="max-w-4xl"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="text-center md:text-left">
                  <Quote className="w-16 h-16 text-red-600 opacity-50 mb-8 mx-auto md:mx-0" />
                  <p className="text-3xl md:text-4xl font-light leading-relaxed mb-10 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-12 h-1 bg-red-600"></div>
                    <div>
                      <h4 className="font-bold text-xl">{t.author}</h4>
                      <p className="text-red-500 font-medium">{t.position}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your Efficiency Journey
              </h2>
              <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
                Ready to see these numbers in your factory? Let our consultants
                build a custom automation roadmap for your business.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all flex items-center justify-center gap-2 group">
                  Book a Consultation{" "}
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <button className="px-10 py-4 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-all">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;
