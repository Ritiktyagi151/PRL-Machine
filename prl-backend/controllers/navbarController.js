const Navbar = require("../models/Navbar");

// ✅ Get first navbar (Default for frontend)
exports.getNavbar = async (req, res) => {
  try {
    let navbar = await Navbar.findOne();
    if (!navbar) navbar = await Navbar.create({});
    res.json(navbar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✨ NEW: Controller to handle logo upload
exports.uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Construct the full URL for the logo
    // This makes it easy for the frontend to display the image
    const logoUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    // Find the first navbar document (or create one if it doesn't exist)
    let navbar = await Navbar.findOne();
    if (!navbar) {
      navbar = new Navbar({});
    }

    // Update the logo field with the new URL
    navbar.logo = logoUrl;
    await navbar.save();

    res.json({
      message: "Logo uploaded and updated successfully",
      logo: logoUrl, // Send the new URL back to the frontend
    });
  } catch (err) {
    console.error("Error during logo upload:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all navbars (optional for debugging)
exports.getAllNavbars = async (req, res) => {
  try {
    const navbars = await Navbar.find();
    res.json(navbars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create a new navbar
exports.createNavbar = async (req, res) => {
  try {
    const navbar = await Navbar.create(req.body);
    res.status(201).json({ message: "Navbar created successfully", navbar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update first navbar
exports.updateNavbar = async (req, res) => {
  try {
    let navbar = await Navbar.findOne();
    if (!navbar) navbar = new Navbar({});

    const fields = [
      "logo",
      "announcements",
      "socialLinks",
      "contactInfo",
      "products",
      "services",
      "companyItems",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) navbar[field] = req.body[field];
    });

    await navbar.save();
    res.json({ message: "Navbar updated successfully", navbar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete first navbar
exports.deleteNavbar = async (req, res) => {
  try {
    const navbar = await Navbar.findOne();
    if (!navbar) return res.status(404).json({ message: "No navbar found" });

    await Navbar.deleteOne({ _id: navbar._id });
    res.json({ message: "Navbar deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};