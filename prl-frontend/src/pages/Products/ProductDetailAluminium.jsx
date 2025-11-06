// AluminiumDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiDownload,
  FiShoppingCart,
  FiShare2,
  FiHeart,
  FiPlay,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
} from "react-icons/fi";
import OurPartners from "../Home/TrustedSlider";
import ValuedClients from "../Home/Our-Clients";

const API_BASE_URL = "http://localhost:3000/api/aluminum-machines";

const AluminiumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [aluminumData, setAluminumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("specifications");
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchAluminumData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAluminumData(data);
        const matched = data.find((p) => p.id === id);
        if (!matched) {
          navigate("/not-found", { replace: true });
          return;
        }
        setProduct(matched);
      } catch (err) {
        console.error("Error fetching aluminum machines:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAluminumData();
  }, [id, navigate]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
    setActiveImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
    setActiveImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 100) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      const toast = document.createElement("div");
      toast.className =
        "fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity opacity-0";
      toast.textContent = "Link copied to clipboard!";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.add("opacity-100");
      }, 10);
      setTimeout(() => {
        toast.classList.remove("opacity-100");
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 2000);
    }
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement("a");
    link.href = product.brochureUrl || "#";
    link.download = `${product.name.replace(/\s+/g, "_")}_brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center";
    toast.innerHTML = `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Brochure download started`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-300");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-7xl mt-12 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center hover:text-purple-700 transition-colors"
            >
              <FiArrowLeft className="mr-1" /> Back
            </button>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <button
              onClick={() => navigate("/products")}
              className="hover:text-purple-700 transition-colors"
            >
              Products
            </button>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <button
              onClick={() => navigate("/products/aluminumwindowmachines")}
              className="hover:text-purple-700 transition-colors"
            >
              Aluminum
            </button>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* Product Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              High Quality Aluminium Profile Solutions
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isFavorite
                  ? "text-red-500 bg-red-50"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <FiHeart
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-full text-gray-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300 transform hover:scale-110"
              aria-label="Share product"
            >
              <FiShare2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        {product.code && (
          <div className="mt-2 text-sm text-gray-500">
            Product Code: <span className="font-medium">{product.code}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* Image Gallery */}
        <div className="animate-fade-in-up">
          <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg group">
            <div className="relative h-96 w-full">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} - Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full shadow hover:bg-opacity-100 transition-all opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full shadow hover:bg-opacity-100 transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setActiveImage(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white w-6"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImage(idx);
                  setCurrentSlide(idx);
                }}
                className={`rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                  activeImage === idx
                    ? "border-purple-600 scale-105 shadow-md"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-20 object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Key Features
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">
                  <FiCheck className="w-5 h-5" />
                </span>
                <span className="text-gray-700">
                  High-quality aluminium construction
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">
                  <FiCheck className="w-5 h-5" />
                </span>
                <span className="text-gray-700">
                  Corrosion-resistant and lightweight
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">
                  <FiCheck className="w-5 h-5" />
                </span>
                <span className="text-gray-700">
                  Energy-efficient and recyclable
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">
                  <FiCheck className="w-5 h-5" />
                </span>
                <span className="text-gray-700">
                  Customizable designs available
                </span>
              </li>
            </ul>
          </div>

          <div className="flex overflow-x-auto mb-6 scrollbar-hide">
            <button
              onClick={() => setActiveTab("specifications")}
              className={`py-3 px-5 font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === "specifications"
                  ? "text-purple-700 border-b-2 border-purple-700 bg-purple-50 rounded-t-lg"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("diagram")}
              className={`py-3 px-5 font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === "diagram"
                  ? "text-purple-700 border-b-2 border-purple-700 bg-purple-50 rounded-t-lg"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Diagram
            </button>
            <button
              onClick={() => setActiveTab("description")}
              className={`py-3 px-5 font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === "description"
                  ? "text-purple-700 border-b-2 border-purple-700 bg-purple-50 rounded-t-lg"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Description
            </button>
            {product.videos && product.videos.length > 0 && (
              <button
                onClick={() => setActiveTab("video")}
                className={`py-3 px-5 font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === "video"
                    ? "text-purple-700 border-b-2 border-purple-700 bg-purple-50 rounded-t-lg"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Video
              </button>
            )}
            {product.faq && product.faq.length > 0 && (
              <button
                onClick={() => setActiveTab("faq")}
                className={`py-3 px-5 font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === "faq"
                    ? "text-purple-700 border-b-2 border-purple-700 bg-purple-50 rounded-t-lg"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                FAQ
              </button>
            )}
            <button
              onClick={() => setActiveTab("catalog")}
              className={`py-3 px-5 font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === "catalog"
                  ? "text-purple-700 border-b-2 border-purple-700 bg-purple-50 rounded-t-lg"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              PDF Catalog
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-100 transition-all duration-300">
            {activeTab === "specifications" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Technical Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications &&
                  Object.keys(product.specifications).length > 0 ? (
                    Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="border-b border-gray-100 pb-3 last:border-b-0"
                        >
                          <p className="text-gray-600 text-sm">{key}</p>
                          <p className="font-medium text-gray-900">{value}</p>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-gray-600">
                      No specifications available.
                    </p>
                  )}
                </div>
                <p className="mt-4 text-gray-600">
                  Our aluminium products are designed for superior strength,
                  lightweight construction, and corrosion resistance, meeting
                  international standards for architectural applications.
                </p>
              </div>
            )}

            {activeTab === "diagram" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Product Diagram
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <img
                    src={
                      product.technicalDrawing ||
                      "/images/technical-drawing-placeholder.jpg"
                    }
                    alt={`${product.name} Technical Drawing`}
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
              </div>
            )}

            {activeTab === "description" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Description
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{product.description}</p>
                  {product.additionalDescription && (
                    <p className="mt-4 text-gray-700">
                      {product.additionalDescription}
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "video" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Product Video
                </h2>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                  {product.videos && product.videos.length > 0 ? (
                    <video controls className="w-full h-full">
                      <source src={product.videos[0]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiPlay className="w-8 h-8 text-purple-600" />
                      </div>
                      <p className="text-gray-500">
                        No video available for this product
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {product.faq && product.faq.length > 0 ? (
                    product.faq.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-100 pb-4 last:border-b-0"
                      >
                        <h3 className="font-medium text-gray-900 mb-2">
                          {item.question}
                        </h3>
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-8">
                      No FAQs available for this product.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "catalog" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Product Catalog
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
                  <FiDownload className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-700 mb-6">
                    Download our comprehensive product catalog with detailed
                    specifications, technical drawings, and application guides.
                  </p>
                  <button
                    onClick={handleDownloadBrochure}
                    className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center mx-auto transition-colors duration-300 transform hover:scale-105"
                  >
                    <FiDownload className="w-5 h-5 mr-2" />
                    Download Full Catalog (PDF)
                  </button>
                </div>
              </div>
            )}
          </div>

          <div
            className="sticky bottom-6 space-y-3 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="flex justify-between items-center mb-4">
                {product.price ? (
                  <div className="text-2xl font-bold text-purple-700">
                    ${product.price.toFixed(2)}
                  </div>
                ) : (
                  <div className="text-lg font-medium text-gray-600">
                    Price on request
                  </div>
                )}
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                    product.inStock
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Available"}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-lg font-semibold mr-4">Quantity:</span>
                <button
                  onClick={handleDecrement}
                  className="p-2 border rounded-l-lg hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center border-t border-b"
                  min="1"
                  max="100"
                />
                <button
                  onClick={handleIncrement}
                  className="p-2 border rounded-r-lg hover:bg-gray-100"
                  disabled={quantity >= 100}
                >
                  +
                </button>
              </div>
              <div className="space-y-3">
                {/* === MODIFIED BUTTON HERE === */}
                <button
                  onClick={() => navigate("/contact")}
                  className="w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 bg-purple-700 hover:bg-purple-800 text-white transform hover:scale-105"
                >
                  Make an Enquiry
                  <FiArrowLeft className="w-5 h-5 ml-2 transform rotate-180" />
                </button>
                {/* === END MODIFIED BUTTON === */}

                <button
                  onClick={handleDownloadBrochure}
                  className="w-full bg-white border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                >
                  <FiDownload className="w-5 h-5 mr-2" />
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-16 animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Technical Drawings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Front View
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <img
                src={
                  product.technicalDrawingFront ||
                  "/images/technical-drawing-front.jpg"
                }
                alt={`${product.name} Front View`}
                className="w-full h-auto max-h-64 object-contain"
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Side View
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <img
                src={
                  product.technicalDrawingSide ||
                  "/images/technical-drawing-side.jpg"
                }
                alt={`${product.name} Side View`}
                className="w-full h-auto max-h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-16 animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Product Video Demonstration
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            {product.videos && product.videos.length > 0 ? (
              <video
                controls
                className="w-full h-full"
                poster={product.images[0]}
              >
                <source src={product.videos[0]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiPlay className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Video Coming Soon
                  </h3>
                  <p className="text-gray-600">
                    We're preparing a detailed video demonstration for this
                    product.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="mt-16 animate-fade-in-up"
        style={{ animationDelay: "0.5s" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aluminumData
            .filter((p) => p.id !== id)
            .slice(0, 3)
            .map((relatedProduct, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
                onClick={() =>
                  navigate(`/productdetailaluminium/${relatedProduct.id}`)
                }
              >
                <div className="h-48 bg-gray-100 overflow-hidden relative">
                  <img
                    src={
                      relatedProduct.images[0] ||
                      "https://images.pexels.com/photos/20341733/pexels-photo-20341733/free-photo-of-3d-printer-in-a-factory.jpeg?auto=compress&cs=tinysrgb&w=600"
                    }
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                    <FiHeart className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700 font-bold">
                      {relatedProduct.price
                        ? `$${relatedProduct.price.toFixed(2)}`
                        : "Price on request"}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        relatedProduct.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {relatedProduct.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <button className="mt-4 text-purple-700 hover:text-purple-800 font-medium text-sm transition-colors duration-200 flex items-center">
                    View Details
                    <FiChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Have some questions?
          </h2>
          <p className="text-gray-600 mb-6">
            If something is missing or you can't find the answer for your
            question - you can always drop us a letter with all your questions.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-8 rounded-lg font-medium transition-colors duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Contact Us
            <FiArrowLeft className="ml-2 transform rotate-180" />
          </button>
        </div>
      </div>

      <div
        className="mt-16 animate-fade-in-up"
        style={{ animationDelay: "0.7s" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Our Process</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            {
              title: "Contact",
              desc: "It starts with a conversation",
              icon: "📞",
            },
            {
              title: "Consultation",
              desc: "Discuss details of the project",
              icon: "💬",
            },
            { title: "SOW", desc: "Document the detailed plan", icon: "📋" },
            { title: "Quote", desc: "Send you an estimation", icon: "💰" },
            {
              title: "Project",
              desc: "We do the work that was specified",
              icon: "🛠️",
            },
            {
              title: "Delivery",
              desc: "The solution is delivered in time",
              icon: "🚚",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-xl mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                {step.icon}
              </div>
              <h3 className="font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
              <div className="mt-4 text-xs text-purple-700 font-medium">
                Step {index + 1}
              </div>
            </div>
          ))}
        </div>
        <OurPartners />
        <ValuedClients />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AluminiumDetail;