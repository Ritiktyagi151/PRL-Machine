// MachinePage.jsx
// Combined component for both uPVC and Aluminum window machine category pages.
// Detects which type to show based on the :categorySlug param matching
// UPVC_CATEGORIES or ALUMINUM_CATEGORIES slugs.

import React, { useEffect, useMemo, useState } from "react";
import {
  FiShoppingCart,
  FiInfo,
  FiMenu,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { scrollToElementId } from "../../utils/hashScroll";
import { UPVC_CATEGORIES } from "../../utils/upvcCategories";
import { ALUMINUM_CATEGORIES } from "../../utils/aluminumCategories";
import { getCanonicalProductPath } from "../../utils/productRouting";

const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");
const UPVC_API_URL = `${import.meta.env.VITE_API_BASE_URL}/upvcmachines`;
const ALUMINUM_API_URL = `${import.meta.env.VITE_API_BASE_URL}/aluminum-machines`;

// ─── Helpers ────────────────────────────────────────────────────────────────

const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder-image.jpg";
  if (imagePath.startsWith("http")) return imagePath;
  return `${IMAGE_BASE_URL}${imagePath}`;
};

const getUpvcCategoryFromName = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("welding")) return "uPVC Welding Machines";
  if (n.includes("cutting")) return "uPVC Cutting Machines";
  if (n.includes("cleaning")) return "uPVC Cleaning Machines";
  if (n.includes("router") || n.includes("lock hole"))
    return "uPVC Copy Router & Lock Hole Machines";
  if (n.includes("glazing bead")) return "uPVC Glazing Bead Cutting Machines";
  if (n.includes("drainage") || n.includes("water slot"))
    return "uPVC Drainage Water Slot Machines";
  if (n.includes("mullion")) return "uPVC Mullion Cutting Machines";
  if (n.includes("punching") || n.includes("interlock"))
    return "uPVC Interlock Punching";
  if (n.includes("hand tool")) return "Hand Tools";
  return "Other Special Machines";
};

const getAluminumCategoryFromName = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("cutting")) return "Aluminum Cutting Machines";
  if (n.includes("lock hole") || n.includes("router"))
    return "Aluminum Lock Hole Machines";
  if (n.includes("mullion")) return "Aluminum Mullion Machines";
  if (n.includes("punching") || n.includes("crimping"))
    return "Punching & Crimping Machines";
  return "Other Special Machines";
};

// ─── Animation variants ──────────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ─── Animated section wrapper ────────────────────────────────────────────────

const AnimatedSection = ({ children, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={fadeIn}
      className="mb-12"
    >
      {children}
    </motion.section>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────

const MachinePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categorySlug } = useParams();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Detect which type this slug belongs to
  const isAluminum = useMemo(
    () => ALUMINUM_CATEGORIES.some((c) => c.slug === categorySlug),
    [categorySlug]
  );

  const isUpvc = useMemo(
    () => UPVC_CATEGORIES.some((c) => c.slug === categorySlug),
    [categorySlug]
  );

  const categories = isAluminum ? ALUMINUM_CATEGORIES : UPVC_CATEGORIES;

  const getCategoryFromName = isAluminum
    ? getAluminumCategoryFromName
    : getUpvcCategoryFromName;

  const apiUrl = isAluminum ? ALUMINUM_API_URL : UPVC_API_URL;

  const heroTitle = isAluminum
    ? "Aluminum Window Machinery"
    : "uPVC Window Machinery";

  const heroSubtitle = isAluminum
    ? "High-performance machines for precision aluminum window manufacturing"
    : "Premium quality uPVC window manufacturing machines for precise, efficient production";

  const accentColor = isAluminum ? "#1D4ED8" : "#46266A";

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching machines:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // Reset active category when type changes
    setActiveCategory(1);
  }, [isAluminum]);

  // Group products into categories
  const groupedCategories = useMemo(
    () =>
      categories.map((cat) => ({
        ...cat,
        products: products.filter(
          (p) => getCategoryFromName(p.name) === cat.name
        ),
      })),
    [products, categories, getCategoryFromName]
  );

  // Navigate to category slug and scroll
  const scrollToCategory = (category) => {
    if (!category) return;
    setActiveCategory(category.id);
    setIsMobileSidebarOpen(false);

    const targetPath = `/products/${category.slug}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
      return;
    }
    scrollToElementId(`category-${category.id}`);
  };

  // On slug change, scroll to matching section
  useEffect(() => {
    if (loading || groupedCategories.length === 0 || !categorySlug) return;

    const category = groupedCategories.find((c) => c.slug === categorySlug);
    if (!category) return;

    setActiveCategory(category.id);

    let attempts = 0;
    let timeoutId;

    const tryScroll = () => {
      attempts += 1;
      const behavior = attempts === 1 ? "auto" : "smooth";
      const didScroll = scrollToElementId(`category-${category.id}`, behavior);
      if (didScroll || attempts >= 40) return;
      timeoutId = window.setTimeout(tryScroll, 100);
    };

    timeoutId = window.setTimeout(tryScroll, 0);
    return () => window.clearTimeout(timeoutId);
  }, [categorySlug, groupedCategories, loading]);

  // ── Loading state ──
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: accentColor }}
          />
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="flex items-center justify-center text-white px-4 py-2 rounded-md transition-colors mx-auto"
            style={{ backgroundColor: accentColor }}
          >
            <FiRefreshCw className="mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#46266A] to-[#FB252E] text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl max-w-3xl mx-auto"
          >
            {heroSubtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="container mx-auto px-4 py-4"
      >
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link to="/" className="text-[#46266A] hover:text-[#FB252E]">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  to="/products"
                  className="text-[#46266A] hover:text-[#FB252E]"
                >
                  Machines
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{heroTitle}</span>
              </div>
            </li>
          </ol>
        </nav>
      </motion.div>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden container mx-auto px-4 mb-4">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="flex items-center text-white px-4 py-2 rounded-md"
          style={{ backgroundColor: accentColor }}
        >
          {isMobileSidebarOpen ? (
            <><FiX className="mr-2" /> Close Categories</>
          ) : (
            <><FiMenu className="mr-2" /> Browse Categories</>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div
          className={`lg:block lg:w-1/4 lg:pr-6 lg:sticky lg:self-start lg:top-32 ${
            isMobileSidebarOpen ? "block mb-6" : "hidden"
          }`}
        >
          <div className="bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
            <h2
              className="text-xl font-bold mb-4 border-b pb-2"
              style={{ color: accentColor }}
            >
              Categories
            </h2>
            <nav className="space-y-2">
              {groupedCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category)}
                  className="w-full text-left px-3 py-2 rounded-md transition-colors"
                  style={
                    activeCategory === category.id
                      ? {
                          background:
                            "linear-gradient(to right, #46266A, #FB252E)",
                          color: "white",
                        }
                      : { color: "#374151" }
                  }
                  onMouseEnter={(e) => {
                    if (activeCategory !== category.id)
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== category.id)
                      e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  {category.name} ({category.products.length})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Products */}
        <div className="lg:w-3/4">
          {/* Mobile category pills */}
          <div className="lg:hidden mb-8">
            <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2"
            >
              {groupedCategories.map((category) => (
                <motion.button
                  key={category.id}
                  variants={fadeIn}
                  type="button"
                  className="bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200 transition-colors hover:text-white"
                  style={{ "--hover-bg": accentColor }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToCategory(category)}
                >
                  {category.name} ({category.products.length})
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Category sections */}
          {groupedCategories.map((category) => (
            <AnimatedSection key={category.id} id={`category-${category.id}`}>
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: accentColor }}
                >
                  {category.name}
                </h2>
              </div>

              {category.products.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500">
                    No products available in this category.
                  </p>
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {category.products.map((product) => (
                    <motion.div
                      key={product._id}
                      variants={fadeIn}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      whileHover={{ y: -5 }}
                    >
                      <Link to={getCanonicalProductPath(product)}>
                        <div className="relative h-40 overflow-hidden">
                          <motion.img
                            src={getImageUrl(product.images?.[0])}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="absolute top-2 right-2 bg-[#FB252E] text-white text-xs px-2 py-1 rounded">
                            New
                          </div>
                        </div>
                      </Link>

                      <div className="p-3">
                        <h3
                          className="text-lg font-semibold mb-1"
                          style={{ color: accentColor }}
                        >
                          {product.name}
                        </h3>

                        <div
                          className="text-gray-600 text-sm mb-2 line-clamp-2 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html:
                              product.description || "No description available.",
                          }}
                        />

                        <div className="mb-3">
                          <h4 className="font-medium text-gray-800 text-sm mb-1">
                            Key Specifications:
                          </h4>
                          <ul className="text-xs text-gray-600 space-y-1 line-clamp-3">
                            {product.specs && product.specs.length > 0 ? (
                              product.specs.slice(0, 3).map((spec, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-[#FB252E] mr-1">•</span>
                                  <span>{spec}</span>
                                </li>
                              ))
                            ) : product.specifications ? (
                              Object.entries(product.specifications)
                                .slice(0, 3)
                                .map(([key, value], i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="text-[#FB252E] mr-1">•</span>
                                    <span>{key}: {value}</span>
                                  </li>
                                ))
                            ) : (
                              <li className="text-gray-400">
                                No specs available
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Link to="/contact-us">
                            <motion.button
                              className="flex items-center text-white px-3 py-1 rounded-md transition-colors text-sm"
                              style={{ backgroundColor: accentColor }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiShoppingCart className="mr-1" /> Enquire
                            </motion.button>
                          </Link>
                          <Link to={getCanonicalProductPath(product)}>
                            <motion.button
                              className="flex items-center border border-[#FB252E] text-[#FB252E] px-3 py-1 rounded-md hover:bg-red-50 transition-colors text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiInfo className="mr-1" /> Details
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatedSection>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#46266A] to-[#FB252E] text-white rounded-lg p-6 text-center mt-8"
          >
            <h2 className="text-xl font-bold mb-3">
              Need Help Choosing the Right Machine?
            </h2>
            <p className="mb-4 text-sm max-w-2xl mx-auto">
              Our experts can help you select the perfect{" "}
              {isAluminum ? "aluminum" : "uPVC"} window machines for your
              production needs.
            </p>
            <Link to="/contact-us">
              <motion.button
                className="bg-white px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm"
                style={{ color: accentColor }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Our Specialists
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MachinePage;