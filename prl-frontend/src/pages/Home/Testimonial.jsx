import React, { useState, useEffect, useRef } from "react";

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Michael Johnson",
      role: "Manufacturing Director",
      company: "TechFab Industries",
      content:
        "The welding machines from Red Lion have transformed our production line. The precision and durability are unmatched in the industry. We've seen a 35% increase in output since implementing their systems.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Operations Manager",
      company: "Alumax Solutions",
      content:
        "Their cutting machines increased our efficiency by 40%. The after-sales support is exceptional - always available when we need them. We've expanded our operations thanks to their reliable equipment.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Production Lead",
      company: "Precision Engineering Co.",
      content:
        "We purchased the CNC routing system last year and it has been flawless. The training provided was comprehensive and thorough. Our operators were up and running within days.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      role: "Quality Assurance",
      company: "Metro Fabrications",
      content:
        "The corner cleaning machine eliminated our finishing problems. It works perfectly with all our profile types and requires minimal maintenance. Our defect rate dropped by 75% after implementation.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Plant Supervisor",
      company: "Allied Industrial",
      content:
        "Their technical team helped us customize a solution that exactly matched our workflow. The machines have been running non-stop for 8 months with zero downtime. Incredible reliability!",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: 6,
      name: "Priya Patel",
      role: "Production Manager",
      company: "Global Fenestrations",
      content:
        "The automatic welding system reduced our labor costs by 30% while improving quality consistency across all our products. ROI was achieved in just 7 months.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    },
    {
      id: 7,
      name: "Robert Kim",
      role: "Technical Director",
      company: "Advanced Window Systems",
      content:
        "We've been using Red Lion machines for over 5 years now. Their equipment stands up to heavy use and their spare parts availability is excellent. Truly a partnership that has helped us grow.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      role: "CEO",
      company: "EuroStyle Windows",
      content:
        "After trying several brands, we standardized on Red Lion across all our facilities. The consistency and precision have elevated our product quality and customer satisfaction.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/35.jpg",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    },
    {
      id: 9,
      name: "Lisa Anderson",
      role: "CEO",
      company: "EuroStyle Windows",
      content:
        "After trying several brands, we standardized on Red Lion across all our facilities. The consistency and precision have elevated our product quality and customer satisfaction.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/35.jpg",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [activeTab, setActiveTab] = useState("written"); // "written" or "video"
  const timeoutRef = useRef(null);

  // Update items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2); // Tablet
      } else {
        setItemsPerSlide(3); // Desktop
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  // Filter testimonials with videos
  const videoTestimonials = testimonials.filter((t) => t.video);

  const length = Math.ceil(
    (activeTab === "written" ? testimonials : videoTestimonials).length /
      itemsPerSlide
  );

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isHovered && activeTab === "written") {
      timeoutRef.current = setTimeout(
        nextSlide,
        5000 // Auto-advance every 5 seconds
      );
    }

    return () => {
      resetTimeout();
    };
  }, [current, isHovered, length, activeTab]);

  if (!Array.isArray(testimonials) || testimonials.length <= 0) {
    return null;
  }

  // Get current set of testimonials
  const currentItems =
    activeTab === "written"
      ? testimonials.slice(
          current * itemsPerSlide,
          current * itemsPerSlide + itemsPerSlide
        )
      : videoTestimonials.slice(
          current * itemsPerSlide,
          current * itemsPerSlide + itemsPerSlide
        );

  // Quote icon component
  const QuoteIcon = () => (
    <svg
      className="w-8 h-8 text-red-300"
      fill="currentColor"
      viewBox="0 0 32 32"
    >
      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1 0.9-2 2-2h2V8h-2zM22 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1 0.9-2 2-2h2V8h-2z" />
    </svg>
  );

  // Star icon component
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
      className="py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-gray-900 to-red-900 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://5.imimg.com/data5/SELLER/Default/2025/4/506635522/RT/QB/EE/245044699/upvc-window-manufacturing.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}  
    >
      <div className="absolute inset-0 bg-black/30 "></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
            What Our Clients Say
          </h2>
          <p className="text-lg text-red-300 max-w-3xl mx-auto">
            Trusted by industry leaders worldwide for quality machinery and exceptional service
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-6 py-3 text-sm font-medium rounded-l-lg border ${
                activeTab === "written"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActiveTab("written");
                setCurrent(0);
              }}
            >
              <i className="fas fa-comment-alt mr-2"></i> Written Testimonials
            </button>
            <button
              type="button"
              className={`px-6 py-3 text-sm font-medium rounded-r-lg border ${
                activeTab === "video"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActiveTab("video");
                setCurrent(0);
              }}
            >
              <i className="fas fa-video mr-2"></i> Video Testimonials
            </button>
          </div>
        </div>

        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Testimonial Cards */}
          <div
            className={`grid gap-6 sm:gap-8 ${
              itemsPerSlide === 1
                ? "grid-cols-1"
                : itemsPerSlide === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {activeTab === "written"
              ? currentItems.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 sm:p-8 h-full transition-all duration-300 hover:-translate-y-1 border border-red-100 group"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-4 sm:mb-6">
                        <QuoteIcon />
                      </div>

                      <p className="text-gray-700 text-sm sm:text-base mb-6 sm:mb-8 flex-grow leading-relaxed">
                        {testimonial.content}
                      </p>

                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-red-200 object-cover group-hover:border-red-300 transition-colors duration-300"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-sm sm:text-lg text-gray-800 truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-red-600 text-xs sm:text-sm mb-1 truncate">
                            {testimonial.role}
                          </p>
                          <p className="text-gray-500 text-xs sm:text-sm mb-2 truncate">
                            {testimonial.company}
                          </p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                filled={i < testimonial.rating}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : currentItems.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl p-1 h-full transition-all duration-300 hover:-translate-y-1 border border-red-700 group overflow-hidden"
                  >
                    <div className="flex flex-col h-full">
                      <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                        <iframe
                          src={testimonial.video}
                          className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={testimonial.name}
                        ></iframe>
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center mb-4">
                          <div className="flex-shrink-0 mr-4">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full border-2 border-red-500 object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-lg text-white truncate">
                              {testimonial.name}
                            </h4>
                            <p className="text-red-400 text-sm mb-1 truncate">
                              {testimonial.role}
                            </p>
                            <p className="text-gray-400 text-sm truncate">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <a
                            href="#"
                            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
                          >
                            <i className="fab fa-youtube mr-2"></i>
                            Watch Full Video
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {/* Statistics Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-red-600">500+</div>
              <div className="text-gray-700 mt-2">Machines Sold</div>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-red-600">98%</div>
              <div className="text-gray-700 mt-2">Customer Satisfaction</div>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-red-600">15+</div>
              <div className="text-gray-700 mt-2">Years Experience</div>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-red-600">24/7</div>
              <div className="text-gray-700 mt-2">Support Available</div>
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile */}
          {activeTab === "written" && (
            <>
              <button
                onClick={prevSlide}
                className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white hover:bg-red-50 text-red-600 p-2 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-red-200"
                aria-label="Previous testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white hover:bg-red-50 text-red-600 p-2 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-red-200"
                aria-label="Next testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Mobile Navigation Buttons */}
          <div className="flex sm:hidden justify-center mt-6 space-x-4">
            <button
              onClick={prevSlide}
              className="bg-white hover:bg-red-50 text-red-600 p-3 rounded-full shadow-lg transition-all duration-300 border border-red-200"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="bg-white hover:bg-red-50 text-red-600 p-3 rounded-full shadow-lg transition-all duration-300 border border-red-200"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Indicators */}
          {activeTab === "written" && (
            <div className="flex justify-center mt-8 sm:mt-12 space-x-2">
              {[...Array(length)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current ? "bg-red-400 w-8" : "bg-red-200 w-2"
                  }`}
                  aria-label={`Go to testimonial set ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;