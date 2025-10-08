const mongoose = require("mongoose");

const socialLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
});

const quickLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
});

const footerSchema = new mongoose.Schema({
  logo: { type: String, default: "" },
  description: { type: String, default: "" },
  socialLinks: [socialLinkSchema],
  quickLinks: [quickLinkSchema],
  contactInfo: {
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
  },
}, { timestamps: true });

module.exports = mongoose.model("Footer", footerSchema);
