import React, { useEffect, useRef } from "react";

// Swiper components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const MachineSlider = () => {
  // Machine images from Unsplash with high quality
  const machineImages = [
    {
      url: "/assets/banners/slider/1.jpg",
      alt: "Industrial Manufacturing Machine",
    },
    {
      url: "/assets/banners/slider/2.jpg",
      alt: "Precision Engineering Equipment",
    },
    {
      url: "/assets/banners/slider/3.jpg",
      alt: "Heavy Industrial Machinery",
    },
  ];

  return (
    <div className="w-full mt-7 h-[85vh] relative overflow-hidden"> 
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={1000}
        className="w-full h-full"
      >
        {machineImages.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="w-full h-full relative">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0"></div>

              {/* Optional content overlay */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {image.alt}
                </h2>
                <p className="text-lg md:text-xl opacity-90 drop-shadow-md max-w-2xl">
                  Experience the power and precision of modern industrial
                  machinery
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev !text-white !w-12 !h-12 !mt-0 !top-1/2 !left-6 !transform !-translate-y-1/2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>

        <div className="swiper-button-next !text-white !w-12 !h-12 !mt-0 !top-1/2 !right-6 !transform !-translate-y-1/2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-8 !left-8 !right-8 !text-left">
          <style jsx global>{`
            .swiper-pagination-bullet {
              width: 12px !important;
              height: 12px !important;
              background: rgba(255, 255, 255, 0.5) !important;
              opacity: 1 !important;
              margin: 0 6px !important;
              transition: all 0.3s ease !important;
            }
            .swiper-pagination-bullet-active {
              background: white !important;
              transform: scale(1.2) !important;
            }
            .swiper-button-prev:after,
            .swiper-button-next:after {
              display: none !important;
            }
          `}</style>
        </div>
      </Swiper>

      {/* Loading indicator for first image */}
      <div className="absolute top-4 right-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        Auto Slide: 4s
      </div>
    </div>
  );
};

export default MachineSlider;
