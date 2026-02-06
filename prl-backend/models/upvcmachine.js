const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

const SpecificationsSchema = new mongoose.Schema(
  {},
  { strict: false, _id: false },
);

const UpvcMachineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    // Custom 'id' field for SEO-friendly URLs (e.g., "upvc-single-head-welding-machine")
    id: { type: String, unique: true },

    // Machine identification code (e.g., UPVC-001)
    code: { type: String, required: true, unique: true },

    description: String,

    // Array of relative paths or URLs for images and videos
    images: [String],
    videos: [String],

    specifications: SpecificationsSchema,

    // Technical Drawings (Main, Front, and Side views)
    technicalDrawing: String,
    technicalDrawingFront: String,
    technicalDrawingSide: String,

    // 🔹 LOGIC UPDATE: brochureUrl field added
    // Iske bina aapka PDF link database mein save nahi ho raha tha.
    brochureUrl: { type: String },

    faq: [FaqSchema],

    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Transform _id to id in JSON response for easier frontend handling
UpvcMachineSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    return ret;
  },
});

module.exports = mongoose.model("UpvcMachine", UpvcMachineSchema);
