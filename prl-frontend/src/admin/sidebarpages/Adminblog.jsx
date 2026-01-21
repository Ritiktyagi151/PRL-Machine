import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Error Boundary Component (Same as your code)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              There was an error loading the blog content.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: "",
    author: "",
    image: "",
    category: "",
  });
  const [isEditing, setIsEditing] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/blogs`;

  // 🔹 IMAGE BASE URL for preview
  const getBaseUrl = () => {
    const apiURL = import.meta.env.VITE_API_BASE_URL;
    return apiURL.endsWith("/api") ? apiURL.replace("/api", "") : apiURL;
  };
  const IMAGE_BASE_URL = `${getBaseUrl()}/uploads`;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300x150?text=No+Image";
    if (imagePath.startsWith("http") || imagePath.startsWith("blob"))
      return imagePath;
    return `${IMAGE_BASE_URL}/${imagePath}`;
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : data.blogs || data.data || []);
    } catch (error) {
      setError("Failed to fetch blogs.");
      toast.error("Failed to load blogs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
    if (name === "image") {
      setPreviewImage(value);
      setImageFile(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setNewBlog({ ...newBlog, image: "" });
    }
  };

  const resetForm = () => {
    setNewBlog({
      title: "",
      excerpt: "",
      content: "",
      date: "",
      author: "",
      image: "",
      category: "",
    });
    setPreviewImage("");
    setImageFile(null);
    if (document.querySelector('input[type="file"]'))
      document.querySelector('input[type="file"]').value = "";
  };

  // 🔹 ADD BLOG (FormData with Slug support)
  const addBlog = async () => {
    if (!newBlog.title || !newBlog.excerpt) {
      toast.error("Title and Excerpt are required!");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    Object.keys(newBlog).forEach((key) => formData.append(key, newBlog[key]));
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Server Error");
      toast.success("Blog added successfully!");
      fetchBlogs(); // List refresh karein taaki slug update ho jaye
      resetForm();
    } catch (error) {
      toast.error("Failed to add blog");
    } finally {
      setIsLoading(false);
    }
  };

  const editBlog = (id) => {
    const blog = blogs.find((b) => b.id === id || b._id === id);
    if (!blog) return;
    setNewBlog({ ...blog, date: formatDateForInput(blog.date) });
    setPreviewImage(getImageUrl(blog.image));
    setImageFile(null);
    setIsEditing(id);
    window.scrollTo(0, 0);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    resetForm();
  };

  // 🔹 SAVE EDIT
  const saveEdit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    // FormData update
    formData.append("title", newBlog.title);
    formData.append("excerpt", newBlog.excerpt);
    formData.append("content", newBlog.content);
    formData.append("category", newBlog.category);
    formData.append("author", newBlog.author);
    formData.append("date", newBlog.date);

    if (imageFile) formData.append("image", imageFile);
    else formData.append("image", newBlog.image);

    try {
      const response = await fetch(`${API_BASE_URL}/${isEditing}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error("Update failed");
      toast.success("Blog updated successfully!");
      setIsEditing(null);
      fetchBlogs();
      resetForm();
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Delete failed");
        setBlogs(blogs.filter((b) => (b.id || b._id) !== id));
        toast.success("Blog deleted successfully!");
      } catch (error) {
        toast.error("Delete failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-red-50 p-6">
        <div className="max-w-7xl mx-auto">
          <ToastContainer />

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-violet-600">
            <h1 className="text-3xl font-bold mb-2 text-violet-800">
              Admin Blog Panel
            </h1>
            <p className="text-gray-600">
              Manage your blog posts and SEO slugs
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-violet-700">
              {isEditing ? "✏️ Edit Blog" : "📝 Add New Blog"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleChange}
                placeholder="Blog Title *"
                className="border-2 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
              />
              <input
                type="text"
                name="category"
                value={newBlog.category}
                onChange={handleChange}
                placeholder="Category"
                className="border-2 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
              />
              <input
                type="text"
                name="author"
                value={newBlog.author}
                onChange={handleChange}
                placeholder="Author"
                className="border-2 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
              />
              <input
                type="date"
                name="date"
                value={formatDateForInput(newBlog.date)}
                onChange={handleChange}
                className="border-2 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
              />

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700"
                  />
                </div>
                {previewImage && (
                  <div className="text-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <textarea
                name="excerpt"
                value={newBlog.excerpt}
                onChange={handleChange}
                placeholder="Excerpt *"
                className="md:col-span-2 border-2 p-3 rounded-lg h-24 focus:ring-2 focus:ring-violet-500 outline-none"
              ></textarea>
              <textarea
                name="content"
                value={newBlog.content}
                onChange={handleChange}
                placeholder="HTML Content"
                className="md:col-span-2 border-2 p-3 rounded-lg h-40 focus:ring-2 focus:ring-violet-500 outline-none"
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                onClick={isEditing ? saveEdit : addBlog}
                disabled={isLoading}
                className="bg-violet-600 text-white px-8 py-3 rounded-lg hover:bg-violet-700 disabled:opacity-50 transition-all font-semibold"
              >
                {isLoading
                  ? "Processing..."
                  : isEditing
                    ? "Save Changes"
                    : "Add Blog"}
              </button>
              {isEditing && (
                <button
                  onClick={cancelEdit}
                  className="bg-gray-300 px-8 py-3 rounded-lg hover:bg-gray-400 font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* List Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id || blog.id}
                className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition-all"
              >
                <img
                  src={getImageUrl(blog.image)}
                  alt={blog.title}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x150?text=Error")
                  }
                />
                <h3 className="font-bold text-violet-800 line-clamp-1">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-400 mb-2">
                  Slug: {blog.slug || "No slug yet"}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {blog.excerpt}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => editBlog(blog._id || blog.id)}
                    className="bg-violet-100 text-violet-700 px-3 py-2 rounded-lg flex-1 text-sm font-semibold"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id || blog.id)}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded-lg flex-1 text-sm font-semibold"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminBlog;
