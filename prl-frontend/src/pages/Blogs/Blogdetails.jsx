import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/blogs`;

  // ✅ Fetch blog details
  const fetchBlogDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching blog with ID:", id);

      const response = await fetch(`${API_BASE_URL}/${id}`);
      console.log("Blog details API status:", response.status);

      if (!response.ok) {
        throw new Error(`Blog not found. HTTP status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Blog details API Response:", data);

      const blogData = data.blog || data; // ✅ Fix: pick blog object
      setBlog(blogData);
      toast.success("Blog loaded successfully!");

      if (blogData.category) {
        fetchAllBlogsForRelated(blogData.category, blogData._id);
      }
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError(err.message || "Failed to load blog.");
      toast.error("Failed to load blog.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fetch all blogs for related content
  const fetchAllBlogsForRelated = async (category, currentBlogId) => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        console.warn("Failed to fetch related blogs");
        return;
      }

      const data = await response.json();
      const blogsArray = Array.isArray(data)
        ? data
        : data.blogs || data.data || [];

      const related = blogsArray
        .filter((b) => {
          const blogId = b._id || b.id;
          return blogId !== currentBlogId && b.category === category;
        })
        .slice(0, 4);

      setRelatedBlogs(related);
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  };

  useEffect(() => {
    if (id) fetchBlogDetails();
  }, [id]);

  // ✅ Handle image errors
  const handleImageError = (e) => {
    e.target.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRlZGVkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJsb2cgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==";
  };

  const handleRelatedImageError = (e) => {
    e.target.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZGRkZCIvPgogIDx0ZXh0IHg0PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QmxvZzwvdGV4dD4KPC9zdmc+";
  };

  // ================== LOADING STATE ==================
  if (isLoading) {
    return (
      <div className="container mt-28 mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="mb-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-96 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-3/4">
                    <div className="h-6 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-7 w-40 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-5 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================== ERROR STATE ==================
  if (error && !blog) {
    return (
      <div className="container mt-28 mx-auto px-4 py-8 max-w-7xl text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Link
          to="/ourcompany/ourblogs"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blogs
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mt-28 mx-auto px-4 py-8 max-w-7xl text-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <p className="text-gray-600 mb-4">
          The blog you're looking for doesn't exist.
        </p>
        <Link
          to="/ourcompany/ourblogs"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blogs
        </Link>
      </div>
    );
  }

  // ================== MAIN BLOG VIEW ==================
  return (
    <div className="container mt-28 mx-auto px-4 py-8 max-w-7xl">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Blog content */}
        <div className="lg:w-2/3">
          <div className="mb-6">
            <Link
              to="/ourcompany/ourblogs"
              className="text-orange-500 hover:underline flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              All Articles
            </Link>
          </div>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96 overflow-hidden">
              <img
                src={
                  blog.image ||
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRlZGVkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJsb2cgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=="
                }
                alt={blog.title || "Blog image"}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-orange-500 text-white px-3 py-1 text-sm rounded-full mb-3">
                    {blog.category || "Uncategorized"}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {blog.title || "Untitled Blog"}
                  </h1>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {blog.date
                    ? new Date(blog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "No date"}
                </div>
              </div>

              {blog.excerpt && (
                <p className="text-lg text-gray-600 mb-6 italic border-l-4 border-orange-500 pl-4">
                  {blog.excerpt}
                </p>
              )}

              <div className="prose max-w-none mb-6">
                {blog.content ? (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  <div className="text-gray-600 space-y-4">
                    <p>No content available for this blog post.</p>
                    <p>
                      Please check back later or contact the administrator for
                      more information.
                    </p>
                  </div>
                )}
              </div>

              {blog.specifications &&
                Object.keys(blog.specifications).length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                      Technical Specifications
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <table className="w-full">
                        <tbody>
                          {Object.entries(blog.specifications).map(
                            ([key, value]) => (
                              <tr
                                key={key}
                                className="border-b border-gray-200"
                              >
                                <td className="py-2 font-medium text-gray-700">
                                  {key}
                                </td>
                                <td className="py-2 text-gray-600">{value}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Written by:{" "}
                  <span className="font-medium text-orange-600">
                    {blog.author || "Unknown Author"}
                  </span>
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Related Articles */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Related Articles
            </h3>
            <div className="space-y-4">
              {Array.isArray(relatedBlogs) && relatedBlogs.length > 0 ? (
                relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog._id || relatedBlog.id}
                    to={`/blogs/${relatedBlog._id || relatedBlog.id}`}
                    className="block hover:bg-gray-50 rounded-lg transition p-3 border border-gray-100"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                        <img
                          src={
                            relatedBlog.image ||
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZGRkZCIvPgogIDx0ZXh0IHg0PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QmxvZzwvdGV4dD4KPC9zdmc+"
                          }
                          alt={relatedBlog.title || "Related blog"}
                          className="w-full h-full object-cover"
                          onError={handleRelatedImageError}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 line-clamp-2 text-sm leading-tight">
                          {relatedBlog.title || "Untitled Blog"}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {relatedBlog.date
                            ? new Date(relatedBlog.date).toLocaleDateString()
                            : "No date"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No related articles found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
