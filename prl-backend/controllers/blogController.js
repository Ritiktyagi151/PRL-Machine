const mongoose = require("mongoose");
const Blog = require("../models/Blog");

// ✅ 1. Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const blogs = await Blog.find(filter).sort({ date: -1 });
    return res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 2. Get single blog by SLUG or ID (Dual Check for SEO)
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Pehle Slug se dhoondo taaki SEO friendly URL chale
    let blog = await Blog.findOne({ slug: slug });

    // Agar Slug se nahi mila aur input valid MongoDB ID hai, toh ID se dhoondo
    if (!blog && mongoose.Types.ObjectId.isValid(slug)) {
      blog = await Blog.findById(slug);
    }

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 3. Create blog
exports.createBlog = async (req, res) => {
  try {
    let imagePath = req.body.image;

    // Multer file upload check (Saving relative path for flexibility)
    if (req.file) {
      imagePath = req.file.filename;
    }

    const { title, excerpt, content, date, author, category, specifications } =
      req.body;

    if (!title || !excerpt || !content || !author || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing" });
    }

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      date: date || new Date(),
      author,
      image: imagePath,
      category,
      specifications,
    });

    await newBlog.save();
    return res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(400).json({ success: false, message: "Failed to create blog" });
  }
};

// ✅ 4. Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID" });
    }

    let updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    // Manual Slug Update (Kyunki update hook nahi chalta)
    if (updateData.title) {
      updateData.slug = updateData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    return res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(400).json({ success: false, message: "Failed to update blog" });
  }
};

// ✅ 5. Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID" });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
};


