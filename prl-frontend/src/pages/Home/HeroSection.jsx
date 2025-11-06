import React from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { motion } from "framer-motion";

const HeroSection = () => {
  // Video data
  const heroVideos = [
    {
      id: 1,
      title: "Our Vision",
      subtitle: "Precision Machinery Since 1995",
      description: "Discover our award-winning manufacturing solutions",
      videoUrl: "/assets/vedios/videoupvc.mp4",

      bgColor: "from-navy-800/80 to-navy-900/80",
    },
    {
      id: 2,
      title: "Our Mission",
      subtitle: "Cutting-Edge Technology",
      description: "Automated solutions for modern manufacturing",
      videoUrl: "/assets/vedios/upvc3.mp4",

      bgColor: "from-red-700/20 to-red-800/30",
    },
    {
      id: 3,
      title: "Our Strategic Focus",
      subtitle: "Worldwide Operations",
      description: "Serving industries across 5 continents",
      videoUrl: "/assets/vedios/upvcvideo.mp4",

      bgColor: "from-gray-800/20 to-gray-900/40",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 h-screen max-h-[600px]">
        {heroVideos.map((video) => (
          <div
            key={video.id}
            className="relative group overflow-hidden hover:flex-[1.2] transition-all duration-500"
          >
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${video.bgColor} z-1`}
            ></div>

            {/* Content */}
            <motion.div
              className="relative z-10 h-full flex flex-col justify-end p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: video.id * 0.2 }}
            >
              <div className="transform group-hover:translate-y-0 translate-y-4 transition-all duration-500 delay-100">
                <span className="inline-block mb-2 text-sm font-medium tracking-wider text-red-300">
                  {video.subtitle}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                  {video.title}
                </h2>
                <p className="mb-2 text-gray-200 max-w-xs">
                  {video.description}
                </p>
                {/* <button className="flex items-center px-6 py-3 bg-white text-indigo-700 font-medium rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 group-hover:scale-105">
                  {video.cta}
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </button> */}
              </div>
            </motion.div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 border-8 border-white/20"></div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-black/30 rounded-full backdrop-blur-sm hover:bg-white/20">
                  <FaVolumeMute className="text-white" />
                </button>
                <button className="p-2 bg-black/30 rounded-full backdrop-blur-sm hover:bg-white/20">
                  <FaPause className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce w-8 h-14 rounded-full border-2 border-white flex justify-center p-1">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-red-600 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-navy-800 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-pulse delay-1000"></div>
    </section>
  );
};

export default HeroSection;
