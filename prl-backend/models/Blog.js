const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // 🔹 Naya field jo URL mein dikhega (e.g., your-blog-title)
  slug: { type: String, unique: true }, 
  excerpt: { type: String, required: true },
  content: { type: String, required: true }, // HTML content
  date: { type: Date, required: true },
  author: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  specifications: {
    Dimensions: { type: String },
    Weight: { type: String },
    Power: { type: String },
    "Energy Savings": { type: String },
    "Material Savings": { type: String },
  },
});

// 🔹 Middleware: Save hone se pehle Title ko Slug mein badle
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .split(/\s+/)        // Spaces se split karega
      .join("-")           // Hyphen se jodega
      .replace(/[^\w-]+/g, ""); // Special characters hatayega
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);