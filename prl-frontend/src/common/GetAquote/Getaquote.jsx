import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { FaTools, FaIndustry, FaSpinner } from "react-icons/fa";

const GetQuoteModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    message: "",
  });

  const products = [
    {
      name: "uPVC Window Machine",
      icon: <FaTools className="text-red-600" />,
      subItems: [
        { name: "uPVC Welding Machine" },
        { name: "uPVC Cutting Machine" },
        { name: "uPVC Cleaning Machine" },
        { name: "uPVC Copy Router & Lock Hole Machine" },
        { name: "uPVC Glazing Bead Cutting Machine" },
        { name: "uPVC Drainage Water Slot Machine" },
        { name: "uPVC Mullion Cutting Machine" },
        { name: "uPVC Interlock punching (IPL-300)" },
        { name: "Hand Tools" },
        { name: "Other Special Machine" },
      ],
    },
    {
      name: "Aluminum Window Machine",
      icon: <FaIndustry className="text-red-600" />,
      subItems: [
        { name: "Aluminum Cutting Machine" },
        { name: "Aluminum Lock Hole Machine" },
        { name: "Aluminum Mullion Machine" },
        { name: "Aluminum Punching & Crimping Machine" },
      ],
    },
  ];

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using /ajax/ ensures the user isn't redirected to a captcha page
      const response = await fetch(
        "https://formsubmit.co/ajax/r.k.parida015@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...quoteForm,
            // Special FormSubmit configurations:
            _subject: `New Quote Request: ${quoteForm.product}`,
            _template: "table", // Sends email data in a clean table
            _captcha: "false", // Optional: disables the captcha requirement
          }),
        }
      );

      if (response.ok) {
        alert("Thank you! Your quote request has been sent successfully.");
        setQuoteForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          product: "",
          message: "",
        });
        onClose();
      } else {
        alert("Something went wrong. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-[5000] backdrop-blur-sm bg-black/40 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-all duration-300 z-10"
        >
          <FiX className="text-xl md:text-2xl" />
        </button>

        <div className="p-5 md:p-8">
          <div className="text-center mb-6 md:mb-8 mt-2 md:mt-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Request a Quote
            </h2>
            <p className="text-sm md:text-base text-gray-600 px-2">
              Fill out the form below and our team will get back to you within
              24 hours.
            </p>
          </div>

          <form onSubmit={handleQuoteSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={quoteForm.name}
                  onChange={handleQuoteChange}
                  required
                  className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={quoteForm.email}
                  onChange={handleQuoteChange}
                  required
                  className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={quoteForm.phone}
                  onChange={handleQuoteChange}
                  required
                  className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={quoteForm.company}
                  onChange={handleQuoteChange}
                  className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="ABC Enterprises"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product of Interest*
                </label>
                <select
                  id="product"
                  name="product"
                  value={quoteForm.product}
                  onChange={handleQuoteChange}
                  required
                  className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white"
                >
                  <option value="">Select a product</option>
                  {products.map((category) => (
                    <optgroup key={category.name} label={category.name}>
                      {category.subItems.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={quoteForm.message}
                  onChange={handleQuoteChange}
                  rows="4"
                  className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="Tell us about your requirements, quantity needed, etc."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center pb-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform ${
                  isSubmitting
                    ? "opacity-75 cursor-not-allowed"
                    : "active:scale-95 md:hover:scale-105"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetQuoteModal;
