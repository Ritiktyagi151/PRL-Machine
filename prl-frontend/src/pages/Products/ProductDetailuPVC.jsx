// ProductDetailPage.jsx
// Combined detail page for both uPVC and Aluminum products.
// Determines which type to load based on the route:
//   - /productdetailupvc/:id      → uPVC
//   - /productdetailaluminium/:id → Aluminum
// Or pass productType="upvc"|"aluminum" + productIdentifier as props.

import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiDownload,
  FiShare2,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
} from "react-icons/fi";
import OurPartners from "../Home/TrustedSlider";
import ValuedClients from "../Home/Our-Clients";
import { getCanonicalProductPath } from "../../utils/productRouting";

// ─── API config ───────────────────────────────────────────────────────────────

const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");
const UPVC_API_URL = `${import.meta.env.VITE_API_BASE_URL}/upvcmachines`;
const ALUMINUM_API_URL = `${import.meta.env.VITE_API_BASE_URL}/aluminum-machines`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getFullUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE_URL}${path}`;
};

const showToast = (message, color = "bg-gray-800") => {
  const toast = document.createElement("div");
  toast.className = `fixed bottom-4 right-4 ${color} text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity opacity-0`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("opacity-100"), 10);
  setTimeout(() => {
    toast.classList.remove("opacity-100");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2500);
};

// ─── Main component ───────────────────────────────────────────────────────────

const ProductDetailPage = ({
  productIdentifier = null,
  productType = null,
}) => {
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Detect type from route path if not passed as prop
const [isAluminum, setIsAluminum] = useState(false); // ← add this

  const identifier = productIdentifier || idParam;

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("specifications");
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ─── Fetch product ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!identifier) return;

const fetchProduct = async () => {
  try {
    setLoading(true);

    // Try uPVC first
    try {
      const res = await fetch(`${UPVC_API_URL}/${identifier}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
        setIsAluminum(false);
        const allRes = await fetch(UPVC_API_URL);
        setAllProducts(await allRes.json());
        return;
      }
    } catch (_) {}

    // Fallback to Aluminum
    const res = await fetch(ALUMINUM_API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    setAllProducts(data);
    const matched = data.find((p) => p.id === identifier || p._id === identifier);
    if (!matched) {
      navigate("/not-found", { replace: true });
      return;
    }
    setProduct(matched);
    setIsAluminum(true);

  } catch (err) {
    console.error("Error fetching product:", err);
    navigate("/not-found", { replace: true });
  } finally {
    setLoading(false);
  }
};

    fetchProduct();
  }, [identifier, isAluminum, navigate]);

  // ─── Canonical redirect ───────────────────────────────────────────────────

  useEffect(() => {
    if (!product) return;
    const canonicalPath = getCanonicalProductPath(product);
    if (location.pathname !== canonicalPath) {
      navigate(canonicalPath, { replace: true });
    }
  }, [location.pathname, navigate, product]);

  // ─── Image slider ─────────────────────────────────────────────────────────

  const totalImages = product?.images?.length || 0;

  const nextSlide = () => {
    if (!totalImages) return;
    setCurrentSlide((p) => (p === totalImages - 1 ? 0 : p + 1));
    setActiveImage((p) => (p === totalImages - 1 ? 0 : p + 1));
  };

  const prevSlide = () => {
    if (!totalImages) return;
    setCurrentSlide((p) => (p === 0 ? totalImages - 1 : p - 1));
    setActiveImage((p) => (p === 0 ? totalImages - 1 : p - 1));
  };

  // ─── Share ────────────────────────────────────────────────────────────────

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
      showToast("Link copied to clipboard!");
    }
  };

  // ─── Download brochure ────────────────────────────────────────────────────

  const handleDownloadBrochure = () => {
    if (!product?.brochureUrl) return;
    const link = document.createElement("a");
    link.href = getFullUrl(product.brochureUrl);
    link.target = "_blank";
    link.download = `${product.name.replace(/\s+/g, "_")}_brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Brochure download started", "bg-green-500");
  };

  // ─── Loading / empty states ───────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (!product) return null;

  // ─── Derived values ───────────────────────────────────────────────────────

  const categoryLabel = isAluminum ? "Aluminum" : "uPVC";
  const categoryPath = isAluminum
    ? "/products/aluminum-window-machines"
    : "/products/uPVC-window-making-machine-price";
  const productSubtitle = isAluminum
    ? "High Quality Aluminium Profile Solutions"
    : "High Quality uPVC Profile Solutions";
  const keyFeatures = isAluminum
    ? [
        "High-quality aluminium construction",
        "Corrosion-resistant and lightweight",
        "Energy-efficient and recyclable",
        "Customizable designs available",
      ]
    : [
        "High-quality uPVC construction",
        "Durable and weather-resistant",
        "Energy-efficient solutions",
        "Customizable designs available",
      ];

  const relatedProducts = allProducts
    .filter((p) => p.id !== identifier && p._id !== identifier)
    .slice(0, 3);

  const tabs = [
    { key: "specifications", label: "Specifications" },
    { key: "diagram", label: "Diagram" },
    { key: "description", label: "Description" },
    ...(product.videos?.length ? [{ key: "video", label: "Video" }] : []),
    ...(product.faq?.length ? [{ key: "faq", label: "FAQ" }] : []),
    { key: "catalog", label: "PDF Catalog" },
  ];

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
              onClick={() => navigate(categoryPath)}
              className="hover:text-purple-700 transition-colors"
            >
              {categoryLabel}
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
            <p className="mt-2 text-lg text-gray-600">{productSubtitle}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${isFavorite ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500 hover:bg-red-50"}`}
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
          <p className="mt-2 text-sm text-gray-500">
            Product Code: <span className="font-medium">{product.code}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* ── Image Gallery ── */}
        <div className="animate-fade-in-up">
          <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg group">
            <div className="relative h-96 w-full">
              {product.images?.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                  <img
                    src={getFullUrl(img)}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            {totalImages > 1 && (
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

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {product.images?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setActiveImage(index);
                  }}
                  className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-6" : "w-3 bg-white bg-opacity-50 hover:bg-opacity-75"}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImage(idx);
                  setCurrentSlide(idx);
                }}
                className={`rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${activeImage === idx ? "border-purple-600 scale-105 shadow-md" : "border-transparent hover:border-gray-300"}`}
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

        {/* ── Details Panel ── */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {/* Key Features */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Key Features
            </h2>
            <ul className="space-y-3">
              {keyFeatures.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">
                    <FiCheck className="w-5 h-5" />
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto mb-6 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 px-5 font-medium whitespace-nowrap transition-all duration-300 ${activeTab === tab.key ? "text-purple-700 border-b-2 border-purple-700 bg-purple-50 rounded-t-lg" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-100">
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
              </div>
            )}

            {activeTab === "diagram" && (
              <div className="animate-fade-in text-center">
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
                    className="mx-auto h-auto max-h-96 object-contain"
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
                    <video
                      controls
                      className="w-full h-full"
                      poster={getFullUrl(product.images?.[0])}
                    >
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
                className={`px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {product.inStock ? "In Stock" : "Available"}
              </div>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-lg font-semibold mr-4">Quantity:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-2 px-4 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    if (!isNaN(v) && v > 0 && v <= 100) setQuantity(v);
                  }}
                  className="w-16 text-center py-2 outline-none border-x"
                />
                <button
                  onClick={() => quantity < 100 && setQuantity(quantity + 1)}
                  className="p-2 px-4 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/contact-us")}
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

      {/* ── Detailed Views ── */}
      <div
        className="mt-16 animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Detailed Views
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          {[
            { label: "Front View", field: "technicalDrawingFront" },
            { label: "Side View", field: "technicalDrawingSide" },
          ].map(({ label, field }) => (
            <div
              key={field}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-4">{label}</h3>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <img
                  src={getFullUrl(product[field]) || "/images/placeholder.jpg"}
                  alt={label}
                  className="mx-auto max-h-64 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Related Products ── */}
      <div
        className="mt-16 animate-fade-in-up"
        style={{ animationDelay: "0.5s" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((related, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer border border-gray-100"
              onClick={() => navigate(getCanonicalProductPath(related))}
            >
              <div className="h-48 bg-gray-100 overflow-hidden">
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
                    className={`text-xs px-2 py-1 rounded-full ${related.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
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

export default ProductDetailPage;
