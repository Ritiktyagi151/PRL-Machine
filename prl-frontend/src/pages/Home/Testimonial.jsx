import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const TestimonialSlider = () => {
  // 🔹 States
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({
    machinesSold: "0",
    satisfaction: "0",
    experience: "0",
    support: "0",
  });
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [activeTab, setActiveTab] = useState("written");
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 🔹 Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testRes, statsRes] = await Promise.all([
          axios.get(`${BASE_URL}/testimonials`),
          axios.get(`${BASE_URL}/testimonials/data/stats`),
        ]);
        setTestimonials(testRes.data || []);
        const statsData = Array.isArray(statsRes.data)
          ? statsRes.data[0]
          : statsRes.data;
        if (statsData) setStats(statsData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading testimonials data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [BASE_URL]);

  // 🔹 Responsive items per slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1);
      else if (window.innerWidth < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const videoTestimonials = testimonials.filter(
    (t) => t.video && t.video.trim() !== ""
  );
  const getActiveList = () =>
    activeTab === "written" ? testimonials : videoTestimonials;
  const length = Math.ceil(getActiveList().length / itemsPerSlide);

  // 🔹 Smooth Slide Logic
  const handleSlideChange = (newIndex) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(newIndex);
      setAnimating(false);
    }, 300); // Matches transition duration
  };

  const nextSlide = () => {
    const newIndex = current === length - 1 ? 0 : current + 1;
    handleSlideChange(newIndex);
  };

  const prevSlide = () => {
    const newIndex = current === 0 ? length - 1 : current - 1;
    handleSlideChange(newIndex);
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isHovered && activeTab === "written" && length > 0) {
      timeoutRef.current = setTimeout(nextSlide, 5000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, isHovered, length, activeTab]);

  if (loading)
    return (
      <div className="py-20 text-center text-white bg-gray-900">Loading...</div>
    );
  if (!testimonials || testimonials.length === 0) return null;

  const currentItems = getActiveList().slice(
    current * itemsPerSlide,
    current * itemsPerSlide + itemsPerSlide
  );

  const QuoteIcon = () => (
    <svg
      className="w-8 h-8 text-red-300"
      fill="currentColor"
      viewBox="0 0 32 32"
    >
      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1 0.9-2 2-2h2V8h-2zM22 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1 0.9-2 2-2h2V8h-2z" />
    </svg>
  );

  const StarIcon = ({ filled }) => (
    <svg
      className={`w-4 h-4 ${filled ? "text-red-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <section
      className="py-8 lg:py-20 bg-gradient-to-b from-gray-900 to-red-900 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://5.imimg.com/data5/SELLER/Default/2025/4/506635522/RT/QB/EE/245044699/upvc-window-manufacturing.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/50 "></div>

      <div className="container mx-auto px-4 sm:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-5">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white uppercase tracking-wider">
            What Our Clients Say
          </h2>
          <p className="text-lg text-red-200 max-w-3xl mx-auto italic">
            Trusted by Indian industry leaders for world-class machinery
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl bg-white/10 p-1 backdrop-blur-md border border-white/20">
            <button
              onClick={() => {
                setActiveTab("written");
                setCurrent(0);
              }}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === "written"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Written
            </button>
            <button
              onClick={() => {
                setActiveTab("video");
                setCurrent(0);
              }}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === "video"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Videos
            </button>
          </div>
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 🔹 Arrow Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/30 opacity-0 group-hover:opacity-100 hidden sm:block"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/30 opacity-0 group-hover:opacity-100 hidden sm:block"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* 🔹 Grid with Smooth Transition */}
          <div
            className={`grid gap-8 transition-all duration-500 ease-in-out ${
              animating
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            } ${
              itemsPerSlide === 1
                ? "grid-cols-1"
                : itemsPerSlide === 2
                ? "grid-cols-2"
                : "grid-cols-3"
            }`}
          >
            {currentItems.map((testimonial) => (
              <div
                key={testimonial._id || testimonial.id}
                className={`${
                  activeTab === "written" ? "bg-white/95" : "bg-gray-800/90"
                } rounded-3xl shadow-2xl p-8 h-full transition-transform hover:-translate-y-2 border border-white/10 flex flex-col`}
              >
                <div className="flex-grow">
                  {activeTab === "written" ? (
                    <>
                      <QuoteIcon />
                      <p className="text-gray-700 text-base my-6 leading-relaxed italic">
                        "{testimonial.content}"
                      </p>
                    </>
                  ) : (
                    <div className="relative pt-[56.25%] mb-6 rounded-2xl overflow-hidden shadow-lg bg-black">
                      <iframe
                        src={testimonial.video}
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                        title={testimonial.name}
                      ></iframe>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-6 pt-6 border-t border-gray-200/50">
                  <img
                    src={testimonial.image || "https://via.placeholder.com/60"}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-2xl object-cover mr-4 border-2 border-red-500 shadow-md"
                  />
                  <div className="min-w-0">
                    <h4
                      className={`font-bold text-lg truncate ${
                        activeTab === "written" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      {testimonial.name}
                    </h4>
                    <p className="text-red-600 text-xs font-bold uppercase tracking-tighter">
                      {testimonial.role}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {testimonial.company}
                    </p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < testimonial.rating} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🔹 Dots Indicators */}
          {length > 1 && (
            <div className="flex justify-center mt-12 space-x-3">
              {[...Array(length)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current ? "bg-red-500 w-12" : "bg-white/30 w-3"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 🔹 Stats Section */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: stats.machinesSold, label: "Machines Sold" },
            { val: stats.satisfaction, label: "Satisfaction" },
            { val: stats.experience, label: "Years Experience" },
            { val: stats.support, label: "Local Support" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 shadow-xl"
            >
              <div className="text-4xl font-black text-white mb-1 tracking-tighter">
                {s.val}
              </div>
              <div className="text-red-400 text-xs font-bold uppercase tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
