const mongoose = require("mongoose");

const NavItemSchema = new mongoose.Schema({
  name: String,
  desc: String,
  icon: String, // store icon name or URL if needed
  link: String,
  subItems: [
    {
      name: String,
      desc: String,
      icon: String,
      link: String,
    },
  ],
});

const NavbarSchema = new mongoose.Schema({
  logo: { type: String, default: "" },
  announcements: { type: [String], default: [] },
  socialLinks: [
    {
      platform: String,
      icon: String,
      url: String,
    },
  ],
  contactInfo: {
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  products: [NavItemSchema],
  services: [NavItemSchema],
  companyItems: [NavItemSchema],
});

module.exports = mongoose.model("Navbar", NavbarSchema);
