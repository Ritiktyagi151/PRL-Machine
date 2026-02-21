import React, { useState } from "react";

const CatalogDownload = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    try {
      // 1. Define the API Request
      const apiCall = fetch("https://formsubmit.co/ajax/prlinquiry@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          interest: formData.interest,
          _subject: "New Catalog Download Request",
          _template: "table",
        }),
      });

      // 2. Define the 3-second Delay
      const delay = new Promise((resolve) => setTimeout(resolve, 3000));

      // 3. Wait for BOTH the API call and the 3-second timer to finish
      const [response] = await Promise.all([apiCall, delay]);

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  const handleDownload = () => {
    const pdfUrl = "/assets/pdf/cataloge-of-parida.pdf"; // Replace with your actual PDF path
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Window-Machinery-Catalog.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    if (!formSubmitted) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
      });
    }
  };

  return (
    <div className="relative bg-gray-50">
      {/* Fixed Catalog Button on the bottom-left */}
      <button
        className="fixed right-5 md:right-0 top-[25rem] md:top-52 
  bg-gradient-to-r from-[#EB1C24] to-[#B01018] 
  text-white rotate-90 translate-x-20
  rounded-full shadow-xl 
  hover:scale-110 hover:shadow-2xl transition-all duration-300 
  z-[1000] flex items-center gap-2 px-4 py-2"
        onClick={() => setShowForm(true)}
      >
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="md:h-5 md:w-5 h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>

        {/* Normal Horizontal Text */}
        <span className="tracking-wide font-semibold text-[10px] md:text-base">
          Download Catalog
        </span>
      </button>

      {/* Form Modal */}
      {showForm && !formSubmitted && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden animate-scaleIn my-8">
            {/* Close */}
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 z-50 bg-white rounded-full p-1 shadow-md"
            >
              ✕
            </button>

            <div className="p-6">
              <div className="bg-[#271E5A] text-white p-4 rounded-t-lg -m-6 mb-6">
                <h2 className="text-2xl font-bold">
                  Request Our Machinery Catalog
                </h2>
                <p className="text-blue-100 opacity-90">
                  Get detailed information about our UPVC and Aluminum Window
                  Machines
                </p>
              </div>

              <form
                onSubmit={handleFormSubmit}
                className="grid grid-cols-1 gap-4 mt-6"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Full Name *"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#271E5A]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Email Address *"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#271E5A]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Phone Number *"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#271E5A]"
                />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  placeholder="Company Name *"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#271E5A]"
                />
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleFormChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#271E5A]"
                >
                  <option value="">I'm interested in *</option>
                  <option value="upvc-welder">UPVC Welders</option>
                  <option value="corner-cleaner">Corner Cleaners</option>
                  <option value="aluminum-cutter">Aluminum Cutters</option>
                  <option value="cnc-machines">CNC Machines</option>
                  <option value="all">All Machinery</option>
                </select>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white font-medium py-3 px-4 rounded-md transition-all duration-300 transform shadow-lg ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#EB1C24] hover:bg-[#D11A22] hover:scale-105"
                  }`}
                >
                  {isSubmitting ? "Processing..." : "Submit & Download Catalog"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Thank You / Download Modal */}
      {formSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center relative animate-scaleIn">
            <button
              onClick={() => setFormSubmitted(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md"
            >
              ✕
            </button>

            <div className="mb-5">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                ✅
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-2">
                Your information has been submitted successfully.
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-[#271E5A] hover:bg-[#1E1648] text-white font-medium py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Download Catalog Now
            </button>

            <p className="text-xs text-gray-500 mt-4">
              The catalog contains detailed specifications of our UPVC and
              Aluminum window machinery.
            </p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CatalogDownload;
