import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔹 INSTRUCTIONS: Aapke Cloudinary details daal diye hain
const CLOUDINARY_CLOUD_NAME = "dr5myqvnp"; // 👈 Aapka Cloud Name
const CLOUDINARY_UPLOAD_PRESET = "jaikvik"; // 👈 Aapka Upload Preset
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Error Boundary Component (Same as before)
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
                   {" "}
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                       {" "}
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h2>
                       {" "}
            <p className="text-gray-600 mb-4">
                            There was an error loading the blog content. Please
              try refreshing the page.            {" "}
            </p>
                       {" "}
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                            Refresh Page            {" "}
            </button>
                     {" "}
          </div>
                 {" "}
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
    image: "", // Yeh URL ke liye hai
    category: "",
  });
  const [isEditing, setIsEditing] = useState(null); // File upload ke liye state
  const [imageFile, setImageFile] = useState(null); // Yeh file upload ke liye hai
  const [isUploading, setIsUploading] = useState(false); // Image upload loading state

  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:3000/api/blogs"; // Format date for input field (yyyy-MM-dd)

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  }; // Fetch blogs from API

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
      } // Handle different API response structures
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
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch blogs. Please check if the server is running.");
      toast.error("Failed to load blogs. Please check your connection.");
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []); // Handle form inputs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value }); // Agar user URL paste karta hai

    if (name === "image") {
      setPreviewImage(value);
      setImageFile(null); // File upload ko clear kar dein
    }
  }; // Handle file selection

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Local preview dikhayein
      setNewBlog({ ...newBlog, image: "" }); // Image URL input ko clear kar dein
    }
  }; // Image ko Cloudinary par upload karne ka function

  const uploadImage = async (file) => {
    if (
      CLOUDINARY_CLOUD_NAME === "YOUR_CLOUD_NAME" ||
      CLOUDINARY_UPLOAD_PRESET === "YOUR_UPLOAD_PRESET"
    ) {
      toast.error("Cloudinary credentials set nahin hain!");
      console.error("Cloudinary credentials set nahin hain!");
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    setIsUploading(true);
    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        toast.success("Image uploaded successfully!");
        return data.secure_url;
      } else {
        throw new Error(data.error.message || "Cloudinary upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(`Image upload failed: ${error.message}`);
      return null;
    } finally {
      setIsUploading(false);
    }
  }; // Form reset function
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
    setImageFile(null); // File input ko reset karna // Agar aapke paas form element ka ref hai, toh aap form.reset() kar sakte hain. // Yahaan hum simple file input ko reset karne ke liye (agar zaroori ho):
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  }; // Add Blog

  const addBlog = async () => {
    if (!newBlog.title || !newBlog.excerpt) {
      toast.error("Title and Excerpt are required!");
      return;
    }
    setIsLoading(true); // Main loading start
    setError(null);
    try {
      let finalImageUrl = newBlog.image; // Default URL jo paste kiya gaya // Agar file select ki hai, toh pehle use upload karein

      if (imageFile) {
        toast.info("Uploading image...");
        finalImageUrl = await uploadImage(imageFile);
        if (!finalImageUrl) {
          setIsLoading(false); // Stop loading
          return; // Upload fail hua, aage mat badho
        }
      } // Ab finalImageUrl ke saath backend par save karein
      const blogToAdd = {
        ...newBlog,
        image: finalImageUrl, // Yahaan file upload ka URL ya pasted URL hoga
        date: newBlog.date || new Date().toISOString().split("T")[0],
      };

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogToAdd),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server returned ${response.status}`
        );
      }

      const addedBlog = await response.json();

      setBlogs([addedBlog, ...blogs]); // Naya blog list mein sabse upar dikhayein
      resetForm(); // Form reset karein
      toast.success("Blog added successfully!");
    } catch (error) {
      console.error("Error adding blog:", error);
      setError("Failed to add blog: " + error.message);
      toast.error("Failed to add blog: " + error.message);
    } finally {
      setIsLoading(false);
      setIsUploading(false); // Ensure upload state is also reset
    }
  }; // Edit Blog

  const editBlog = (id) => {
    const blog = blogs.find((b) => b.id === id || b._id === id);
    if (!blog) {
      toast.error("Blog not found!");
      return;
    }

    const blogWithFormattedDate = {
      ...blog,
      date: formatDateForInput(blog.date),
    };

    setNewBlog(blogWithFormattedDate);
    setPreviewImage(blog.image);
    setImageFile(null); // Edit mode mein file reset karein
    setIsEditing(id);
    toast.info("Editing mode activated");
    window.scrollTo(0, 0); // Form tak scroll karein
  }; // Cancel Edit

  const cancelEdit = () => {
    setIsEditing(null);
    resetForm(); // Form reset karein
    toast.info("Edit cancelled");
  }; // Save Edited Blog

  const saveEdit = async () => {
    if (!newBlog.title || !newBlog.excerpt) {
      toast.error("Title and Excerpt are required!");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const blogId = isEditing;
      let finalImageUrl = newBlog.image; // Default URL // Agar edit karte waqt nayi file select ki hai

      if (imageFile) {
        toast.info("Uploading new image...");
        finalImageUrl = await uploadImage(imageFile);
        if (!finalImageUrl) {
          setIsLoading(false);
          return;
        }
      } // Update payload mein final image URL daalein
      const updatedPayload = {
        ...newBlog,
        image: finalImageUrl,
      };

      const response = await fetch(`${API_BASE_URL}/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPayload), // updatedPayload bhejein
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server returned ${response.status}`
        );
      }

      const updatedBlog = await response.json();

      const updatedBlogs = blogs.map((b) =>
        b.id === isEditing || b._id === isEditing ? updatedBlog : b
      );

      setBlogs(updatedBlogs);
      setIsEditing(null);
      resetForm(); // Form reset karein
      toast.success("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("Failed to update blog: " + error.message);
      toast.error("Failed to update blog: " + error.message);
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  }; // Delete Blog with confirmation

  const deleteBlog = async (id) => {
    // Show confirmation dialog with toast
    const toastId = toast.warning(
      // Use warning for delete
      <div>
               {" "}
        <p className="font-semibold">
                    Are you sure you want to delete this blog?        {" "}
        </p>
               {" "}
        <div className="flex justify-center mt-2 space-x-2">
                   {" "}
          <button
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => {
              toast.dismiss(toastId);
              confirmDelete(id);
            }}
          >
                        Yes, Delete          {" "}
          </button>
                   {" "}
          <button
            className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={() => toast.dismiss(toastId)}
          >
                        Cancel          {" "}
          </button>
                 {" "}
        </div>
             {" "}
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  }; // Actual delete operation

  const confirmDelete = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server returned ${response.status}`
        );
      }

      setBlogs(blogs.filter((b) => b.id !== id && b._id !== id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError("Failed to delete blog: " + error.message);
      toast.error("Failed to delete blog: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
           {" "}
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-red-50 p-6">
               {" "}
        <div className="max-w-7xl mx-auto">
                    {/* Toast Container */}
                   {" "}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
                  {/* Header */}       {" "}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-violet-600 animate-fadeIn">
                   {" "}
            <h1 className="text-3xl font-bold mb-2 text-violet-800">
                      Admin Blog Panel        {" "}
            </h1>
                   {" "}
            <p className="text-gray-600">Manage your blog posts and content</p> 
                 {" "}
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <p className="font-semibold">API Error:</p>       {" "}
                <p>{error}</p>       {" "}
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-red-800 hover:text-red-900 font-semibold"
                >
                          Dismiss        {" "}
                </button>
                       {" "}
              </div>
            )}
                   {" "}
          </div>
                  {/* Blog Form */}       {" "}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 hover:shadow-lg transition-all duration-300">
                   {" "}
            <h2 className="text-xl font-bold mb-4 text-violet-700 flex items-center">
                      <span className="mr-2">{isEditing ? "✏️" : "📝"}</span>   
                  {isEditing ? "Edit Blog" : "Add New Blog"}       {" "}
            </h2>
                   {" "}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     {" "}
              <div>
                       {" "}
                <label className="block mb-2 font-semibold text-gray-700">
                          Title *        {" "}
                </label>
                       {" "}
                <input
                  type="text"
                  name="title"
                  value={newBlog.title}
                  onChange={handleChange}
                  placeholder="Blog Title"
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
                       {" "}
              </div>
                     {" "}
              <div>
                       {" "}
                <label className="block mb-2 font-semibold text-gray-700">
                          Category        {" "}
                </label>
                       {" "}
                <input
                  type="text"
                  name="category"
                  value={newBlog.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
                     {" "}
              </div>
                   {" "}
              <div>
                     {" "}
                <label className="block mb-2 font-semibold text-gray-700">
                        Author      {" "}
                </label>
                     {" "}
                <input
                  type="text"
                  name="author"
                  value={newBlog.author}
                  onChange={handleChange}
                  placeholder="Author"
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
                   {" "}
              </div>
                 {" "}
              <div>
                   {" "}
                <label className="block mb-2 font-semibold text-gray-700">
                      Date    {" "}
                </label>
                   {" "}
                <input
                  type="date"
                  name="date"
                  value={formatDateForInput(newBlog.date)} // Use newBlog.date here
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
                   {" "}
              </div>
                      {/* 🔹 UPDATED: Image Upload Section */}   {" "}
              <div className="md:col-span-2">
                   {" "}
                <label className="block mb-2 font-semibold text-gray-700">
                      Image    {" "}
                </label>
                   {" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                     {" "}
                  <div>
                       {" "}
                    <label className="block mb-2 text-sm font-medium text-gray-600">
                          Upload File    {" "}
                    </label>
                       {" "}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    />
                       {" "}
                    <div className="text-center my-2 text-gray-500 font-semibold">
                      OR
                    </div>
                       {" "}
                    <label className="block mb-2 text-sm font-medium text-gray-600">
                          Paste Image URL    {" "}
                    </label>
                       {" "}
                    <input
                      type="text"
                      name="image"
                      value={newBlog.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.png"
                      className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                       {" "}
                  </div>
                      {/* Preview Section */}   {" "}
                  {previewImage && (
                    <div className="p-3 bg-gray-100 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">Preview:</p>
                         {" "}
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-32 w-full border rounded-lg p-2 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x150?text=Invalid+Image";
                        }}
                      />
                         {" "}
                    </div>
                  )}
                     {" "}
                </div>
                   {" "}
              </div>
                 {" "}
              <div className="md:col-span-2">
                   {" "}
                <label className="block mb-2 font-semibold text-gray-700">
                      Excerpt *    {" "}
                </label>
                   {" "}
                <textarea
                  name="excerpt"
                  value={newBlog.excerpt}
                  onChange={handleChange}
                  placeholder="Short description of your blog"
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  rows="3"
                ></textarea>
                 {" "}
              </div>
               {" "}
              <div className="md:col-span-2">
                 {" "}
                <label className="block mb-2 font-semibold text-gray-700">
                    Content  {" "}
                </label>
                 {" "}
                <textarea
                  name="content"
                  value={newBlog.content}
                  onChange={handleChange}
                  placeholder="Blog content"
                  className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  rows="5"
                ></textarea>
                 {" "}
              </div>
               {" "}
            </div>
             {" "}
            <div className="flex gap-3">
               {" "}
              {isEditing ? (
                <>
                   {" "}
                  <button
                    onClick={saveEdit} // Image upload ke dauraan disable karein
                    disabled={isLoading || isUploading}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      {/* Loading text change karein */} {" "}
                    {isUploading
                      ? "Uploading Image..."
                      : isLoading
                      ? "Saving..."
                      : "Save Changes"}
                     {" "}
                  </button>
                   {" "}
                  <button
                    onClick={cancelEdit}
                    disabled={isLoading || isUploading}
                    className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      Cancel  {" "}
                  </button>
                   {" "}
                </>
              ) : (
                <button
                  onClick={addBlog}
                  disabled={isLoading || isUploading}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   {" "}
                  {isUploading
                    ? "Uploading Image..."
                    : isLoading
                    ? "Adding..."
                    : "Add Blog"}
                   {" "}
                </button>
              )}
               {" "}
            </div>
             {" "}
          </div>
            {/* Blog List Header */} {" "}
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-violet-800">Blog Posts</h2>
             {" "}
            <div className="flex items-center">
               {" "}
              <button
                onClick={fetchBlogs}
                disabled={isLoading}
                className="bg-violet-100 text-violet-800 px-3 py-1 rounded-lg mr-2 hover:bg-violet-200 transition-colors disabled:opacity-50 flex items-center"
              >
                 {" "}
                {/* Note: FontAwesome icons ke liye aapko index.html mein link add karna hoga */}
                  {/* <i className="fas fa-sync-alt mr-2"></i> */}  🔄 Refresh  {" "}
              </button>
               {" "}
              <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full">
                  {Array.isArray(blogs) ? blogs.length : 0}{" "}
                {Array.isArray(blogs) && blogs.length === 1 ? "Post" : "Posts"} {" "}
              </span>
               {" "}
            </div>
             {" "}
          </div>
            {/* Loading State */} {" "}
          {isLoading &&
            blogs.length === 0 && ( // Sirf tab dikhayein jab blogs load ho rahe hon
              <div className="bg-white rounded-xl shadow-md p-8 text-center mb-6">
                  <div className="text-5xl mb-4 animate-pulse">⏳</div>D  {" "}
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Loading Blogs...  {" "}
                </h3>
                 {" "}
              </div>
            )}
            {/* Blog List */} {" "}
          {!isLoading && Array.isArray(blogs) && blogs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-5xl mb-4">📝</div> {" "}
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No blog posts yet  {" "}
              </h3>
               {" "}
              <p className="text-gray-500">
                  Get started by adding your first blog post!  {" "}
              </p>
               {" "}
            </div>
          ) : (
            !isLoading &&
            Array.isArray(blogs) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {" "}
                {blogs.map((blog) => {
                  const blogId = blog.id || blog._id;
                  return (
                    <div
                      key={blogId}
                      className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 animate-fadeIn"
                    >
                       {" "}
                      <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                         {" "}
                        <img
                          src={
                            blog.image ||
                            "https://via.placeholder.com/300x150?text=No+Image"
                          }
                          alt={blog.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x150?text=Image+Not+Found";
                          }}
                        />
                         {" "}
                        <div className="absolute top-3 left-3 bg-violet-600 text-white text-xs px-2 py-1 rounded">
                            {blog.category || "Uncategorized"} {" "}
                        </div>
                         {" "}
                      </div>
                       {" "}
                      <h3 className="text-lg font-bold text-violet-800 mb-2 line-clamp-2">
                          {blog.title} {" "}
                      </h3>
                       {" "}
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {blog.excerpt} {" "}
                      </p>
                       {" "}
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                          <span>{blog.author || "Unknown Author"}</span> {" "}
                        <span>
                           {" "}
                          {blog.date
                            ? new Date(blog.date).toLocaleDateString()
                            : "No date"}
                           {" "}
                        </span>
                         {" "}
                      </div>
                       {" "}
                      <div className="flex justify-between gap-2">
                         {" "}
                        <button
                          onClick={() => editBlog(blogId)}
                          disabled={isLoading || isUploading}
                          className="bg-violet-100 hover:bg-violet-200 text-violet-700 px-3 py-2 rounded-lg transition-colors flex-1 flex items-center justify-center disabled:opacity-50"
                        >
                            {/* <i className="fas fa-edit mr-1"></i> */}  ✏️
                          Edit  {" "}
                        </button>
                         {" "}
                        <button
                          onClick={() => deleteBlog(blogId)}
                          disabled={isLoading || isUploading}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors flex-1 flex items-center justify-center disabled:opacity-50"
                        >
                            {/* <i className="fas fa-trash mr-1"></i> */}  🗑️
                          Delete  {" "}
                        </button>
                         {" "}
                      </div>
                       {" "}
                    </div>
                  );
                })}
                 {" "}
              </div>
            )
          )}
           {" "}
        </div>
         {" "}
      </div>
    </ErrorBoundary>
  );
};

export default AdminBlog;
