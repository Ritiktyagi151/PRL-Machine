import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API endpoint
  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/blogs`;

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      console.log("API Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log("API Response text:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("API Response parsed:", data);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        throw new Error("Invalid JSON response from server");
      }

      // Handle different API response structures
      if (Array.isArray(data)) {
        setBlogs(data);
      } else if (data.blogs && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else if (data.data && Array.isArray(data.data)) {
        setBlogs(data.data);
      } else {
        console.warn("API response is not an array:", data);
        setBlogs([]);
        toast.warning("No blog data found in the response");
      }

      toast.success("Blogs loaded successfully!");
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch blogs. Please check if the server is running.");
      toast.error("Failed to load blogs. Please check your connection.");
      setBlogs([]);

      // Fallback to local data if API fails
      try {
        const localData = await import("../Blogs/Blogs.json");
        if (Array.isArray(localData.default)) {
          setBlogs(localData.default);
          toast.info("Using local blog data");
        } else if (
          localData.default &&
          Array.isArray(localData.default.blogs)
        ) {
          setBlogs(localData.default.blogs);
        } else if (localData.default && Array.isArray(localData.default.data)) {
          setBlogs(localData.default.data);
        } else {
          console.warn(
            "Local data is not in expected format:",
            localData.default
          );
        }
      } catch (localError) {
        console.error("Also failed to load local data:", localError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hover: {
      y: -8,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.08,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Invalid date";
    }
  };

  // Handle image errors
  const handleImageError = (e) => {
    console.log("Image failed to load, using fallback");
    e.target.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRlZGVkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPldpbmRvdyBUZWNoIEJsb2c8L3RleHQ+Cjwvc3ZnPg==";
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-24 md:h-32 mt-10 bg-red-900"></div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-50 tracking-wider">
            Window Technology Blogs
          </h1>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Loading & Error */}
        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </motion.div>
        )}

        {/* Blogs List */}
        {!isLoading && Array.isArray(blogs) && blogs.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {blogs.map((blog) => {
              const blogId = blog._id || blog.id; // ✅ FIX

              return (
                <motion.div
                  key={blogId}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100"
                >
                  <motion.div
                    className="relative h-64 overflow-hidden"
                    variants={imageVariants}
                  >
                    <img
                      src={blog.image}
                      alt={blog.title || "Blog image"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute top-4 right-4 bg-red-900 text-amber-50 px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                      {blog.category || "Uncategorized"}
                    </span>
                  </motion.div>

                  <div className="p-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span className="font-medium">
                        {formatDate(blog.date)}
                      </span>
                      <span className="text-red-800 font-medium">
                        By {blog.author || "Unknown Author"}
                      </span>
                    </div>

                    <h2 className="text-xl font-serif font-bold mb-3 text-gray-800 line-clamp-2">
                      {blog.title || "Untitled Blog"}
                    </h2>
                    <p className="text-gray-600 mb-5 line-clamp-3 font-light">
                      {blog.excerpt || "No excerpt available."}
                    </p>

                    {/* ✅ FIXED LINK */}
                    <Link
                      to={`/blogs/${blogId}`}
                      className="inline-flex items-center text-red-900 hover:text-red-700 font-medium transition-colors group"
                    >
                      <span className="relative">
                        Read More
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-red-900 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      <svg
                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
