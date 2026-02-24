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

  // 🔹 API & Image Path Setup
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const SERVER_ROOT = BASE_URL.split("/api")[0];
  const IMAGE_BASE_URL = `${SERVER_ROOT}/uploads`;

  // 🔹 Helper: Extract URL from iframe tag or convert watch link to embed
  const getEmbedUrl = (input) => {
    if (!input) return "";

    let url = input.trim();

    // Case 1: Agar user ne poora <iframe> tag paste kar diya ho
    if (url.includes("<iframe")) {
      const srcMatch = url.match(/src=["']([^"']+)["']/);
      url = srcMatch ? srcMatch[1] : url;
    }

    // Case 2: Agar URL pehle se embed format mein hai
    if (url.includes("youtube.com/embed/")) return url;

    // Case 3: Regular watch?v= ya youtu.be links ko convert karna
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }

    return url;
  };

  // 🔹 Helper: Image path handle karne ke liye
  const getFullImgPath = (imgName) => {
    if (!imgName) return "https://via.placeholder.com/60";
    if (imgName.startsWith("http")) return imgName;
    return `${IMAGE_BASE_URL}/${imgName}`;
  };

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
    (t) => t.video && t.video.trim() !== "",
  );
  const getActiveList = () =>
    activeTab === "written" ? testimonials : videoTestimonials;
  const length = Math.ceil(getActiveList().length / itemsPerSlide);

  const handleSlideChange = (newIndex) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(newIndex);
      setAnimating(false);
    }, 300);
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
      <div className="py-20 text-center text-white bg-gray-900 font-bold">
        Loading Testimonials...
      </div>
    );

  if (!testimonials || testimonials.length === 0) return null;

  const currentItems = getActiveList().slice(
    current * itemsPerSlide,
    current * itemsPerSlide + itemsPerSlide,
  );

  const QuoteIcon = () => (
    <svg
      className="w-8 h-8 text-red-400 opacity-50"
      fill="currentColor"
      viewBox="0 0 32 32"
    >
      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1 0.9-2 2-2h2V8h-2zM22 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1 0.9-2 2-2h2V8h-2z" />
    </svg>
  );

  const StarIcon = ({ filled }) => (
    <svg
      className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <section
      className="py-8 lg:py-20 bg-gray-900 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://5.imimg.com/data5/SELLER/Default/2025/4/506635522/RT/QB/EE/245044699/upvc-window-manufacturing.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="container mx-auto px-4 sm:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-white uppercase tracking-tight">
            What Our Clients <span className="text-red-600">Say</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto italic">
            Trusted by Indian industry leaders for world-class machinery.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-white/10 p-1 backdrop-blur-md border border-white/20">
            <button
              onClick={() => {
                setActiveTab("written");
                setCurrent(0);
              }}
              className={`px-8 py-2.5 text-sm font-bold rounded-full transition-all ${activeTab === "written" ? "bg-red-600 text-white shadow-lg" : "text-gray-300 hover:text-white"}`}
            >
              Written
            </button>
            <button
              onClick={() => {
                setActiveTab("video");
                setCurrent(0);
              }}
              className={`px-8 py-2.5 text-sm font-bold rounded-full transition-all ${activeTab === "video" ? "bg-red-600 text-white shadow-lg" : "text-gray-300 hover:text-white"}`}
            >
              Videos
            </button>
          </div>
        </div>

        <div
          className="relative group min-h-[400px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-red-600 text-white p-4 rounded-full backdrop-blur-md transition-all border border-white/20 opacity-0 group-hover:opacity-100 hidden sm:block"
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
            className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-red-600 text-white p-4 rounded-full backdrop-blur-md transition-all border border-white/20 opacity-0 group-hover:opacity-100 hidden sm:block"
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

          {/* Testimonial Grid */}
          <div
            className={`grid gap-8 transition-all duration-500 ease-in-out ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"} ${itemsPerSlide === 1 ? "grid-cols-1" : itemsPerSlide === 2 ? "grid-cols-2" : "grid-cols-3"}`}
          >
            {currentItems.map((testimonial) => (
              <div
                key={testimonial._id || testimonial.id}
                className={`${activeTab === "written" ? "bg-white" : "bg-gray-800"} rounded-3xl shadow-2xl p-8 h-full transition-all hover:shadow-red-900/20 border border-white/5 flex flex-col`}
              >
                <div className="flex-grow">
                  {activeTab === "written" ? (
                    <>
                      <QuoteIcon />
                      <p
                        className={`text-base my-6 leading-relaxed italic ${activeTab === "written" ? "text-gray-700" : "text-gray-300"}`}
                      >
                        "{testimonial.content}"
                      </p>
                    </>
                  ) : (
                    <div className="relative pt-[56.25%] mb-6 rounded-2xl overflow-hidden shadow-2xl bg-black">
                      <iframe
                        src={getEmbedUrl(testimonial.video)}
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title={testimonial.name}
                      ></iframe>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-6 pt-6 border-t border-gray-100/10">
                  <img
                    src={getFullImgPath(testimonial.image)}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-2xl object-cover mr-4 border-2 border-red-500 shadow-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/60";
                    }}
                  />
                  <div className="min-w-0">
                    <h4
                      className={`font-bold text-lg truncate ${activeTab === "written" ? "text-gray-900" : "text-white"}`}
                    >
                      {testimonial.name}
                    </h4>
                    <p className="text-red-600 text-xs font-bold uppercase tracking-widest">
                      {testimonial.role}
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

          {/* Dots */}
          {length > 1 && (
            <div className="flex justify-center mt-12 space-x-3">
              {[...Array(length)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === current ? "bg-red-500 w-10" : "bg-white/20 w-2.5"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: stats.machinesSold, label: "Machines Sold" },
            { val: stats.satisfaction, label: "Satisfaction" },
            { val: stats.experience, label: "Years Experience" },
            { val: stats.support, label: "Local Support" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10 shadow-lg"
            >
              <div className="text-4xl font-black text-white mb-1 tracking-tighter">
                {s.val}
              </div>
              <div className="text-red-500 text-xs font-bold uppercase tracking-widest">
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
