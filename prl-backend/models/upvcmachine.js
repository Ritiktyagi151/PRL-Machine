const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { _id: false });

const SpecificationsSchema = new mongoose.Schema({}, { strict: false, _id: false });

const UpvcMachineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: String,
  images: [String],
  videos: [String],
  specifications: SpecificationsSchema,
  technicalDrawing: String,
  technicalDrawingFront: String,
  technicalDrawingSide: String,
  faq: [FaqSchema],
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("UpvcMachine", UpvcMachineSchema);