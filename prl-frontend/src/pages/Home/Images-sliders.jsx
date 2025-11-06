import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const ShowcaseSlider = () => {
  // Horizontal slider data (70vw)
  const horizontalSlider = [
    {
      id: 1,
      title: "MAIN COLLECTION",
      subtitle: "Featured Products",
      bgImage: "/assets/banners/slider/banner-parida.jpg",
    },
    {
      id: 2,
      title: "SPECIAL OFFERS",
      subtitle: "Limited Time Deals",
      bgImage: "/assets/banners/slider/banner-parida2.jpg",
    },
    {
      id: 3,
      title: "NEW ARRIVALS",
      subtitle: "Fresh Styles",
      bgImage: "/assets/banners/slider/post-banner.jpg",
    },
  ];

  // Vertical slider data (30vw)
  const verticalSlider = [
    {
      id: 1,
      title: "TRENDING",
      subtitle: "Hot Items",
      bgImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "BEST SELLERS",
      subtitle: "Customer Favorites",
      bgImage:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "CLEARANCE",
      subtitle: "Last Chance",
      bgImage:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="w-full py-4 md:py-9 px-4">
      {/* Enhanced Heading Section */}
      <motion.div
        className="text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-block relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Advanced Technology
          </h1>
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 bg-black"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full "></div>
        </div>
        <motion.p
          className="text-base md:text-lg lg:text-xl text-gray-900 mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Cutting-edge solutions for modern manufacturing challenges
        </motion.p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Horizontal Slider (full width on mobile, 70vw on desktop) */}
        <div className="h-[30vh] sm:h-[35vh] md:h-[40vh] w-full lg:w-[70%]">
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[EffectFade, Autoplay]}
            className="h-full w-full"
          >
            {horizontalSlider.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className="h-full w-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative rounded-lg"
                  style={{ backgroundImage: `url(${slide.bgImage})` }}
                >
                  <div className="absolute inset-0 rounded-lg"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Vertical Slider (full width on mobile, 30vw on desktop) - hidden on small screens if needed */}
        <div className="h-[30vh] sm:h-[35vh] md:h-[40vh] w-full lg:w-[30%] hidden sm:block">
          <Swiper
            direction={"vertical"}
            spaceBetween={30}
            effect={"fade"}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[EffectFade, Autoplay]}
            className="h-full w-full"
          >
            {verticalSlider.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className="h-full w-full bg-cover bg-center flex items-center justify-center relative rounded-lg"
                  style={{ backgroundImage: `url(${slide.bgImage})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
                  <div className="relative z-10 text-center text-white px-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                      {slide.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSlider;