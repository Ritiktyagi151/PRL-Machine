const mongoose = require("mongoose");

const hreflangSchema = new mongoose.Schema(
  {
    locale: { type: String, trim: true },
    url: { type: String, trim: true },
  },
  { _id: false },
);

const metaTagSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "" },
    property: { type: String, trim: true, default: "" },
    httpEquiv: { type: String, trim: true, default: "" },
    charset: { type: String, trim: true, default: "" },
    content: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const linkTagSchema = new mongoose.Schema(
  {
    rel: { type: String, trim: true, default: "alternate" },
    href: { type: String, trim: true, default: "" },
    hrefLang: { type: String, trim: true, default: "" },
    media: { type: String, trim: true, default: "" },
    type: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    sizes: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const seoPageSchema = new mongoose.Schema(
  {
    pageName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: [{ type: String, trim: true }],
    metaAuthor: { type: String, trim: true, default: "" },
    metaPublisher: { type: String, trim: true, default: "" },
    metaLanguage: { type: String, trim: true, default: "" },
    metaRevisitAfter: { type: String, trim: true, default: "" },
    metaSubject: { type: String, trim: true, default: "" },
    metaClassification: { type: String, trim: true, default: "" },
    metaCoverage: { type: String, trim: true, default: "" },
    metaDistribution: { type: String, trim: true, default: "" },
    metaRating: { type: String, trim: true, default: "" },
    referrerPolicy: { type: String, trim: true, default: "" },
    themeColor: { type: String, trim: true, default: "" },
    canonicalUrl: { type: String, trim: true },
    robots: {
      type: String,
      enum: ["index,follow", "noindex,nofollow", "noindex,follow", "index,nofollow"],
      default: "index,follow",
    },
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    ogType: {
      type: String,
      enum: ["website", "article", "product"],
      default: "website",
    },
    ogUrl: { type: String, trim: true },
    ogSiteName: { type: String, trim: true, default: "" },
    ogLocale: { type: String, trim: true, default: "" },
    twitterCard: {
      type: String,
      enum: ["summary", "summary_large_image"],
      default: "summary_large_image",
    },
    twitterTitle: { type: String, trim: true },
    twitterDescription: { type: String, trim: true },
    twitterImage: { type: String, trim: true },
    twitterSite: { type: String, trim: true, default: "" },
    twitterCreator: { type: String, trim: true, default: "" },
    schemaType: {
      type: String,
      enum: [
        "Organization",
        "Article",
        "Product",
        "BreadcrumbList",
        "FAQPage",
        "LocalBusiness",
      ],
      default: "Organization",
    },
    schemaJson: { type: String, default: "" },
    customHeadCode: { type: String, default: "" },
    hreflangs: { type: [hreflangSchema], default: [] },
    additionalMetaTags: { type: [metaTagSchema], default: [] },
    additionalLinkTags: { type: [linkTagSchema], default: [] },
    sitemapPriority: { type: Number, min: 0.1, max: 1, default: 0.5 },
    sitemapChangefreq: {
      type: String,
      enum: ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"],
      default: "weekly",
    },
    includeInSitemap: { type: Boolean, default: true },
    isIndexed: { type: Boolean, default: true },
    customUrl: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SeoPage", seoPageSchema);
