import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const VideoHeroWithSlider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const videoTimeoutRef = useRef(null); // Ref to hold the timeout for the video slide

  // --- Slide Data ---
  // 1 video slide and 4 image banner slides
  const slides = [
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
      // title: "State-of-the-Art Manufacturing",
      // subtitle:
      // "10,000+ sq.ft. facility equipped with advanced technology for superior performance and durability.",
      // cta: "Explore Facility",
    },
    {
      type: "image",
      imageUrl: "/assets/banners/PARIDA2.jpg",
      // title: "Precision & Reliability",
      // subtitle:
      //   "Every PRL machine undergoes 100% quality check to ensure consistent output and long-term reliability.",
      // cta: "View Quality Standards",
    },
    {
      type: "image",
      imageUrl:
        "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Comprehensive Machinery Range",
      subtitle:
        "From cutting and welding to milling and glazing — PRL offers complete window production solutions.",
      cta: "View Product Range",
    },
    {
      type: "image",
      imageUrl:
        "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Innovation & Support",
      subtitle:
        "Driven by R&D, sustainability, and 24/7 customer service to ensure maximum uptime and efficiency.",
      cta: "Contact PRL",
    },
  ];

  // --- Swiper Event Handlers ---

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const handleSlideChange = (swiper) => {
    // Clear any existing custom timer
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
    }

    // Pause video in the previously active slide to reset it
    const previousSlide = swiper.slides[swiper.previousIndex];
    const videoInPrevious = previousSlide.querySelector("video");
    if (videoInPrevious) {
      videoInPrevious.pause();
    }

    const activeSlide = swiper.slides[swiper.activeIndex];
    const videoInActive = activeSlide.querySelector("video");

    if (videoInActive) {
      // If the active slide has a video
      swiper.autoplay.stop(); // Stop the default 5s autoplay
      videoInActive.currentTime = 0; // Rewind video
      videoInActive.play();
      // Set a custom 15-second timer to advance the slide
      videoTimeoutRef.current = setTimeout(() => {
        swiper.slideNext();
      }, 15000);
    } else {
      // For image slides, start the default autoplay
      swiper.autoplay.start();
    }
  };

  const handleSwiperInit = (swiper) => {
    // Check if the initial slide is the video slide and start the logic
    if (swiper.realIndex === 0) {
      handleSlideChange(swiper);
    }
  };

  return (
    <div className="relative w-full h-[90vh] bg-black">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // Default autoplay for image slides
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onSlideChange={handleSlideChange}
        onInit={handleSwiperInit}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Conditional Background: Video or Image */}
              {slide.type === "video" ? (
                <video
                  className="absolute w-full h-full object-cover"
                  muted
                  playsInline
                  src={slide.videoUrl}
                />
              ) : (
                <div
                  className="absolute w-full  object-fill  h-full bg-fill"
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20 z-10" />

              {/* Text Content */}
              <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fadeIn">
                  {slide.subtitle}
                </p>
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition duration-300 animate-fadeIn">
                  {slide.cta}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Autoplay Progress Circle */}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>

      {/* --- Styles --- */}
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.6;
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          background: white;
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          backdrop-filter: blur(5px);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
        .autoplay-progress {
          position: absolute;
          right: 16px;
          bottom: 16px;
          z-index: 10;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
        }
        .autoplay-progress svg {
          --progress: 0;
          position: absolute;
          left: 0;
          top: 0px;
          z-index: 10;
          width: 100%;
          height: 100%;
          stroke-width: 4px;
          stroke: white;
          fill: none;
          stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
          stroke-dasharray: 125.6;
          transform: rotate(-90deg);
        }
      `}</style>
    </div>
  );
};

export default VideoHeroWithSlider;
