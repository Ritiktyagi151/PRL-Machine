const mongoose = require("mongoose");

const aluminumMachineSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // Custom ID field (e.g., seo-slug)
    name: { type: String, required: true },
    description: String,
    images: [String],
    videos: [String],
    specifications: Object,

    // Technical Drawings
    technicalDrawing: String,
    technicalDrawingFront: String,
    technicalDrawingSide: String,

    // 🔹 LOGIC UPDATE: brochureUrl field added for PDF
    // Iske bina PDF link database mein store nahi ho raha tha.
    brochureUrl: { type: String },

    faq: [
      {
        question: String,
        answer: String,
      },
    ],
    price: Number,
    inStock: Boolean,
    code: { type: String, required: true, unique: true }, // Machine Code (e.g., AL-001)
  },
  { timestamps: true },
); // Timestamps tracking ke liye achha rehta hai

// Transform _id to id in API responses
aluminumMachineSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString(); // Use custom id or _id as fallback
    delete ret._id; // Remove _id
    delete ret.__v; // Remove version
    return ret;
  },
});

module.exports = mongoose.model("AluminumMachine", aluminumMachineSchema);
