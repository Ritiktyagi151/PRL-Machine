import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Users } from "lucide-react";

const ValuedClients = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const clients = [
    {
      id: 1,
      name: "TechCorp",
      logo: "TC",
      color: "from-violet-600 to-violet-700",
    },
    {
      id: 2,
      name: "GlobalDyne",
      logo: "GD",
      color: "from-red-600 to-red-700",
    },
    {
      id: 3,
      name: "Creative Co",
      logo: "CC",
      color: "from-violet-500 to-violet-600",
    },
    {
      id: 4,
      name: "FutureTech",
      logo: "FT",
      color: "from-red-500 to-red-600",
    },
    {
      id: 5,
      name: "HealthPlus",
      logo: "HP",
      color: "from-violet-700 to-violet-800",
    },
    {
      id: 6,
      name: "EduPro",
      logo: "EP",
      color: "from-red-700 to-red-800",
    },
    {
      id: 7,
      name: "FinanceX",
      logo: "FX",
      color: "from-violet-400 to-violet-500",
    },
    {
      id: 8,
      name: "StartupLab",
      logo: "SL",
      color: "from-red-400 to-red-500",
    },
    {
      id: 9,
      name: "MediaFlow",
      logo: "MF",
      color: "from-violet-800 to-violet-900",
    },
    {
      id: 10,
      name: "RetailMax",
      logo: "RM",
      color: "from-red-800 to-red-900",
    },
    {
      id: 11,
      name: "CloudSync",
      logo: "CS",
      color: "from-violet-300 to-violet-400",
    },
    {
      id: 12,
      name: "DataVault",
      logo: "DV",
      color: "from-red-300 to-red-400",
    },
  ];

  const clientsPerSlide = 8;
  const totalSlides = Math.ceil(clients.length / clientsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, currentSlide]);

  const getVisibleClients = () => {
    const startIndex = currentSlide * clientsPerSlide;
    return clients.slice(startIndex, startIndex + clientsPerSlide);
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 via-white to-violet-50 py-16 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100 rounded-full opacity-20 translate-x-48 -translate-y-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-100 rounded-full opacity-20 -translate-x-40 translate-y-40 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Left Side - Our Clients Text */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium animate-bounce">
              <Users className="w-4 h-4" />
              <span>Trusted Partnership</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Our <span className="bg-gradient-to-r from-violet-600 to-red-600 bg-clip-text text-transparent">Valued Clients</span>
              </h1>

              <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
                We're proud to collaborate with industry leaders who trust our innovative solutions to drive their success forward.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-violet-100">
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-red-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {clients.length}+
                </div>
                <div className="text-gray-600 font-medium">Happy Clients</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-violet-100">
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-red-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  98%
                </div>
                <div className="text-gray-600 font-medium">
                  Satisfaction Rate
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-red-500 fill-violet-600"
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                5.0 Average Rating
              </span>
            </div>
          </div>

          {/* Right Side - Client Logos */}
          <div
            className="relative animate-fade-in-right"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-violet-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group border border-violet-200"
            >
              <ChevronLeft className="w-5 h-5 text-violet-600 group-hover:text-red-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-violet-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group border border-violet-200"
            >
              <ChevronRight className="w-5 h-5 text-violet-600 group-hover:text-red-600" />
            </button>

            {/* Client Logo Grid */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-violet-100">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-red-50/50 opacity-30"></div>

              <div className="relative z-10">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {getVisibleClients().map((client, index) => (
                    <div
                      key={client.id}
                      className="aspect-square bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer animate-scale-in border border-violet-100"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${client.color} rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        {client.logo}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Company Names */}
                <div className="grid grid-cols-4 gap-4 text-center">
                  {getVisibleClients().map((client, index) => (
                    <div
                      key={`name-${client.id}`}
                      className="text-xs font-medium text-gray-600 truncate animate-fade-in-up"
                      style={{ animationDelay: `${index * 100 + 200}ms` }}
                    >
                      {client.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? "bg-gradient-to-r from-violet-600 to-red-600 w-6"
                      : "bg-violet-200 hover:bg-violet-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }
      `}</style>
    </div>
  );
};

export default ValuedClients;