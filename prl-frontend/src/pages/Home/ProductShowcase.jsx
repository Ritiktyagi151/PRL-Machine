import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UPVC_API_URL = `${import.meta.env.VITE_API_BASE_URL}/upvcmachines`;
const ALUMINUM_API_URL = `${
  import.meta.env.VITE_API_BASE_URL
}/aluminum-machines`;

// --- Child Component for the Product Card with Image Slider (UPDATED with Auto-Slide) ---
const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timeoutRef = useRef(null);

  const images =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images
      : ["https://cdn.globalso.com/cgmachina/default-machine.jpg"];

  const hasMultipleImages = images.length > 1;

  // Function to reset and start the auto-slide timer
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // useEffect hook for auto-sliding
  useEffect(() => {
    if (hasMultipleImages) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length),
        3000 // Change image every 3 seconds
      );

      // Cleanup function to clear the timer when the component unmounts
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
      onMouseEnter={resetTimeout} // Pause auto-slide on hover
      onMouseLeave={() => {
        // Resume auto-slide on mouse leave
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
      {/* Badge */}
      {/* <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-20">
        {product.category}
      </div> */}

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

          {/* Slider Controls */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-60"
                aria-label="Previous image"
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
                aria-label="Next image"
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
            <Link to="/contact">
              <button className="w-full bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300">
                Enquire Now
              </button>
            </Link>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

// --- Main Parent Component (No changes needed here) ---
const ProductShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          console.error(
            "uPVC API Error:",
            upvcError.response?.data || upvcError.message
          );
          // Don't throw error here to allow aluminum products to load if uPVC fails
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
          console.error(
            "Aluminum API Error:",
            aluminumError.response?.data || aluminumError.message
          );
          // Don't throw error here
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
      className="py-12 bg-gray-50  bg-center bg-repeat relative"
      style={{
        backgroundImage:
          'url("/assets/bg-img/bg-theme/IMG-20250725-WA0204.jpg")',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-6 ml-14 text-start">
          <h2 className="text-3xl font-bold text-gray-800 hover:text-red-600 transition-colors duration-300 inline-flex items-center">
            OUR PRODUCTS
            <span className="mx-3 h-0.5 w-12 bg-red-600"></span>
            <span className="text-gray-500 text-xl italic font-normal">
              best for you
            </span>
          </h2>
        </div>

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
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
