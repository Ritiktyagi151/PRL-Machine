import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Desktop Data ---
const SLIDE_DATA_DESKTOP = [
  { id: 1, type: "video", src: "/assets/vedios/prllogovideo.mp4" },
  { id: 2, type: "video", src: "/assets/vedios/parida-red-lion-video.mp4" },
  { id: 3, type: "image", src: "/assets/banners/prlhomepagebanner.jpg" },
  { id: 4, type: "image", src: "/assets/banners/slider/homepagebanner2.jpg" },
  { id: 5, type: "image", src: "/assets/banners/PARIDA2.jpg" },
];

// --- Mobile Data ---
const SLIDE_DATA_MOBILE = [
  { id: 1, type: "video", src: "/assets/vedios/prllogovideo.mp4" },
  { id: 2, type: "video", src: "/assets/vedios/parida-red-lion-video.mp4" },
  {
    id: 3,
    type: "image",
    src: "/assets/banners/mobile-view-banners/mobile-view-bannerprl.jpg",
  },
  {
    id: 4,
    type: "image",
    src: "/assets/banners/mobile-view-banners/mobile-view-bannerprl2.jpg",
  },
  {
    id: 5,
    type: "image",
    src: "/assets/banners/mobile-view-banners/mobile-view-bannerprl3.jpg",
  },
];

const Landingpage = () => {
  return (
    <div className="mt-10 bg-gray-900 text-white">
      {/* --- MOBILE VIEW SECTION --- */}
      <div className="md:hidden block">
        <MobileBanner slides={SLIDE_DATA_MOBILE} />
      </div>

      {/* --- DESKTOP VIEW SECTION --- */}
      <div className="hidden md:block">
        <DesktopBanner slides={SLIDE_DATA_DESKTOP} />
      </div>
    </div>
  );
};

// ==============================================================
// 1. MOBILE BANNER COMPONENT (Edit Height/Width here)
// ==============================================================
const MobileBanner = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const videoRefs = useRef([]);
  const timeoutRef = useRef(null);

  // --- Mobile Height Configuration ---
  // आप यहाँ अपनी height set कर सकते हैं (जैसे: h-[400px], h-[50vh], h-auto aspect-[9/16])
  const MOBILE_HEIGHT_CLASS = "h-[300px]";
  const MOBILE_WIDTH_CLASS = "w-full";

  // --- Logic ---
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-slide Logic
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });

    const currentSlide = slides[currentIndex];

    if (currentSlide.type === "video") {
      const video = videoRefs.current[currentIndex];
      if (video) {
        video.currentTime = 0;
        video.play().catch((e) => console.log("Autoplay prevented:", e));
        // Add ended listener (multiple once listeners are harmless if switched early)
        video.addEventListener("ended", nextSlide, { once: true });
      }
    } else {
      // For images, set 3-second timeout
      timeoutRef.current = setTimeout(nextSlide, 3000);
    }

    // Cleanup on unmount or index change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [currentIndex, slides]);

  // Swipe Logic
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <div
      className={`relative ${MOBILE_WIDTH_CLASS} ${MOBILE_HEIGHT_CLASS} overflow-hidden bg-black group`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="w-full h-full flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full h-full relative">
            {slide.type === "video" ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={slide.src}
                className="w-full h-full object-fill" // object-cover for full fill, object-contain to show full video
                muted
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={slide.src}
                alt="Mobile Banner"
                className="w-full h-full object-fill select-none" // Change to object-cover if needed
                draggable="false"
              />
            )}
            {/* Optional Overlay */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
      </div>

      {/* Mobile Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 h-2 rounded-full ${
              currentIndex === idx ? "w-6 bg-red-600" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ==============================================================
// 2. DESKTOP BANNER COMPONENT
// ==============================================================
const DesktopBanner = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-slide Logic
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });

    const currentSlide = slides[currentIndex];

    if (currentSlide.type === "video") {
      const video = videoRefs.current[currentIndex];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
        // Add ended listener (multiple once listeners are harmless if switched early)
        video.addEventListener("ended", nextSlide, { once: true });
      }
    } else {
      // For images, set 3-second timeout
      timeoutRef.current = setTimeout(nextSlide, 3000);
    }

    // Cleanup on unmount or index change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [currentIndex, slides]);

  return (
    <div className="relative w-full h-[575px] group overflow-hidden bg-black">
      <div
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full h-full relative">
            {slide.type === "video" ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={slide.src}
                className="w-full h-full object-cover"
                muted
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={slide.src}
                alt="Desktop Banner"
                className="w-full h-full object-fill select-none"
                draggable="false"
              />
            )}
            <div className="absolute inset-0 bg-black/5" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={32} />
      </button>

      {/* Desktop Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`cursor-pointer transition-all duration-300 h-3 rounded-full ${
              currentIndex === idx
                ? "w-10 bg-red-600"
                : "w-3 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Landingpage;
