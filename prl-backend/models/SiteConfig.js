const mongoose = require("mongoose");

const FormFieldSchema = new mongoose.Schema({
  name: String,
  label: String,
  type: String,
  required: Boolean,
});

const SiteConfigSchema = new mongoose.Schema({
  key: { type: String, default: "contactPageSettings", unique: true },
  
  contactInfo: {
    address: String,
    phone: String,
    email: String,
    hours: String,
  },
  mapEmbed: String,
  formFields: [FormFieldSchema],
});

module.exports = mongoose.model("SiteConfig", SiteConfigSchema);