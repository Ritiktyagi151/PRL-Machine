const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  image: { type: String },
  video: { type: String },
}, { timestamps: true });

const statsSchema = new mongoose.Schema({
  machinesSold: { type: String, default: "500+" },
  satisfaction: { type: String, default: "98%" },
  experience: { type: String, default: "15+" },
  support: { type: String, default: "24/7" },
});

// Models ko register karein
const Testimonial = mongoose.model("Testimonial", testimonialSchema);
const Stats = mongoose.model("Stats", statsSchema);

module.exports = { Testimonial, Stats };