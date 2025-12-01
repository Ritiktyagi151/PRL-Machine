import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VideoHeroWithSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideInterval = useRef(null);

  const slides = [
    {
      type: "video",
      videoUrl: "/assets/vedios/prllogovideo.mp4",
    },
    {
      type: "video",
      videoUrl: "/assets/vedios/parida-red-lion-video.mp4",
      title: "PARIDA RED LION INDIA PVT LTD (PRL)",
      subtitle:
        "A leading manufacturer of uPVC & Aluminium window making machines delivering innovation and quality since 2017.",
      cta: "Discover More",
    },
    {
      type: "video",
      videoUrl: "/assets/vedios/HomePageVideo.mp4",
      title: "Building the Future of Fabrication",
      subtitle:
        "Empowering window and door manufacturers with precision-engineered, cost-effective, and reliable machinery.",
      cta: "Learn More",
    },
    {
      type: "image",
      imageUrl: "/assets/banners/parida-homepage.jpg",
    },
    {
      type: "image",
      imageUrl: "/assets/banners/PARIDA2.jpg",
    },
    {
      type: "image",
      imageUrl: "/assets/banners/prlhomepagebanner.jpg",
    },
    {
      type: "image",
      imageUrl: "/assets/banners/slider/homepagebanner2.jpg",
     
    },
  ];

  useEffect(() => {
    startSlider();
    return () => {
      stopSlider();
    };
  }, [currentIndex, isHovered]);

  const startSlider = () => {
    stopSlider();
    if (!isHovered) {
      slideInterval.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  };

  const stopSlider = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div
      // UPDATED: Height is now 580px, top-10 is preserved
      className="relative top-10 w-full h-[615px] overflow-hidden group bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wrapper for Slides */}
      <div
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            {/* Media Rendering */}
            <div className="w-full h-full relative">
              <div className="absolute inset-0  z-10" />

              {slide.type === "video" ? (
                <video
                  src={slide.videoUrl}
                  // UPDATED: object-cover prevents distortion
                  className="w-full h-full object-fill"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={slide.imageUrl}
                  alt={slide.title || "Slider Image"}
                  // UPDATED: object-cover prevents distortion
                  className="w-full h-full object-fill"
                />
              )}
            </div>

            {/* Text Overlay */}
            {(slide.title || slide.subtitle) && (
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-4 md:px-20">
                {slide.title && (
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-fadeInUp">
                    {slide.title}
                  </h1>
                )}
                {slide.subtitle && (
                  <p className="text-lg md:text-xl mb-8 max-w-3xl drop-shadow-md">
                    {slide.subtitle}
                  </p>
                )}
                {slide.cta && (
                  <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md transition duration-300 shadow-lg transform hover:scale-105">
                    {slide.cta}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-red-600 transition z-30"
      >
        <ChevronLeft size={30} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-red-600 transition z-30"
      >
        <ChevronRight size={30} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 cursor-pointer rounded-full ${
              currentIndex === index
                ? "bg-red-600 w-8"
                : "bg-white/50 w-3 hover:bg-white"
            } h-3`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default VideoHeroWithSlider;
