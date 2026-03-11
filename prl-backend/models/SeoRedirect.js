const mongoose = require("mongoose");

const seoRedirectSchema = new mongoose.Schema(
  {
    fromUrl: { type: String, required: true, unique: true, trim: true },
    toUrl: { type: String, required: true, trim: true },
    redirectType: {
      type: Number,
      enum: [301, 302],
      default: 301,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SeoRedirect", seoRedirectSchema);
