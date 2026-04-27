const SeoPage = require("../models/SeoPage");
const SeoSettings = require("../models/SeoSettings");
const SeoRedirect = require("../models/SeoRedirect");
const {
  normalizeSlug,
  computeSeoStatus,
  scorePage,
  buildResolvedSeo,
  generateSitemapXml,
  buildRobotsTxt,
} = require("../utils/seoHelpers");

const escapeRegex = (value = "") =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const slugRegex = (value = "/") => {
  const normalized = normalizeSlug(value);
  return new RegExp(`^${escapeRegex(normalized)}$`, "i");
};

const getSeoLookupCandidates = (value = "/") => {
  const normalized = normalizeSlug(value);
  const candidates = [normalized];

  const blogDetailMatch = normalized.match(/^\/blogs\/(.+)$/i);
  if (blogDetailMatch?.[1]) {
    candidates.push(`/${blogDetailMatch[1]}`);
  }

  if (
    normalized !== "/" &&
    !normalized.startsWith("/blogs/") &&
    !normalized.startsWith("/our-company/")
  ) {
    candidates.push(`/blogs${normalized}`);
  }

  if (normalized === "/our-company/blogs") {
    candidates.push("/blogs");
  }

  if (normalized === "/blogs") {
    candidates.push("/our-company/blogs");
  }

  return [...new Set(candidates)];
};

const getSettingsDocument = async () => {
  let settings = await SeoSettings.findOne();
  if (!settings) {
    settings = await SeoSettings.create({});
  }
  return settings;
};

const sanitizePagePayload = (body = {}) => ({
  pageName: body.pageName,
  slug: normalizeSlug(body.slug),
  metaTitle: body.metaTitle || "",
  metaDescription: body.metaDescription || "",
  metaKeywords: Array.isArray(body.metaKeywords)
    ? body.metaKeywords
    : String(body.metaKeywords || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
  metaAuthor: body.metaAuthor || "",
  metaPublisher: body.metaPublisher || "",
  metaLanguage: body.metaLanguage || "",
  metaRevisitAfter: body.metaRevisitAfter || "",
  metaSubject: body.metaSubject || "",
  metaClassification: body.metaClassification || "",
  metaCoverage: body.metaCoverage || "",
  metaDistribution: body.metaDistribution || "",
  metaRating: body.metaRating || "",
  referrerPolicy: body.referrerPolicy || "",
  themeColor: body.themeColor || "",
  canonicalUrl: body.canonicalUrl || "",
  robots: body.robots || "index,follow",
  ogTitle: body.ogTitle || "",
  ogDescription: body.ogDescription || "",
  ogImage: body.ogImage || "",
  ogType: body.ogType || "website",
  ogUrl: body.ogUrl || "",
  ogSiteName: body.ogSiteName || "",
  ogLocale: body.ogLocale || "",
  twitterCard: body.twitterCard || "summary_large_image",
  twitterTitle: body.twitterTitle || "",
  twitterDescription: body.twitterDescription || "",
  twitterImage: body.twitterImage || "",
  twitterSite: body.twitterSite || "",
  twitterCreator: body.twitterCreator || "",
  schemaType: body.schemaType || "Organization",
  schemaJson: body.schemaJson || "",
  customHeadCode: body.customHeadCode || "",
  hreflangs: Array.isArray(body.hreflangs) ? body.hreflangs : [],
  additionalMetaTags: Array.isArray(body.additionalMetaTags)
    ? body.additionalMetaTags
    : [],
  additionalLinkTags: Array.isArray(body.additionalLinkTags)
    ? body.additionalLinkTags
    : [],
  sitemapPriority: Number(body.sitemapPriority || 0.5),
  sitemapChangefreq: body.sitemapChangefreq || "weekly",
  includeInSitemap: body.includeInSitemap !== false,
  isIndexed: body.isIndexed !== false,
  customUrl: body.customUrl || "",
  notes: body.notes || "",
});

const enrichPage = (page) => {
  const item = page.toObject ? page.toObject() : page;
  return {
    ...item,
    slug: normalizeSlug(item.slug),
    status: computeSeoStatus(item),
    score: scorePage(item),
    titleLength: item.metaTitle ? item.metaTitle.length : 0,
    descriptionLength: item.metaDescription ? item.metaDescription.length : 0,
  };
};

const getDashboard = async (req, res) => {
  const pages = await SeoPage.find().sort({ updatedAt: -1 });
  const enriched = pages.map(enrichPage);
  const missingTitle = enriched.filter((page) => !page.metaTitle).length;
  const missingDescription = enriched.filter((page) => !page.metaDescription).length;
  const duplicateTitleMap = new Map();
  const duplicateDescriptionMap = new Map();

  enriched.forEach((page) => {
    if (page.metaTitle) {
      duplicateTitleMap.set(page.metaTitle, (duplicateTitleMap.get(page.metaTitle) || 0) + 1);
    }
    if (page.metaDescription) {
      duplicateDescriptionMap.set(
        page.metaDescription,
        (duplicateDescriptionMap.get(page.metaDescription) || 0) + 1,
      );
    }
  });

  const duplicateWarnings = enriched.filter(
    (page) =>
      (page.metaTitle && duplicateTitleMap.get(page.metaTitle) > 1) ||
      (page.metaDescription && duplicateDescriptionMap.get(page.metaDescription) > 1),
  ).length;

  const healthScore = enriched.length
    ? Math.round(enriched.reduce((total, page) => total + page.score, 0) / enriched.length)
    : 0;

  res.json({
    totalPages: enriched.length,
    missingTitle,
    missingDescription,
    duplicateWarnings,
    healthScore,
    statusCounts: {
      complete: enriched.filter((page) => page.status === "complete").length,
      incomplete: enriched.filter((page) => page.status === "incomplete").length,
      missing: enriched.filter((page) => page.status === "missing").length,
    },
    recentPages: enriched.slice(0, 5),
  });
};

const listPages = async (req, res) => {
  const { search = "", status = "all" } = req.query;
  const normalizedSearch = String(search).toLowerCase();
  const pages = await SeoPage.find().sort({ updatedAt: -1 });
  const enriched = pages.map(enrichPage).filter((page) => {
    const matchesSearch =
      !normalizedSearch ||
      page.pageName.toLowerCase().includes(normalizedSearch) ||
      page.slug.toLowerCase().includes(normalizedSearch);
    const matchesStatus = status === "all" || page.status === status;
    return matchesSearch && matchesStatus;
  });

  res.json(enriched);
};

const getPageBySlug = async (req, res) => {
  const requestedSlug = decodeURIComponent(req.params.slug || req.params[0] || "/");
  const page = await SeoPage.findOne({ slug: slugRegex(requestedSlug) });
  if (!page) {
    return res.status(404).json({ message: "SEO page not found" });
  }
  res.json(enrichPage(page));
};

const createPage = async (req, res) => {
  const page = await SeoPage.create(sanitizePagePayload(req.body));
  res.status(201).json(enrichPage(page));
};

const updatePage = async (req, res) => {
  const page = await SeoPage.findByIdAndUpdate(
    req.params.id,
    sanitizePagePayload(req.body),
    { new: true, runValidators: true },
  );
  if (!page) {
    return res.status(404).json({ message: "SEO page not found" });
  }
  res.json(enrichPage(page));
};

const deletePage = async (req, res) => {
  const page = await SeoPage.findByIdAndDelete(req.params.id);
  if (!page) {
    return res.status(404).json({ message: "SEO page not found" });
  }
  res.json({ success: true });
};

const getSettings = async (req, res) => {
  const settings = await getSettingsDocument();
  res.json(settings);
};

const updateSettings = async (req, res) => {
  const settings = await getSettingsDocument();
  Object.assign(settings, req.body || {});
  await settings.save();
  res.json(settings);
};

const listRedirects = async (req, res) => {
  const redirects = await SeoRedirect.find().sort({ updatedAt: -1 });
  res.json(redirects);
};

const createRedirect = async (req, res) => {
  const redirect = await SeoRedirect.create({
    fromUrl: normalizeSlug(req.body.fromUrl),
    toUrl: normalizeSlug(req.body.toUrl),
    redirectType: Number(req.body.redirectType || 301),
  });
  res.status(201).json(redirect);
};

const updateRedirect = async (req, res) => {
  const redirect = await SeoRedirect.findByIdAndUpdate(
    req.params.id,
    {
      fromUrl: normalizeSlug(req.body.fromUrl),
      toUrl: normalizeSlug(req.body.toUrl),
      redirectType: Number(req.body.redirectType || 301),
    },
    { new: true, runValidators: true },
  );
  if (!redirect) {
    return res.status(404).json({ message: "Redirect not found" });
  }
  res.json(redirect);
};

const deleteRedirect = async (req, res) => {
  const redirect = await SeoRedirect.findByIdAndDelete(req.params.id);
  if (!redirect) {
    return res.status(404).json({ message: "Redirect not found" });
  }
  res.json({ success: true });
};

const resolveMeta = async (req, res) => {
  const requestedPath = normalizeSlug(req.query.slug || req.query.path || "/");
  const redirect = await SeoRedirect.findOne({ fromUrl: slugRegex(requestedPath) });
  const resolvedPath = redirect ? normalizeSlug(redirect.toUrl) : requestedPath;
  const candidates = getSeoLookupCandidates(resolvedPath);
  let page = null;

  for (const candidate of candidates) {
    // Resolve server-side so dynamic pages and redirects don't depend on brittle client matching.
    page = await SeoPage.findOne({ slug: slugRegex(candidate) });
    if (page) break;
  }

  const settings = await getSettingsDocument();

  if (!page) {
    return res.json(
      buildResolvedSeo(
        { slug: resolvedPath, pageName: settings.websiteName || "Page" },
        settings.toObject(),
      ),
    );
  }

  res.json(buildResolvedSeo(page.toObject(), settings.toObject()));
};

const getSitemapData = async (req, res) => {
  const pages = await SeoPage.find().sort({ slug: 1 });
  const settings = await getSettingsDocument();
  res.json({
    pages: pages.map(enrichPage),
    xml: generateSitemapXml(pages, settings),
  });
};

const serveSitemapXml = async (req, res) => {
  const pages = await SeoPage.find().sort({ slug: 1 });
  const settings = await getSettingsDocument();
  res.type("application/xml").send(generateSitemapXml(pages, settings));
};

const serveRobotsTxt = async (req, res) => {
  const settings = await getSettingsDocument();
  res.type("text/plain").send(buildRobotsTxt(settings));
};

const pingSitemap = async (req, res) => {
  const settings = await getSettingsDocument();
  const siteUrl = (settings.siteUrl || "https://www.prlmachine.com").replace(/\/+$/, "");
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  const pingTargets = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  ];

  const results = await Promise.allSettled(
    pingTargets.map((url) => fetch(url, { method: "GET" })),
  );

  res.json({
    sitemapUrl,
    results: results.map((result, index) => ({
      target: pingTargets[index],
      success: result.status === "fulfilled" && result.value.ok,
    })),
  });
};

const auditPage = async (req, res) => {
  const { url } = req.body || {};
  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  const response = await fetch(url);
  const html = await response.text();
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const descriptionMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i,
  );
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>/gi)];
  const h2Matches = [...html.matchAll(/<h2\b[^>]*>/gi)];
  const images = [...html.matchAll(/<img\b[^>]*>/gi)];
  const imagesMissingAlt = images.filter((match) => !/alt=["'][^"']*["']/i.test(match[0])).length;

  const issues = [];
  const title = titleMatch?.[1]?.trim() || "";
  const description = descriptionMatch?.[1]?.trim() || "";

  if (!title) issues.push("Missing <title> tag");
  if (title && (title.length < 30 || title.length > 60)) {
    issues.push("Title length should be between 30 and 60 characters");
  }
  if (!description) issues.push("Missing meta description");
  if (description && (description.length < 70 || description.length > 160)) {
    issues.push("Meta description length should be between 70 and 160 characters");
  }
  if (h1Matches.length !== 1) {
    issues.push("Page should contain exactly one H1");
  }
  if (!h2Matches.length) {
    issues.push("Page should contain supporting H2 headings");
  }
  if (imagesMissingAlt > 0) {
    issues.push(`${imagesMissingAlt} image(s) are missing alt text`);
  }

  const score = Math.max(0, 100 - issues.length * 12);
  res.json({
    url,
    score,
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    headings: {
      h1: h1Matches.length,
      h2: h2Matches.length,
    },
    images: {
      total: images.length,
      missingAlt: imagesMissingAlt,
    },
    issues,
  });
};

const handleRedirectLookup = async (req, res, next) => {
  if (req.path.startsWith("/api") || req.path === "/sitemap.xml" || req.path === "/robots.txt") {
    return next();
  }

  const redirect = await SeoRedirect.findOne({ fromUrl: slugRegex(req.path) });
  if (!redirect) {
    return next();
  }
  return res.redirect(redirect.redirectType, redirect.toUrl);
};

module.exports = {
  getDashboard,
  listPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  getSettings,
  updateSettings,
  listRedirects,
  createRedirect,
  updateRedirect,
  deleteRedirect,
  resolveMeta,
  getSitemapData,
  serveSitemapXml,
  serveRobotsTxt,
  pingSitemap,
  auditPage,
  handleRedirectLookup,
};
