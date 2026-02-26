import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Seo from "../../common/seo/Seo";

const BlogDetails = () => {
  const { slug } = useParams(); // URL se title/slug uthayega
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/blogs`;

  const getBaseUrl = () => {
    const apiURL = import.meta.env.VITE_API_BASE_URL;
    return apiURL.endsWith("/api") ? apiURL.replace("/api", "") : apiURL;
  };
  const IMAGE_BASE_URL = `${getBaseUrl()}/uploads`;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/800x400?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    const cleanPath = imagePath.startsWith("/")
      ? imagePath.substring(1)
      : imagePath;
    return `${IMAGE_BASE_URL}/${cleanPath}`;
  };

  const fetchBlogDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // API call ab slug se hogi
      const response = await fetch(`${API_BASE_URL}/${slug}`);
      if (!response.ok) throw new Error(`Blog not found.`);
      const data = await response.json();
      const blogData = data.blog || data;
      setBlog(blogData);

      if (blogData.category)
        fetchAllBlogsForRelated(
          blogData.category,
          blogData.slug || blogData._id,
        );
    } catch (err) {
      setError(err.message || "Failed to load blog.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllBlogsForRelated = async (category, currentIdentifier) => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) return;
      const data = await response.json();
      const blogsArray = Array.isArray(data)
        ? data
        : data.blogs || data.data || [];
      const related = blogsArray
        .filter(
          (b) =>
            (b.slug || b._id) !== currentIdentifier && b.category === category,
        )
        .slice(0, 4);
      setRelatedBlogs(related);
    } catch (error) {
      console.error("Related blogs error", error);
    }
  };

  useEffect(() => {
    if (slug) fetchBlogDetails();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
  };
  const handleRelatedImageError = (e) => {
    e.target.src = "https://via.placeholder.com/80x80?text=Blog";
  };

  if (isLoading)
    return (
      <div className="container mt-28 mx-auto px-4 py-8 max-w-7xl text-center">
        Loading Blog Details...
      </div>
    );
  if (error || !blog)
    return (
      <div className="container mt-28 mx-auto px-4 py-8 text-center">
        <Seo
          title="Blog Not Found | Parida Red Lion"
          description="The requested blog could not be found."
          canonicalPath={`/blogs/${slug || ""}`}
          noindex
        />
        <h2 className="text-2xl font-bold mb-4">Blog Not Found</h2>
        <Link to="/ourcompany/ourblogs" className="text-orange-500 underline">
          Back to Blogs
        </Link>
      </div>
    );

  const blogTitle = blog.title || "Window Technology Blog";
  const blogDescription =
    blog.excerpt || blog.content || "Read blog insights from Parida Red Lion.";
  const canonicalPath = `/blogs/${blog.slug || slug}`;
  const blogImage = getImageUrl(blog.image);
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogTitle,
    description: blogDescription,
    image: blogImage,
    datePublished: blog.date,
    author: {
      "@type": "Person",
      name: blog.author || "Parida Red Lion Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Parida Red Lion",
      logo: {
        "@type": "ImageObject",
        url: "/assets/logo/parida-red-new-logo.jpg",
      },
    },
    mainEntityOfPage: canonicalPath,
  };

  return (
    <div className="container mt-28 mx-auto px-4 py-8 max-w-7xl">
      <Seo
        title={`${blogTitle} | Parida Red Lion`}
        description={blogDescription}
        canonicalPath={canonicalPath}
        image={blogImage}
        type="article"
        keywords={[blog.category, "window technology blog", "Parida Red Lion"]}
        jsonLd={blogJsonLd}
      />
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="mb-6">
            <Link
              to="/ourcompany/ourblogs"
              className="text-orange-500 hover:underline flex items-center"
            >
              ← All Articles
            </Link>
          </div>
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96 overflow-hidden">
              <img
                src={getImageUrl(blog.image)}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-orange-500 text-white px-3 py-1 text-sm rounded-full mb-3">
                    {blog.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {blog.title}
                  </h1>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(blog.date).toLocaleDateString()}
                </div>
              </div>
              <div
                className="prose max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Written by:{" "}
                  <span className="font-medium text-orange-600">
                    {blog.author}
                  </span>
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Related Articles
            </h3>
            <div className="space-y-4">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog._id || relatedBlog.id}
                  to={`/blogs/${relatedBlog.slug || relatedBlog._id}`}
                  className="block border p-2 rounded hover:bg-gray-50"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={getImageUrl(relatedBlog.image)}
                      className="w-16 h-16 object-cover rounded"
                      onError={handleRelatedImageError}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {relatedBlog.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetails;
