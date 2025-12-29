const { Testimonial, Stats } = require("../models/testimonialModel");

// 1. Get All Testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Add New Testimonial (POST)
exports.saveTestimonial = async (req, res) => {
  try {
    const newItem = new Testimonial(req.body);
    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 3. Update Existing Testimonial (PUT) - FIX FOR YOUR ERROR
exports.updateTestimonial = async (req, res) => {
  try {
    const updatedItem = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.json({ success: true, data: updatedItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 4. Delete Testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 5. Get Stats
exports.getStats = async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) stats = await Stats.create({});
    res.json(stats);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 6. Update Stats
exports.updateStats = async (req, res) => {
  try {
    const stats = await Stats.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
    });
    res.json(stats);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
