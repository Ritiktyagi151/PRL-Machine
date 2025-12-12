import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UPVC_API_URL = `${import.meta.env.VITE_API_BASE_URL}/upvcmachines`;
const ALUMINUM_API_URL = `${
  import.meta.env.VITE_API_BASE_URL
}/aluminum-machines`;

// --- New Component: Enquiry Modal ---
const EnquiryModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        message: `I am interested in the ${product.title}. Please send me more details.`,
      }));
    }
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // --- UPDATED: FormSubmit.co Integration ---
      await axios.post(
        "https://formsubmit.co/ajax/r.k.parida015@gmail.com",
        {
          // Form Data
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          product_interest: product?.title || "General Enquiry", // Helper field for you

          // FormSubmit Configuration
          _subject: `New Machine Enquiry: ${product?.title}`,
          _template: "table", // Makes the email look clean
          _captcha: "false", // Optional: Turn off captcha for smoother UX
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Form Submitted Successfully");
      setSubmitSuccess(true);

      // Close modal after showing success message briefly
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        setFormData({ name: "", phone: "", email: "", message: "" });
      }, 2000);
    } catch (error) {
      console.error("Submission error", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative overflow-hidden animate-fadeUp">
        {/* Modal Header */}
        <div className="bg-red-600 p-4 flex justify-between items-center text-white">
          <h3 className="text-lg font-bold">Product Enquiry</h3>
          <button
            onClick={onClose}
            className="hover:text-gray-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h4 className="text-xl font-semibold text-gray-800">
                Enquiry Sent!
              </h4>
              <p className="text-gray-600 mt-2">We will contact you shortly.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                Enquiring about:{" "}
                <span className="font-semibold text-red-600">
                  {product?.title}
                </span>
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* HoneyPot spam protection (optional hidden field) */}
                <input type="text" name="_honey" style={{ display: "none" }} />

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-red-500 outline-none transition-all"
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-red-500 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-red-500 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-red-500 outline-none transition-all"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ${
                    isSubmitting
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Child Component: Product Card ---
// Now accepts 'onEnquire' prop
const ProductCard = ({ product, onEnquire }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timeoutRef = useRef(null);

  const images =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images
      : ["https://cdn.globalso.com/cgmachina/default-machine.jpg"];

  const hasMultipleImages = images.length > 1;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (hasMultipleImages) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length),
        3000
      );

      return () => {
        resetTimeout();
      };
    }
  }, [currentImageIndex, hasMultipleImages, images.length]);

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col"
      onMouseEnter={resetTimeout}
      onMouseLeave={() => {
        if (hasMultipleImages) {
          timeoutRef.current = setTimeout(
            () =>
              setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % images.length
              ),
            3000
          );
        }
      }}
    >
      <figure className="relative flex flex-col flex-grow">
        <div className="relative overflow-hidden h-48">
          <Link to={product.link}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title || "Product Image"} ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
          </Link>

          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        <figcaption className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg mb-2">
            <Link
              to={product.link}
              className="text-gray-800 hover:text-red-600 transition-colors"
            >
              {product.title || "Unnamed Product"}
            </Link>
          </h3>
          <span className="text-sm text-gray-500 mb-4">{product.category}</span>

          <div className="mt-auto">
            {/* UPDATED: Button now opens modal instead of Link */}
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent Link navigation if wrapped
                onEnquire(product);
              }}
              className="w-full bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Enquire Now
            </button>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

// --- Main Parent Component ---
const ProductShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch uPVC products
        let upvcItems = [];
        try {
          const upvcResponse = await axios.get(UPVC_API_URL);
          upvcItems = upvcResponse.data.map((product) => ({
            title: product.name,
            images: product.images,
            link: `/productdetailupvc/${product._id}`,
            category: getCategoryFromName(product.name, "uPVC"),
            type: "upvc",
          }));
        } catch (upvcError) {
          console.error("uPVC API Error:", upvcError);
        }

        // Fetch Aluminum products
        let aluminumItems = [];
        try {
          const aluminumResponse = await axios.get(ALUMINUM_API_URL);
          aluminumItems = aluminumResponse.data.map((product) => ({
            title: product.name,
            images: product.images,
            link: `productdetailaluminium/${product.id || product._id}`,
            category: getCategoryFromName(product.name, "Aluminum"),
            type: "aluminum",
          }));
        } catch (aluminumError) {
          console.error("Aluminum API Error:", aluminumError);
        }

        if (upvcItems.length === 0 && aluminumItems.length === 0) {
          throw new Error(
            "Failed to load any products. Please check the API connections."
          );
        }

        setProducts([...upvcItems, ...aluminumItems]);
      } catch (err) {
        console.error("❌ Error loading products:", err);
        setError(
          err.message || "Failed to load products. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryFromName = (name, material) => {
    if (!name) return `${material} Machine`;
    name = name.toLowerCase();
    if (name.includes("welding")) return `${material} Welding Machine`;
    if (name.includes("cutting")) return `${material} Cutting Machine`;
    if (name.includes("cleaning")) return `${material} Cleaning Machine`;
    if (name.includes("router") || name.includes("lock hole"))
      return `${material} Copy Router & Lock Hole Machine`;
    if (name.includes("mullion")) return `${material} Mullion Machine`;
    if (name.includes("punch") || name.includes("crimping"))
      return `${material} Punching & Crimping Machine`;
    return `${material} Machine`;
  };

  // Handlers for Modal
  const openEnquiryModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((product) => product.type === activeFilter);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-12 hidden md:block bg-gray-50 bg-center bg-repeat relative"
      style={{
        backgroundImage:
          'url("/assets/bg-img/bg-theme/IMG-20250725-WA0204.jpg")',
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header & Description aligned Left (ml-14) */}
        <div className="mb-8 ml-14 text-start">
          <h2 className="text-3xl font-bold text-gray-800 hover:text-red-600 transition-colors duration-300 inline-flex items-center">
            OUR PRODUCTS
            <span className="mx-3 h-0.5 w-12 bg-red-600"></span>
            <span className="text-gray-500 text-xl italic font-normal">
              best for you
            </span>
          </h2>
          <div className="mt-4 max-w-3xl animate-fadeUp text-lg font-medium text-gray-600">
            High-precision uPVC and aluminum window machinery engineered for
            durable performance, advanced automation, and consistent production
            quality.
          </div>
        </div>

        {/* Filters Centered */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeFilter === "all"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveFilter("upvc")}
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === "upvc"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              uPVC Window Machines
            </button>
            <button
              onClick={() => setActiveFilter("aluminum")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeFilter === "aluminum"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Aluminum Window Machines
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 mx-11 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No products found for the selected category.
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <ProductCard
                key={`${product.type}-${product.link}-${index}`}
                product={product}
                onEnquire={openEnquiryModal} // Pass the handler
              />
            ))
          )}
        </div>
      </div>

      {/* Render the Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={closeEnquiryModal}
        product={selectedProduct}
      />
    </section>
  );
};

export default ProductShowcase;
