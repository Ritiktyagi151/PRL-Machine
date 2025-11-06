import React, { useState } from "react";
import { Link } from "react-router-dom";

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-4 border border-purple-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        onClick={onClick}
        className="w-full text-left p-4 bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold flex justify-between items-center transition-colors duration-200"
      >
        {question}
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 text-gray-700 bg-white animate-fade-in">
          {answer}
        </div>
      </div>
    </div>
  );
};

const TurnkeyPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const cards = [
    {
      title: "PVC / 150-160 Windows / 8 Hours / 6-8 Workers",
      image: "/assets/turnKey-img/pvc150-160.webp",
      link: "/turnkey/pvc-150-160-windows-8-hours-6-8-workers",
    },
    {
      title: "ALUMINIUM / 80 - 100 Windows / 8 Hours / 6-8 Workers",
      image:
        "https://api.ozgencmachine.com/media/images/collections/Image8_K1LbGER.webp",
      link: "/turnkey/aluminium--80--100-windows--8-hours--6-8-workers",
    },
    {
      title: "PVC / 280-300 Windows / 8 Hours / 12-14 Workers",
      image:
        "https://api.ozgencmachine.com/media/images/collections/Image7.webp",
      link: "/turnkey/pvc-280-300-windows-8-hours-12-14-workers",
    },
    {
      title: "ALUMINIUM / 40-60 Windows / 8 Hours / 6-8 Workers",
      image:
        "https://api.ozgencmachine.com/media/images/collections/Image10.webp",
      link: "/turnkey/aluminium-40-60-windows-8-hours-6-8-workers",
    },
    {
      title: "ALUMINIUM / 80-100 Windows / 8 Hours / 6-8 Workers",
      image:
        "https://api.ozgencmachine.com/media/images/collections/Image8.webp",
      link: "/turnkey/aluminium-80-100-windows-8-hours-6-8-workers",
    },
    {
      title: "PVC / 10-15 Windows / 8 Hours / 6-8 Workers",
      image: "https://api.ozgencmachine.com/media/images/collections/6-8.webp",
      link: "/turnkey/pvc-10-15-windows-8-hours-6-8-workers",
    },
    {
      title: "PVC / 40-60 Windows / 8 Hours / 6-8 Workers",
      image: "https://api.ozgencmachine.com/media/images/collections/1.webp",
      link: "/turnkey/pvc-40-60-windows-8-hours-6-8-workers",
    },
    {
      title: "PVC / 60-80 Windows / 8 Hours / 6-8 Workers",
      image:
        "https://api.ozgencmachine.com/media/images/collections/Image2_HbtbAYG.webp",
      link: "/turnkey/pvc-60-80-windows-8-hours-6-8-workers",
    },
    {
      title: "PVC / 80-100 Windows / 8 Hours /8-10 Workers",
      image:
        "https://api.ozgencmachine.com/media/images/collections/Image3.webp",
      link: "/turnkey/pvc-80-100-windows-8-hours-8-10-workers",
    },
    {
      title: "PVC / 80-100 Windows / 8 Hours /6-8 Workers",
      image:
        "https://api.ozgencmachine.com/media/images/collections/Image3_bHJCLkl.webp",
      link: "/turnkey/pvc-80-100-windows-8-hours-6-8-workers",
    },
    {
      title: "PVC / 120-150 Windows / 8 Hours / 8-10 Workers",
      image:
        "https://api.ozgencmachine.com/media/images/collections/Image5.webp",
      link: "/turnkey/pvc-120-150-windows-8-hours-8-10-workers",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat bg-top h-96 flex items-start justify-center pt-20 animate-fade-in"
        style={{
          backgroundImage:
            'url("https://api.ozgencmachine.com/media/image_albums/images/Frame_15_O4VGTuz.webp")',
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            <span>Wide range of</span>
            <br />
            <span>Production Diagrams</span>
          </h1>
        </div>
        {/* Scroll Icon */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            width="38"
            height="54"
            viewBox="0 0 38 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="19" cy="22" r="2.75" stroke="white" strokeWidth="1.5" />
            <rect
              x="9.75"
              y="0.75"
              width="18.5"
              height="30.5"
              rx="9.25"
              stroke="white"
              strokeWidth="1.5"
            />
            {/* Simplified path for arrow - full path omitted for brevity */}
            <path
              d="M3.23434 52.14C3.98434 52.14 4.59434 51.95 5.06434 51.57C5.53434 51.19 5.77434 50.68 5.77434 50.03C5.77434 49.83 5.74434 49.65 5.69434 49.48C5.64434 49.31 5.58434 49.16 5.51434 49.04C5.44434 48.92 5.34434 48.81 5.21434 48.69C5.07434 48.58 4.95434 48.49 4.85434 48.42C4.75434 48.36 4.60434 48.29 4.41434 48.21C4.22434 48.13 4.07434 48.08 3.96434 48.04C3.85434 48 3.69434 47.95 3.48434 47.88C2.96434 47.72 2.60434 47.58 2.42434 47.44C2.24434 47.3 2.15434 47.12 2.15434 46.9C2.15434 46.7 2.23434 46.53 2.39434 46.4C2.55434 46.27 2.78434 46.2 3.07434 46.2C3.68434 46.2 4.13434 46.5 4.41434 47.1L5.57434 46.43C5.33434 45.94 4.99434 45.56 4.56434 45.28C4.13434 45 3.63434 44.86 3.07434 44.86C2.43434 44.86 1.89434 45.05 1.44434 45.43C0.994336 45.81 0.774336 46.31 0.774336 46.94C0.774336 47.26 0.824336 47.54 0.944336 47.78C1.05434 48.02 1.21434 48.22 1.43434 48.38C1.65434 48.54 1.86434 48.66 2.08434 48.75C2.30434 48.85 2.56434 48.94 2.88434 49.03C3.44434 49.19 3.84434 49.34 4.06434 49.48C4.28434 49.62 4.39434 49.81 4.39434 50.05C4.39434 50.27 4.30434 50.44 4.12434 50.58C3.94434 50.72 3.65434 50.79 3.27434 50.79C2.47434 50.79 1.93434 50.44 1.66434 49.72L0.484336 50.41C0.674336 50.95 1.00434 51.37 1.48434 51.68C1.95434 51.99 2.53434 52.14 3.23434 52.14ZM10.1456 52.14C10.7856 52.14 11.3656 52 11.9056 51.7C12.4356 51.4 12.8556 51 13.1556 50.49L11.9656 49.8C11.7956 50.11 11.5456 50.35 11.2256 50.53C10.9056 50.71 10.5456 50.79 10.1456 50.79C9.46559 50.79 8.91559 50.58 8.49559 50.15C8.07559 49.73 7.87559 49.18 7.87559 48.5C7.87559 47.82 8.07559 47.27 8.49559 46.84C8.91559 46.42 9.46559 46.2 10.1456 46.2C10.5456 46.2 10.9056 46.29 11.2256 46.47C11.5456 46.65 11.7856 46.89 11.9656 47.2L13.1556 46.51C12.8556 46.01 12.4356 45.61 11.8956 45.31C11.3556 45.01 10.7756 44.86 10.1456 44.86C9.08559 44.86 8.21559 45.21 7.53559 45.91C6.84559 46.61 6.50559 47.47 6.50559 48.5C6.50559 49.53 6.84559 50.39 7.53559 51.09C8.21559 51.79 9.08559 52.14 10.1456 52.14ZM18.0433 52H19.5333L17.9833 49.36C18.3833 49.18 18.7133 48.9 18.9633 48.53C19.2033 48.16 19.3333 47.76 19.3333 47.32C19.3333 46.68 19.1033 46.14 18.6533 45.68C18.1933 45.23 17.6433 45 17.0033 45H14.2033V52H15.5833V49.57H16.6333L18.0433 52ZM15.5833 46.29H17.0033C17.2633 46.29 17.4833 46.39 17.6733 46.59C17.8533 46.79 17.9533 47.04 17.9533 47.32C17.9533 47.61 17.8533 47.86 17.6733 48.06C17.4833 48.26 17.2633 48.36 17.0033 48.36H15.5833V46.29ZM23.7778 52.14C24.7878 52.14 25.6478 51.79 26.3578 51.09C27.0578 50.39 27.4178 49.52 27.4178 48.5C27.4178 47.48 27.0578 46.62 26.3578 45.92C25.6478 45.22 24.7878 44.86 23.7778 44.86C22.7578 44.86 21.8978 45.22 21.1978 45.92C20.4978 46.62 20.1478 47.48 20.1478 48.5C20.1478 49.52 20.4978 50.39 21.1978 51.09C21.8978 51.79 22.7578 52.14 23.7778 52.14ZM23.7778 50.79C23.1378 50.79 22.5978 50.58 22.1678 50.15C21.7278 49.72 21.5178 49.17 21.5178 48.5C21.5178 47.84 21.7278 47.29 22.1678 46.85C22.5978 46.42 23.1378 46.2 23.7778 46.2C24.4178 46.2 24.9478 46.42 25.3878 46.85C25.8178 47.29 26.0378 47.84 26.0378 48.5C26.0378 49.17 25.8178 49.72 25.3878 50.15C24.9478 50.58 24.4178 50.79 23.7778 50.79ZM29.9677 50.68V45H28.5877V52H32.6377V50.68H29.9677ZM35.0017 50.68V45H33.6217V52H37.6717V50.68H35.0017Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      {/* Breadcrumbs */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto">
          <ul className="flex space-x-2 text-sm text-gray-600">
            <li>
              <a
                href="/"
                className="hover:text-purple-500 transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/turnkey" className="text-purple-500 font-semibold">
                Turnkey
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* Filter and Sort Section */}
      <div className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            {/* Filter */}
            <div className="flex items-center space-x-2">
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600"
              >
                <path
                  d="M1.5 1H10.5M3.5 5L8.5 5M5.5 9H6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <button className="text-gray-700 hover:text-purple-500 transition-colors duration-200 flex items-center space-x-1">
                Filter Cases
              </button>
              {/* Dropdown - using simple select for simplicity */}
              <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ml-4">
                <option>All</option>
                <option>PVC</option>
                <option>Aluminium</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort By</span>
              <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200">
                <option>No sorting</option>
                <option>Capacity A &gt; Z</option>
                <option>Capacity A &lt; Z</option>
                <option>Nr. of workers A &gt; Z</option>
                <option>Nr. of workers A &lt; Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <a href={card.link} className="block">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="p-6">
                  <h5 className="text-lg font-bold text-gray-900 mb-4 leading-tight">
                    {card.title}
                  </h5>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-purple-700 transition-colors duration-200 transform hover:translate-y-[-2px]">
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                    >
                      <path
                        d="M6.9 6.57219C6.9 7.16434 6.4299 7.64438 5.85 7.64438C5.2701 7.64438 4.8 7.16434 4.8 6.57219C4.8 5.98003 5.2701 5.5 5.85 5.5C6.4299 5.5 6.9 5.98003 6.9 6.57219Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 7.64438C10.5799 7.64438 11.05 7.16434 11.05 6.57219C11.05 5.98003 10.5799 5.5 10 5.5C9.4201 5.5 8.95 5.98003 8.95 6.57219C8.95 7.16434 9.4201 7.64438 10 7.64438Z"
                        fill="currentColor"
                      />
                      {/* Simplified eye icon paths - full paths omitted for brevity */}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.24878 1C5.97237 0.999981 4.94353 0.999966 4.13437 1.11105C3.29427 1.22639 2.58692 1.47313 2.02513 2.04679C1.46334 2.62045 1.2217 3.34275 1.10876 4.2006C0.999967 5.02687 0.999982 6.07744 1 7.38082V11.919C0.999994 12.1807 0.999988 12.4081 1.01024 12.5877C1.01983 12.7557 1.04132 12.9895 1.14484 13.2034C1.4557 13.8459 2.18433 14.1541 2.84902 13.9242C3.0704 13.8477 3.24748 13.6979 3.37061 13.586C3.50222 13.4664 3.65963 13.3057 3.84087 13.1206L3.85542 13.1057C4.1847 12.7695 4.29873 12.6558 4.41847 12.5662C4.69049 12.3626 5.00652 12.229 5.33982 12.1765C5.48654 12.1534 5.64591 12.1515 6.11157 12.1515H9.09441C10.2073 12.1515 11.1046 12.1515 11.8179 12.0654C12.5561 11.9763 13.1878 11.7866 13.7204 11.3402C13.8976 11.1917 14.0601 11.0258 14.2055 10.8448C14.6426 10.3009 14.8285 9.6559 14.9157 8.90209C15 8.17373 15 8.2575 15 7.12108V7.03039C15 5.89397 15 4.97774 14.9157 4.24938C14.8285 3.49558 14.6426 2.85053 14.2055 2.30667C14.0601 2.1257 13.8976 1.95977 13.7204 1.81125C13.1878 1.36492 12.5561 1.17517 11.8179 1.08607C11.1046 0.999974 10.2073 0.999986 9.09442 1H7.24878ZM3.01508 3.05766C3.27339 2.79389 3.63606 2.62191 4.32091 2.52789C5.02591 2.4311 5.96028 2.42959 7.3 2.42959H9.05C10.2178 2.42959 11.032 2.43076 11.6535 2.50577C12.2596 2.57892 12.5904 2.71367 12.8322 2.91634C12.9386 3.00545 13.0361 3.10501 13.1233 3.21358C13.3218 3.46053 13.4538 3.79836 13.5254 4.41719C13.5989 5.05181 13.6 5.88329 13.6 7.07574C13.6 8.26818 13.5989 8.09967 13.5254 8.73428C13.4538 9.35312 13.3218 9.69094 13.1233 9.93789C13.0361 10.0465 12.9386 10.146 12.8322 10.2351C12.5904 10.4378 12.2596 10.5726 11.6535 10.6457C11.032 10.7207 10.2178 10.7219 9.05 10.7219L6.05981 10.7219C5.66522 10.7218 5.39244 10.7218 5.1265 10.7636C4.57099 10.8511 4.04428 11.0739 3.59092 11.4131C3.37388 11.5755 3.18103 11.7725 2.90207 12.0575L2.86547 12.0949C2.66547 12.2991 2.53724 12.4296 2.43995 12.518C2.42905 12.5279 2.41927 12.5366 2.41055 12.5442C2.40963 12.5325 2.40872 12.5193 2.40787 12.5045C2.40029 12.3717 2.4 12.1868 2.4 11.898V7.43313C2.4 6.0651 2.40149 5.11098 2.49627 4.39109C2.58835 3.69176 2.75676 3.32143 3.01508 3.05766Z"
                        stroke="currentColor"
                        strokeWidth="0.7"
                      />
                    </svg>
                    <Link to="/turnkeydetailpage">
                      <span>More information</span>
                    </Link>
                  </button>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* Work Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-sm font-bold text-red-600 tracking-widest uppercase animate-slide-in">
            OUR PROCESS
          </h2>
          <p
            className="mt-2 text-4xl font-bold text-gray-800 animate-slide-in"
            style={{ animationDelay: "0.2s" }}
          >
            Work process
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              "Get in touch with a submission",
              "Exploration of the project",
              "Get a detailed plan",
              "Satisfaction on execution",
              "Enjoy the work that was specified",
              "Project is delivered in time",
            ].map((text, i) => (
              <div
                key={i}
                className="flex flex-col items-center animate-fade-in-up group cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-16 h-16 mb-4 bg-purple-100 rounded-full flex items-center justify-center text-2xl text-red-600 group-hover:bg-red-100 group-hover:text-purple-600 transition-all duration-300 transform group-hover:scale-110">
                  {/* Placeholder for icons */}
                  {i + 1}
                </div>
                <h3 className="font-semibold text-gray-700 group-hover:text-purple-600 transition-colors duration-200">
                  {text}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-800">
              Have some questions?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our experts are here to help! Contact us for any inquiries about
              our machines and services.
            </p>
            <button className="mt-6 px-8 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-transform hover:scale-105 duration-300">
              Contact Us
            </button>
          </div>
          <div
            className="animate-fade-in-up space-y-4"
            style={{ animationDelay: "0.2s" }}
          >
            <FaqItem
              question="Organic Makino has 40 years of experience?"
              answer="Yes, with four decades in the industry, Organic Makino stands as a beacon of quality and reliability in processing machinery."
              isOpen={openFaq === 0}
              onClick={() => toggleFaq(0)}
            />
            <FaqItem
              question="Is it possible to visit the facility?"
              answer="Absolutely. We encourage prospective clients to visit our state-of-the-art facility to witness our manufacturing process firsthand. Please schedule an appointment with our team."
              isOpen={openFaq === 1}
              onClick={() => toggleFaq(1)}
            />
            <FaqItem
              question="Are you constantly improving the product and window machines designs according to the world’s latest requirements?"
              answer="Innovation is at our core. We continuously invest in R&D to enhance our machine designs, ensuring they meet and exceed the latest global standards and technological advancements."
              isOpen={openFaq === 2}
              onClick={() => toggleFaq(2)}
            />
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <p className="text-red-400 font-semibold">CONTACT US</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">
              Let's make great things together
            </h2>
          </div>
          <form
            className="space-y-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent border-b border-gray-600 focus:border-purple-400 focus:outline-none py-2 transition-colors duration-200"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="bg-transparent border-b border-gray-600 focus:border-purple-400 focus:outline-none py-2 transition-colors duration-200"
              />
            </div>
            <input
              type="email"
              placeholder="E-mail"
              className="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 focus:outline-none py-2 transition-colors duration-200"
            />
            <textarea
              placeholder="Enter your message"
              rows="3"
              className="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 focus:outline-none py-2 transition-colors duration-200"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors duration-200 transform hover:translate-y-[-2px]"
            >
              CONTACT US
            </button>
          </form>
        </div>
      </section>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TurnkeyPage;
