// ProductDetailuPVC.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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
import { getCanonicalProductPath } from "../../utils/productRouting";

const UPVC_API_URL = `${import.meta.env.VITE_API_BASE_URL}/upvcmachines`;
// 🔹 Backend URL without /api to access the uploads folder
const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const ProductDetailuPVC = ({ productIdentifier = null }) => {
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const identifier = productIdentifier || idParam;

  const [product, setProduct] = useState(null);
  const [upvcData, setUpvcData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("specifications");
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 🔹 Helper function to handle local server paths vs absolute URLs
  const getFullUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${IMAGE_BASE_URL}${path}`;
  };

  useEffect(() => {
    const fetchUpvcData = async () => {
      try {
        setLoading(true);
        // Direct custom ID string bhejien backend ko
        const response = await fetch(`${UPVC_API_URL}/${identifier}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Data milne par state set karein
        setProduct(data);

        // Related products ke liye full data fetch
        const allRes = await fetch(UPVC_API_URL);
        const allData = await allRes.json();
        setUpvcData(allData);
      } catch (err) {
        console.error("Error fetching uPVC details:", err);
        navigate("/not-found", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (identifier) {
      fetchUpvcData();
    }
  }, [identifier, navigate]);

  useEffect(() => {
    if (!product) return;

    const canonicalPath = getCanonicalProductPath(product);
    if (location.pathname !== canonicalPath) {
      navigate(canonicalPath, { replace: true });
    }
  }, [location.pathname, navigate, product]);

  const nextSlide = () => {
    if (!product || !product.images || product.images.length === 0) return;
    setCurrentSlide((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
    setActiveImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    if (!product || !product.images || product.images.length === 0) return;
    setCurrentSlide((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
    setActiveImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (Number.isNaN(value)) return;
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
    if (!product) return;
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
    if (!product || !product.brochureUrl) return;
    const link = document.createElement("a");
    // 🔹 Logic updated to use server path
    link.href = getFullUrl(product.brochureUrl);
    link.target = "_blank";
    link.download = `${product.name.replace(/\s+/g, "_")}_brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center animate-fade-in";
    toast.textContent = "Brochure download started";
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

  const canonicalPath = getCanonicalProductPath(product);
  const productImage = getFullUrl(product.images?.[0]);
  const productDescription =
    product.description || "Explore technical details of this uPVC window machinery.";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((img) => getFullUrl(img)).filter(Boolean),
    description: productDescription.replace(/<[^>]*>/g, " ").trim(),
    sku: product.code || product.id || product._id,
    brand: {
      "@type": "Brand",
      name: "Parida Red Lion",
    },
    offers: {
      "@type": "Offer",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "USD",
      price: product.price || undefined,
      url: canonicalPath,
    },
  };

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
              onClick={() => navigate("/products/upvc-window-machines")}
              className="hover:text-purple-700 transition-colors"
            >
              uPVC
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
              High Quality uPVC Profile Solutions
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
              {product.images &&
                product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={getFullUrl(img)}
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

            {/* Navigation Arrows */}
            {product.images && product.images.length > 1 && (
              <>
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
              </>
            )}

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {(product.images || []).map((_, index) => (
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

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-3">
            {(product.images || []).map((img, idx) => (
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
                  src={getFullUrl(img)}
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
          {/* Key Features */}
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
                  High-quality uPVC construction
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">
                  <FiCheck className="w-5 h-5" />
                </span>
                <span className="text-gray-700">
                  Durable and weather-resistant
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">
                  <FiCheck className="w-5 h-5" />
                </span>
                <span className="text-gray-700">
                  Energy efficient solutions
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

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto mb-6 scrollbar-hide">
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

          {/* Tab Content */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-100 transition-all duration-300">
            {activeTab === "specifications" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Technical Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications || {}).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="border-b border-gray-100 pb-3 last:border-b-0"
                      >
                        <p className="text-gray-600 text-sm">{key}</p>
                        <p className="font-medium text-gray-900">
                          {typeof value === "object" && value !== null
                            ? JSON.stringify(value)
                                .replace(/[{}"]/g, "")
                                .replace(/:/g, ": ")
                            : String(value)}
                        </p>
                      </div>
                    ),
                  )}
                </div>
                <p className="mt-4 text-gray-600">
                  Our uPVC products are designed for maximum durability and
                  performance, meeting international quality standards for
                  construction and architectural applications.
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
                      getFullUrl(product.technicalDrawing) ||
                      "/images/technical-drawing-placeholder.jpg"
                    }
                    alt={`${product.name} Technical Drawing`}
                    className="w-full h-auto max-h-96 object-contain mx-auto"
                  />
                </div>
              </div>
            )}

            {activeTab === "description" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Description
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                  {product.additionalDescription && (
                    <div
                      className="mt-4"
                      dangerouslySetInnerHTML={{
                        __html: product.additionalDescription,
                      }}
                    />
                  )}
                </div>
              </div>
            )}

            {activeTab === "video" && (
              <div className="animate-fade-in text-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Demonstration Video
                </h2>
                <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden border">
                  {product.videos?.[0] && (
                    <video controls className="w-full h-full">
                      <source
                        src={getFullUrl(product.videos[0])}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  FAQ
                </h2>
                <div className="space-y-4">
                  {product.faq?.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-b border-gray-100 pb-4 last:border-b-0"
                    >
                      <h3 className="font-medium text-gray-900 mb-1">
                        {item.question}
                      </h3>
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "catalog" && (
              <div className="animate-fade-in text-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Product Catalog
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <FiDownload className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-700 mb-6">
                    Download detailed technical drawings and guides.
                  </p>
                  <button
                    onClick={handleDownloadBrochure}
                    className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center mx-auto transition-all transform hover:scale-105"
                  >
                    <FiDownload className="mr-2" /> Download Catalog (PDF)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Inquiry */}
          <div
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl font-bold text-purple-700">
                {product.price
                  ? `$${product.price.toFixed(2)}`
                  : "Price on request"}
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>
            <div className="flex items-center mb-6">
              <span className="text-lg font-semibold mr-4">Quantity:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={handleDecrement}
                  className="p-2 px-4 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center py-2 outline-none border-x"
                />
                <button
                  onClick={handleIncrement}
                  className="p-2 px-4 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-all transform hover:scale-105"
              >
                Make an Enquiry <FiArrowLeft className="ml-2 rotate-180" />
              </button>
              <button
                onClick={handleDownloadBrochure}
                className="w-full border border-purple-700 text-purple-700 hover:bg-purple-50 py-3 rounded-lg font-bold flex items-center justify-center transition-all"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Drawings Views */}
      <div
        className="mt-16 animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Detailed Views
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Front View</h3>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <img
                src={
                  getFullUrl(product.technicalDrawingFront) ||
                  "/images/front-placeholder.jpg"
                }
                alt="Front View"
                className="mx-auto max-h-64 object-contain"
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Side View</h3>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <img
                src={
                  getFullUrl(product.technicalDrawingSide) ||
                  "/images/side-placeholder.jpg"
                }
                alt="Side View"
                className="mx-auto max-h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div
        className="mt-16 animate-fade-in-up"
        style={{ animationDelay: "0.5s" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upvcData
            .filter((p) => p.id !== product.id && p._id !== product._id)
            .slice(0, 3)
            .map((related, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer border border-gray-100"
                onClick={() =>
                  navigate(getCanonicalProductPath(related))
                }
              >
                <div className="h-48 bg-gray-100 overflow-hidden relative">
                  <img
                    src={
                      getFullUrl(related.images?.[0]) ||
                      "https://images.pexels.com/photos/20341733/pexels-photo-20341733/free-photo-of-3d-printer-in-a-factory.jpeg"
                    }
                    alt={related.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {related.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700 font-bold">
                      {related.price
                        ? `$${related.price.toFixed(2)}`
                        : "Price on request"}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        related.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {related.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <OurPartners />
      <ValuedClients />

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

export default ProductDetailuPVC;
