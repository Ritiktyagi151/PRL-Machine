const mongoose = require("mongoose");

const seoSettingsSchema = new mongoose.Schema(
  {
    websiteName: { type: String, default: "Parida Red Lion" },
    metaTitleFormat: { type: String, default: "{Page Title} | {Site Name}" },
    defaultMetaDescription: { type: String, default: "" },
    defaultMetaKeywords: { type: String, default: "" },
    defaultMetaAuthor: { type: String, default: "" },
    defaultMetaPublisher: { type: String, default: "" },
    defaultMetaLanguage: { type: String, default: "en" },
    defaultRobots: { type: String, default: "index,follow" },
    defaultThemeColor: { type: String, default: "" },
    defaultOgImage: { type: String, default: "" },
    defaultOgSiteName: { type: String, default: "Parida Red Lion" },
    defaultOgLocale: { type: String, default: "en_IN" },
    defaultTwitterSite: { type: String, default: "" },
    defaultTwitterCreator: { type: String, default: "" },
    faviconUrl: { type: String, default: "" },
    appleTouchIconUrl: { type: String, default: "" },
    manifestUrl: { type: String, default: "" },
    googleAnalyticsId: { type: String, default: "" },
    googleSearchConsoleCode: { type: String, default: "" },
    bingWebmasterCode: { type: String, default: "" },
    yandexVerificationCode: { type: String, default: "" },
    pinterestVerificationCode: { type: String, default: "" },
    baiduVerificationCode: { type: String, default: "" },
    facebookPixelId: { type: String, default: "" },
    robotsTxt: {
      type: String,
      default: "User-agent: *\nAllow: /\nSitemap: {SITE_URL}/sitemap.xml",
    },
    htaccessRedirects: { type: String, default: "" },
    siteUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SeoSettings", seoSettingsSchema);
