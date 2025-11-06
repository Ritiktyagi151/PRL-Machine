import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TurnkeyDetailPage = () => {
  const pageData = {
    workProcess: [
      { id: 1, number: "01", title: "Contact us", desc: "It starts with a conversation", link: "/contact" },
      { id: 2, number: "02", title: "Consultation", desc: "Understanding the details of the project", link: "#" },
      { id: 3, number: "03", title: "SoW", desc: "We finalize the scope of the project", link: "#" },
      { id: 4, number: "04", title: "Quote", desc: "We provide you an accurate quote", link: "#" },
      { id: 5, number: "05", title: "Project", desc: "We start the work that we've agreed to", link: "#" },
      { id: 6, number: "06", title: "Delivery", desc: "We deliver the project on time", link: "#" },
    ],
    products: [
      { id: 1, name: "Double Head Seamless Welding Machine", model: "PRL Double Head", image: "/assets/products/double-head-welding.webp" },
      { id: 2, name: "PRL Single Head Seamless Welding Machine", model: "PRL Single Head", image: "/assets/products/single-head-welding.webp" },
      { id: 3, name: "Automatic UPVC Window Cutting Machine", model: "PRL Auto Cut", image: "/assets/products/upvc-cutting.webp" },
      { id: 4, name: "Semi Automatic UPVC Window Making Machine", model: "PRL Semi Auto", image: "/assets/products/semi-auto-window.webp" },
      { id: 5, name: "uPVC Drain Slot Machine", model: "PRL Drain Slot", image: "/assets/products/drain-slot.webp" },
      { id: 6, name: "Glazing Bead Machine (uPVC)", model: "PRL Glazing Bead", image: "/assets/products/glazing-bead.webp" },
      { id: 7, name: "PRL CRD 300 Manual Aluminium Copy Router", model: "CRD 300", image: "/assets/products/copy-router.webp" },
      { id: 8, name: "PRL MUC 300 Flat End Milling Machine", model: "MUC 300", image: "/assets/products/flat-end-milling.webp" },
      { id: 9, name: "Pneumatic Top Bottom Hand Tool", model: "PRL Pneumatic Tool", image: "/assets/products/pneumatic-tool.webp" },
      { id: 10, name: "Heavy Duty Aluminum End Milling Machine", model: "PRL Heavy Duty Mill", image: "/assets/products/heavy-duty-milling.webp" },
    ],
    similarTurnkey: [
      { id: 1, name: "PVC / 10-15 Windows / 8 Hours / 6-8 Workers", image: "/assets/collections/small-pvc-setup.webp", link: "/turnkey/pvc-10-15" },
      { id: 2, name: "ALUMINUM / 30-100 Windows / 8 Hours / 6-8 Workers", image: "/assets/collections/aluminum-medium.webp", link: "/turnkey/al-30-100" },
      { id: 3, name: "STEEL / 100-200 Windows / 8 Hours / 6-8 Workers", image: "/assets/collections/steel-high.webp", link: "/turnkey/steel-100-200" },
      { id: 4, name: "ALUMINUM / 40-50 Windows / 8 Hours / 6-8 Workers", image: "/assets/collections/aluminum-40-50.webp", link: "/turnkey/al-40-50" },
    ],
  };
  const title = "PVC / 150-160 Windows / 8 Hours / 6-8 Workers";

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Breadcrumbs */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-4 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">
              Home
            </a>
            <span>/</span>
            <a href="/turnkey" className="hover:text-blue-600">
              Turnkey
            </a>
            <span>/</span>
            <span className="text-gray-900">{title}</span>
          </nav>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          {/* Image Slider */}
          <img
            className="w-full h-96 object-cover mb-8 rounded-lg"
            src="/assets/turnKey-img/prl-pvc150-160.webp"
            alt={title}
          />
          {/* Additional image placeholder */}
          <img
            className="w-full h-64 object-cover mb-8 rounded-lg"
            src="/assets/turnKey-img/prl-pvc150-160-secondary.webp"
            alt="Secondary view"
          />
        </div>
      </div>

      {/* Configuration Section */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <h2 className="text-xl font-semibold mb-2">Turnkey Configuration</h2>
              <p className="text-lg font-bold mb-8">Get offer for all machines</p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none">
                    <path
                      d="M9.38409 1.52199L1.71053 10.4432C1.4317 10.7673 1.66201 11.2692 2.08959 11.2692H6.73684C7.28913 11.2692 7.73684 11.7169 7.73684 12.2692V19.152C7.73684 19.6157 8.31348 19.8296 8.61591 19.478L16.2895 10.5568C16.5683 10.2327 16.338 9.73077 15.9104 9.73077H11.2632C10.7109 9.73077 10.2632 9.28305 10.2632 8.73077V1.84804C10.2632 1.38427 9.68652 1.17039 9.38409 1.52199Z"
                      stroke="#00A8FF"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">70 KW</p>
                  <p className="text-sm text-gray-600">Total Power</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg width="22" height="23" viewBox="0 0 22 23" fill="none">
                    <path
                      d="M11.0014 12.4091C11.0014 12.4091 5.54688 9.96701 5.54688 6.95454C5.54688 3.94208 11.0014 1.5 11.0014 1.5V12.4091Z"
                      stroke="#00A8FF"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="11.0007"
                      cy="11.5"
                      r="2.72727"
                      fill="#E2F5FF"
                      stroke="#00A8FF"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">996.2 lt/min</p>
                  <p className="text-sm text-gray-600">Air Consumption</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <rect
                      x="1"
                      y="1.5"
                      width="18"
                      height="18"
                      rx="4"
                      stroke="#00A8FF"
                      strokeWidth="2"
                    />
                    <path
                      d="M6 14.5L14 6.5M6 14.5H10M6 14.5V10.5M14 6.5H10M14 6.5V10.5"
                      stroke="#00A8FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">6-8 bar</p>
                  <p className="text-sm text-gray-600">Air Pressure</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg width="16" height="19" viewBox="0 0 16 19" fill="none">
                    <path
                      d="M11.5 4.53237C11.5 6.72206 9.933 7.91892 8 7.91892C6.067 7.91892 4.5 6.72206 4.5 4.53237C4.5 2.34267 6.067 1 8 1C9.933 1 11.5 2.34267 11.5 4.53237Z"
                      stroke="#00A8FF"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 15.6808C15 18.7646 11.5 17.8835 8 17.8835C4.5 17.8835 1 18.7646 1 15.6808C1 13.9187 4.13401 11.716 8 11.716C11.866 11.716 15 13.9187 15 15.6808Z"
                      stroke="#00A8FF"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">6-8 workers</p>
                  <p className="text-sm text-gray-600">Nr. of workers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.products.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover cursor-pointer"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                      <button className="p-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6H10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                      <span>1 item</span>
                      <button className="p-1">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M7 1V13M1 7H13"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <h5 className="text-lg font-semibold">{product.name}</h5>
                    <h6 className="text-sm text-gray-600 mb-2">{product.model}</h6>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                      More information
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Similar Products Carousel */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 pl-5">Turnkey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 overflow-hidden">
            {pageData.similarTurnkey.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm">
                <a href={item.link}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h5 className="font-semibold">{item.name}</h5>
                  </div>
                </a>
                <button className="w-full bg-blue-600 text-white py-2 rounded-b-lg">
                  More information
                </button>
              </div>
            ))}
          </div>
          {/* Navigation for carousel */}
          <div className="flex justify-center space-x-4 mt-4">
            <button className="p-2 bg-gray-200 rounded disabled:opacity-50">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 10L5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button className="p-2 bg-gray-200 rounded disabled:opacity-50">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 mb-2">HOW WE CAN HELP</p>
          <h2 className="text-3xl font-bold mb-8">Work process</h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={6}
            breakpoints={{
              320: { slidesPerView: 1.5, spaceBetween: 15 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 6, spaceBetween: 20 },
            }}
          >
            {pageData.workProcess.map((step) => (
              <SwiperSlide key={step.id}>
                <div className="flex flex-col items-center p-4">
                  <span className="text-lg font-bold mb-2 text-gray-400">{step.number}</span>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2 2H18V18H2V2Z" stroke="#00A8FF" strokeWidth="2" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 min-h-[40px]">{step.desc}</p>
                  <a
                    href={step.link}
                    className="text-blue-600 text-sm mt-2 flex items-center space-x-1"
                  >
                    <span>Contact Us</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5 13L11 8L5 3" stroke="#00A8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Quality Management */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Quality Management</h2>
              <p className="text-gray-700 leading-relaxed">
                Offering the best quality and highest affordability for uPVC profile processing machines by Parida Red Lion India Pvt Ltd...
              </p>
            </div>
            <div className="lg:w-1/2">
              <img src="/assets/quality-management-prl.webp" alt="Quality Management" className="w-full h-64 object-cover rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Certified Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">
                CE certified machines with top grade material and components
              </h3>
              <p>
                Window machines manufactured by Parida Red Lion India Pvt Ltd are widely recognized...
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">
                Practical operation designed for all workers without requiring high grade skills
              </h3>
              <p>
                Parida Red Lion India Pvt Ltd made window and door manufacturing equipment...
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">
                Outstanding after-sales service provided to customers all around the world
              </h3>
              <p>
                The special side of the company is that window machinery...
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TurnkeyDetailPage;