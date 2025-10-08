import SiteMeta from "../models/SiteMeta.js";

export const getFooter = async (req, res) => {
  try {
    const siteMeta = await SiteMeta.findOne({}, { footer: 1 }).sort({
      createdAt: -1,
    });

    if (!siteMeta || !siteMeta.footer) {
      return res
        .status(200)
        .json({ message: "No footer data found", footer: {} });
    }

    res.status(200).json({
      message: "Footer fetched successfully",
      footer: siteMeta.footer,
    });
  } catch (error) {
    console.error("Error fetching footer:", error);
    res.status(500).json({
      error: "Failed to fetch footer",
      details: error.message,
    });
  }
};

/**
 * @desc    Save or update footer data
 * @route   PUT /api/footer
 * @access  Admin
 */
export const saveFooter = async (req, res) => {
  try {
    const updatedMeta = await SiteMeta.findOneAndUpdate(
      {},
      { footer: req.body },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "Footer saved successfully",
      footer: updatedMeta.footer,
    });
  } catch (error) {
    console.error("Error saving footer:", error);
    res.status(400).json({
      error: "Failed to save footer",
      details: error.message,
    });
  }
};
