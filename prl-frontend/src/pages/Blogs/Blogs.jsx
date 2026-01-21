import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/blogs`;

  // 🔹 IMAGE BASE URL Fix: Backend domain handle karne ke liye
  const getBaseUrl = () => {
    const apiURL = import.meta.env.VITE_API_BASE_URL;
    return apiURL.endsWith("/api") ? apiURL.replace("/api", "") : apiURL;
  };
  const IMAGE_BASE_URL = `${getBaseUrl()}/uploads`;

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      // Handle different API response structures
      let blogData = Array.isArray(data) ? data : data.blogs || data.data || [];
      setBlogs(blogData);

      if (blogData.length > 0) toast.success("Blogs loaded successfully!");
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch blogs. Please check if the server is running.");
      toast.error("Failed to load blogs.");

      try {
        const localData = await import("../Blogs/Blogs.json");
        const fallback =
          localData.default.blogs ||
          localData.default.data ||
          localData.default;
        if (Array.isArray(fallback)) setBlogs(fallback);
      } catch (localError) {
        console.error("Local data fallback failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Framer Motion Variants (Aapka original style)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    hover: {
      y: -8,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.08,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  // ✅ Image Handler
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/400x300?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    const cleanPath = imagePath.startsWith("/")
      ? imagePath.substring(1)
      : imagePath;
    return `${IMAGE_BASE_URL}/${cleanPath}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x300?text=Window+Tech+Blog";
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
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-50 tracking-wider">
            Window Technology Blogs
          </h1>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <strong className="font-bold">Error: </strong>{" "}
            <span className="block sm:inline">{error}</span>
          </motion.div>
        )}

        {!isLoading && Array.isArray(blogs) && blogs.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {blogs.map((blog) => {
              // 🔹 IMPORTANT: Link ke liye 'slug' ko priority dena zaroori hai
              const blogIdentifier = blog.slug || blog._id || blog.id;

              return (
                <motion.div
                  key={blog._id || blog.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100"
                >
                  <motion.div
                    className="relative h-64 overflow-hidden"
                    variants={imageVariants}
                  >
                    <img
                      src={getImageUrl(blog.image)}
                      alt={blog.title}
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
                      <span>{formatDate(blog.date)}</span>
                      <span className="text-red-800 font-medium">
                        By {blog.author || "Unknown"}
                      </span>
                    </div>
                    <h2 className="text-xl font-serif font-bold mb-3 text-gray-800 line-clamp-2">
                      {blog.title || "Untitled Blog"}
                    </h2>
                    <p className="text-gray-600 mb-5 line-clamp-3 font-light text-sm">
                      {blog.excerpt || "No excerpt available."}
                    </p>

                    {/* ✅ Slug based Link */}
                    <Link
                      to={`/blogs/${blogIdentifier}`}
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
