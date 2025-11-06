// UPVCWindowMachinesPage.jsx
import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiDownload,
  FiShoppingCart,
  FiInfo,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const UPVC_API_URL = `${import.meta.env.VITE_API_BASE_URL}/upvcmachines`;

const UPVCWindowMachinesPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(1);
  const [upvcData, setUpvcData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchUpvcData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(UPVC_API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUpvcData(data);
      } catch (err) {
        console.error("Error fetching uPVC machines:", err);
        setError(err.message || "Failed to load uPVC machines.");
      } finally {
        setLoading(false);
      }
    };
    fetchUpvcData();
  }, []);

  // Function to categorize products based on name (similar to getCategoryFromName)
  const getCategoryFromName = (name) => {
    if (!name) return "Other Special Machines";
    const lowerName = name.toLowerCase();
    if (lowerName.includes("welding")) return "uPVC Welding Machines";
    if (lowerName.includes("cutting")) return "uPVC Cutting Machines";
    if (lowerName.includes("cleaning")) return "uPVC Cleaning Machines";
    if (lowerName.includes("router") || lowerName.includes("lock hole"))
      return "uPVC Copy Router & Lock Hole Machines";
    if (lowerName.includes("glazing bead"))
      return "uPVC Glazing Bead Cutting Machines";
    if (lowerName.includes("drainage") || lowerName.includes("water slot"))
      return "uPVC Drainage Water Slot Machines";
    if (lowerName.includes("mullion")) return "uPVC Mullion Cutting Machines";
    if (lowerName.includes("punching") || lowerName.includes("interlock"))
      return "uPVC Interlock Punching";
    if (lowerName.includes("hand tool")) return "Hand Tools";
    return "Other Special Machines";
  };

  // Product categories data (dynamic based on fetched data)
  const categories = [
    {
      id: 1,
      name: "uPVC Welding Machines",
      filterFn: (products) =>
        products.filter(
          (product) =>
            getCategoryFromName(product.name) === "uPVC Welding Machines"
        ),
    },
    {
      id: 2,
      name: "uPVC Cutting Machines",
      filterFn: (products) =>
        products.filter(
          (product) =>
            getCategoryFromName(product.name) === "uPVC Cutting Machines"
        ),
    },
    {
      id: 3,
      name: "uPVC Cleaning Machines",
      filterFn: (products) =>
        products.filter(
          (product) =>
            getCategoryFromName(product.name) === "uPVC Cleaning Machines"
        ),
    },
    {
      id: 4,
      name: "uPVC Copy Router & Lock Hole Machines",
      filterFn: (products) =>
        products.filter(
          (product) =>
            getCategoryFromName(product.name) ===
            "uPVC Copy Router & Lock Hole Machines"
        ),
    },
    {
      id: 5,
      name: "uPVC Glazing Bead Cutting Machines",
      filterFn: (products) =>
        products.filter(
          (product) =>
            getCategoryFromName(product.name) ===
            "uPVC Glazing Bead Cutting Machines"
        ),
    },
    {
      id: 6,
      name: "uPVC Drainage Water Slot Machines",
      filterFn: (products) =>
        products.filter(
          (product) =>
            getCategoryFromName(product.name) ===
            "uPVC Drainage Water Slot Machines"
        ),
    },
    {
      id: 7,
      name: "uPVC Mullion Cutting Machines",
      filterFn: (products) =>
        products.filter(
          (product) =>
            getCategoryFromName(product.name) ===
            "uPVC Mullion Cutting Machines"
        ),
    },
    {
      id: 8,
      name: "uPVC Interlock Punching",
      filterFn: (products) =>
        products.filter(
          (product) =>
            getCategoryFromName(product.name) === "uPVC Interlock Punching"
        ),
    },
    {
      id: 9,
      name: "Hand Tools",
      filterFn: (products) =>
        products.filter(
          (product) => getCategoryFromName(product.name) === "Hand Tools"
        ),
    },
    {
      id: 10,
      name: "Other Special Machines",
      filterFn: (products) =>
        products.filter(
          (product) =>
            getCategoryFromName(product.name) === "Other Special Machines"
        ),
    },
  ].map((cat) => ({
    ...cat,
    products: cat.filterFn(upvcData),
  }));

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animated component
  const AnimatedSection = ({ children, id }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
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

  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#46266A]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#46266A] text-white px-4 py-2 rounded-md hover:bg-[#5a2f8a] transition-colors"
        >
          Try Again
        </button>
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
            uPVC Window Machinery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Premium quality uPVC window manufacturing machines for precise,
            efficient production
          </motion.p>
        </div>
      </motion.div>

      {/* Breadcrumb Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="container mx-auto px-4 py-4"
      >
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-[#46266A] hover:text-[#FB252E]">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a
                  href="/products"
                  className="text-[#46266A] hover:text-[#FB252E]"
                >
                  Machines
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">uPVC Window Machines</span>
              </div>
            </li>
          </ol>
        </nav>
      </motion.div>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden container mx-auto px-4 mb-4">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="flex items-center bg-[#46266A] text-white px-4 py-2 rounded-md"
        >
          {isMobileSidebarOpen ? (
            <>
              <FiX className="mr-2" /> Close Categories
            </>
          ) : (
            <>
              <FiMenu className="mr-2" /> Browse Categories
            </>
          )}
        </button>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div
          className={`lg:block lg:w-1/4 lg:pr-6 lg:sticky lg:self-start lg:top-32 ${
            isMobileSidebarOpen ? "block mb-6" : "hidden"
          }`}
        >
          <div className="bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-[#46266A] border-b pb-2">
              Categories
            </h2>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-[#46266A] to-[#FB252E] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name} ({category.products.length})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Products */}
        <div className="lg:w-3/4">
          {/* Category Filter (hidden on desktop) */}
          <div className="lg:hidden mb-8">
            <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <motion.a
                  key={category.id}
                  variants={fadeIn}
                  href={`#category-${category.id}`}
                  className="bg-white px-4 py-2 rounded-md shadow-sm hover:bg-[#46266A] hover:text-white border border-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name} ({category.products.length})
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Products by Category */}
          {categories.map((category) => (
            <AnimatedSection key={category.id} id={`category-${category.id}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#46266A]">
                  {category.name}
                </h2>
              </div>

              {category.products.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No products available in this category.
                </p>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {category.products.map((product) => (
                    <motion.div
                      key={product._id} // Use _id for key
                      variants={fadeIn}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <motion.img
                          src={product.images?.[0] || "/placeholder-image.jpg"} // Fallback image
                          alt={product.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute top-2 right-2 bg-[#FB252E] text-white text-xs px-2 py-1 rounded">
                          New
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-lg font-semibold mb-1 text-[#46266A]">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mb-3">
                          <h4 className="font-medium text-gray-800 text-sm mb-1">
                            Key Specifications:
                          </h4>
                          <ul className="text-xs text-gray-600 space-y-1 line-clamp-3">
                            {Object.entries(product.specifications || {})
                              .slice(0, 3)
                              .map(([key, value], index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-[#FB252E] mr-1">•</span>
                                  <span>
                                    {key}: {value}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Link to="/contact">
                            <motion.button
                              className="flex items-center bg-[#46266A] text-white px-3 py-1 rounded-md hover:bg-[#5a2f8a] transition-colors text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiShoppingCart className="mr-1" /> Enquire
                            </motion.button>
                          </Link>
                          <Link to={`/productdetailupvc/${product._id}`}>
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

          {/* Call to Action */}
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
              Our experts can help you select the perfect uPVC window machines
              for your production needs.
            </p>
            <motion.button
              className="bg-white text-[#46266A] px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Our Specialists
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UPVCWindowMachinesPage;
