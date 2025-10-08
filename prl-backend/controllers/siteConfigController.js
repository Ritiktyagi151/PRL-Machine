const SiteConfig = require("../models/SiteConfig");

// Settings ko get karne ke liye
exports.getConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne({ key: "contactPageSettings" });
    
    if (!config) {
        config = await SiteConfig.create({
            key: "contactPageSettings",
            contactInfo: {
                address: `PARIDA RED LION INDIA PVT LTD
GST NO - 09AAJCP6402H1ZC
Plot No-106, Ecotec-3, Udyog Kendra-1
Greater Noida, Uttar Pradesh, 201306`,
                phone: "+91 7065500903",
                email: "r.k.parida015@gmail.com",
                hours: `Mon-Fri: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 4:00 PM
Sunday: Closed`,
            },
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.460614844185!2d77.45302757528562!3d28.543353075713554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9fb029d8a63%3A0x54c98e8d30aca0d6!2sPRL%20uPVC%20MACHINE%20(PARIDA%20RED%20LION%20INDIA%20PVT%20.LTD)!5e1!3m2!1sen!2sin!4v1755087574948!5m2!1sen!2sin",
            formFields: [
                { name: "name", label: "Full Name", type: "text", required: true },
                { name: "email", label: "Email Address", type: "email", required: true },
                { name: "phone", label: "Phone Number", type: "tel", required: false },
                { name: "subject", label: "Subject", type: "text", required: true },
                { name: "message", label: "Message", type: "textarea", required: true },
            ]
        });
    }

    res.status(200).json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching config" });
  }
};

// Settings ko update karne ke liye
exports.updateConfig = async (req, res) => {
  try {
    const updatedConfig = await SiteConfig.findOneAndUpdate(
      { key: "contactPageSettings" },
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, message: "Settings updated!", data: updatedConfig });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating config" });
  }
};