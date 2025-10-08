const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
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

module.exports = mongoose.model("Blog", blogSchema);
