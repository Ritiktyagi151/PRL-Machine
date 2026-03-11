const DEFAULT_SITE_URL = "https://paridaredlion.com";

const normalizeSlug = (value = "/") => {
  if (!value) return "/";
  const clean = String(value).trim();
  if (!clean) return "/";
  const withLeadingSlash = clean.startsWith("/") ? clean : `/${clean}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");
  const withoutTrailingSlash =
    collapsed.length > 1 ? collapsed.replace(/\/+$/, "") : collapsed;
  return withoutTrailingSlash.toLowerCase();
};

const ensureAbsoluteUrl = (value = "", siteUrl = DEFAULT_SITE_URL) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedSiteUrl = String(siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
  const normalizedValue = value.startsWith("/") ? value : `/${value}`;
  return `${normalizedSiteUrl}${normalizedValue}`;
};

const keywordListToString = (keywords = []) =>
  Array.isArray(keywords)
    ? keywords.filter(Boolean).join(", ")
    : String(keywords || "");

const normalizeMetaTags = (tags = []) =>
  Array.isArray(tags)
    ? tags.filter((tag) => tag && (tag.name || tag.property || tag.httpEquiv || tag.charset))
    : [];

const normalizeLinkTags = (tags = [], siteUrl = DEFAULT_SITE_URL) =>
  Array.isArray(tags)
    ? tags
        .filter((tag) => tag && tag.rel && tag.href)
        .map((tag) => ({
          ...tag,
          href: ensureAbsoluteUrl(tag.href, siteUrl),
        }))
    : [];

const truncate = (value = "", limit = 160) =>
  String(value || "").trim().slice(0, limit);

const computeSeoStatus = (page) => {
  const hasTitle = Boolean(page.metaTitle);
  const hasDescription = Boolean(page.metaDescription);

  if (hasTitle && hasDescription) return "complete";
  if (hasTitle || hasDescription) return "incomplete";
  return "missing";
};

const scorePage = (page) => {
  let score = 0;
  if (page.metaTitle) score += 25;
  if (page.metaDescription) score += 25;
  if (page.canonicalUrl) score += 10;
  if (page.ogTitle || page.ogDescription || page.ogImage) score += 15;
  if (page.twitterTitle || page.twitterDescription || page.twitterImage) score += 10;
  if (page.schemaJson) score += 10;
  if (page.robots) score += 5;
  if (page.additionalMetaTags?.length) score += 5;
  if (page.additionalLinkTags?.length) score += 5;
  return Math.min(score, 100);
};

const buildDefaultSchema = (page, siteSettings) => {
  const siteName = siteSettings.websiteName || "Parida Red Lion";
  const siteUrl = siteSettings.siteUrl || DEFAULT_SITE_URL;
  const canonicalUrl = ensureAbsoluteUrl(
    page.canonicalUrl || page.slug,
    siteUrl,
  );
  const description = truncate(
    page.metaDescription || siteSettings.defaultMetaDescription,
    160,
  );

  switch (page.schemaType) {
    case "Article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: page.metaTitle || page.pageName,
        description,
        mainEntityOfPage: canonicalUrl,
      };
    case "Product":
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: page.metaTitle || page.pageName,
        description,
        image: page.ogImage ? [ensureAbsoluteUrl(page.ogImage, siteUrl)] : [],
      };
    case "BreadcrumbList":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.pageName,
            item: canonicalUrl,
          },
        ],
      };
    case "FAQPage":
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [],
      };
    case "LocalBusiness":
      return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: siteName,
        url: siteUrl,
      };
    case "Organization":
    default:
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
        logo: ensureAbsoluteUrl(
          siteSettings.defaultOgImage || "/assets/logo/parida-red-new-logo.jpg",
          siteUrl,
        ),
      };
  }
};

const parseSchemaJson = (page, settings) => {
  if (page.schemaJson) {
    try {
      return JSON.parse(page.schemaJson);
    } catch (error) {
      return buildDefaultSchema(page, settings);
    }
  }

  return buildDefaultSchema(page, settings);
};

const buildResolvedSeo = (page, settings = {}) => {
  const siteUrl = settings.siteUrl || DEFAULT_SITE_URL;
  const titleTemplate = settings.metaTitleFormat || "{Page Title} | {Site Name}";
  const rawTitle = page.metaTitle || page.pageName;
  const resolvedTitle = titleTemplate
    .replace("{Page Title}", rawTitle || "")
    .replace("{Site Name}", settings.websiteName || "Parida Red Lion")
    .trim();
  const description = truncate(
    page.metaDescription || settings.defaultMetaDescription,
    160,
  );
  const canonicalUrl = ensureAbsoluteUrl(
    page.canonicalUrl || page.slug,
    siteUrl,
  );
  const keywords = keywordListToString(page.metaKeywords || settings.defaultMetaKeywords);

  return {
    title: resolvedTitle,
    description,
    keywords,
    canonicalUrl,
    canonicalPath: normalizeSlug(page.slug),
    robots: page.robots || settings.defaultRobots || "index,follow",
    author: page.metaAuthor || settings.defaultMetaAuthor || "",
    publisher: page.metaPublisher || settings.defaultMetaPublisher || "",
    language: page.metaLanguage || settings.defaultMetaLanguage || "",
    revisitAfter: page.metaRevisitAfter || "",
    subject: page.metaSubject || "",
    classification: page.metaClassification || "",
    coverage: page.metaCoverage || "",
    distribution: page.metaDistribution || "",
    rating: page.metaRating || "",
    referrerPolicy: page.referrerPolicy || "",
    themeColor: page.themeColor || settings.defaultThemeColor || "",
    ogTitle: page.ogTitle || resolvedTitle,
    ogDescription: page.ogDescription || description,
    ogImage: ensureAbsoluteUrl(page.ogImage || settings.defaultOgImage, siteUrl),
    ogType: page.ogType || "website",
    ogUrl: ensureAbsoluteUrl(page.ogUrl || canonicalUrl, siteUrl),
    ogSiteName:
      page.ogSiteName || settings.defaultOgSiteName || settings.websiteName || "Parida Red Lion",
    ogLocale: page.ogLocale || settings.defaultOgLocale || "",
    twitterCard: page.twitterCard || "summary_large_image",
    twitterTitle: page.twitterTitle || resolvedTitle,
    twitterDescription: page.twitterDescription || description,
    twitterImage: ensureAbsoluteUrl(
      page.twitterImage || page.ogImage || settings.defaultOgImage,
      siteUrl,
    ),
    twitterSite: page.twitterSite || settings.defaultTwitterSite || "",
    twitterCreator: page.twitterCreator || settings.defaultTwitterCreator || "",
    schemaType: page.schemaType,
    jsonLd: parseSchemaJson(page, settings),
    customHeadCode: page.customHeadCode || "",
    hreflangs: page.hreflangs || [],
    additionalMetaTags: normalizeMetaTags(page.additionalMetaTags),
    additionalLinkTags: normalizeLinkTags(page.additionalLinkTags, siteUrl),
    faviconUrl: ensureAbsoluteUrl(settings.faviconUrl, siteUrl),
    appleTouchIconUrl: ensureAbsoluteUrl(settings.appleTouchIconUrl, siteUrl),
    manifestUrl: ensureAbsoluteUrl(settings.manifestUrl, siteUrl),
    analytics: {
      googleAnalyticsId: settings.googleAnalyticsId || "",
      googleSearchConsoleCode: settings.googleSearchConsoleCode || "",
      bingWebmasterCode: settings.bingWebmasterCode || "",
      yandexVerificationCode: settings.yandexVerificationCode || "",
      pinterestVerificationCode: settings.pinterestVerificationCode || "",
      baiduVerificationCode: settings.baiduVerificationCode || "",
      facebookPixelId: settings.facebookPixelId || "",
    },
    pageName: page.pageName,
    slug: normalizeSlug(page.slug),
    status: computeSeoStatus(page),
    score: scorePage(page),
    isIndexed: page.isIndexed,
  };
};

const generateSitemapXml = (pages = [], settings = {}) => {
  const siteUrl = (settings.siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
  const entries = pages
    .filter((page) => page.includeInSitemap !== false && page.isIndexed !== false)
    .map((page) => {
      const loc = ensureAbsoluteUrl(page.canonicalUrl || page.slug, siteUrl);
      const priority = Number(page.sitemapPriority || 0.5).toFixed(1);
      const changefreq = page.sitemapChangefreq || "weekly";
      const lastmod = new Date(page.updatedAt || page.createdAt || Date.now())
        .toISOString()
        .split("T")[0];

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
};

const buildRobotsTxt = (settings = {}) => {
  const siteUrl = (settings.siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
  return String(
    settings.robotsTxt || "User-agent: *\nAllow: /\nSitemap: {SITE_URL}/sitemap.xml",
  ).replace(/\{SITE_URL\}/g, siteUrl);
};

module.exports = {
  normalizeSlug,
  ensureAbsoluteUrl,
  computeSeoStatus,
  scorePage,
  buildResolvedSeo,
  generateSitemapXml,
  buildRobotsTxt,
};
