import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "./Seo";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

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

const toKeywordList = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const buildSeoPayload = (pathname, settings = {}, matchedPage = null) => {
  const siteName = settings.websiteName || "Parida Red Lion";
  const pageTitle = matchedPage?.pageName || siteName;
  const titleTemplate = settings.metaTitleFormat || "{Page Title} | {Site Name}";
  const title = titleTemplate
    .replace("{Page Title}", matchedPage?.metaTitle || pageTitle)
    .replace("{Site Name}", siteName)
    .trim();

  return {
    title,
    description: matchedPage?.metaDescription || settings.defaultMetaDescription || "",
    keywords: toKeywordList(matchedPage?.metaKeywords || settings.defaultMetaKeywords),
    author: matchedPage?.metaAuthor || settings.defaultMetaAuthor || "",
    publisher: matchedPage?.metaPublisher || settings.defaultMetaPublisher || "",
    language: matchedPage?.metaLanguage || settings.defaultMetaLanguage || "",
    robots: matchedPage?.robots || settings.defaultRobots || "index,follow",
    canonicalPath: pathname,
    canonicalUrl: matchedPage?.canonicalUrl || "",
    ogTitle: matchedPage?.ogTitle || title,
    ogDescription:
      matchedPage?.ogDescription ||
      matchedPage?.metaDescription ||
      settings.defaultMetaDescription ||
      "",
    ogImage: matchedPage?.ogImage || settings.defaultOgImage || "",
    ogType: matchedPage?.ogType || "website",
    ogUrl: matchedPage?.ogUrl || "",
    ogSiteName: matchedPage?.ogSiteName || settings.defaultOgSiteName || siteName,
    ogLocale: matchedPage?.ogLocale || settings.defaultOgLocale || "",
    twitterCard: matchedPage?.twitterCard || "summary_large_image",
    twitterTitle: matchedPage?.twitterTitle || title,
    twitterDescription:
      matchedPage?.twitterDescription ||
      matchedPage?.metaDescription ||
      settings.defaultMetaDescription ||
      "",
    twitterImage:
      matchedPage?.twitterImage || matchedPage?.ogImage || settings.defaultOgImage || "",
    twitterSite: matchedPage?.twitterSite || settings.defaultTwitterSite || "",
    twitterCreator: matchedPage?.twitterCreator || settings.defaultTwitterCreator || "",
    themeColor: matchedPage?.themeColor || settings.defaultThemeColor || "",
    jsonLd: matchedPage?.schemaJson || "",
    customHeadCode: matchedPage?.customHeadCode || "",
    hreflangs: matchedPage?.hreflangs || [],
    additionalMetaTags: matchedPage?.additionalMetaTags || [],
    additionalLinkTags: matchedPage?.additionalLinkTags || [],
    faviconUrl: settings.faviconUrl || "",
    appleTouchIconUrl: settings.appleTouchIconUrl || "",
    manifestUrl: settings.manifestUrl || "",
    analytics: {
      googleAnalyticsId: settings.googleAnalyticsId || "",
      googleSearchConsoleCode: settings.googleSearchConsoleCode || "",
      bingWebmasterCode: settings.bingWebmasterCode || "",
      yandexVerificationCode: settings.yandexVerificationCode || "",
      pinterestVerificationCode: settings.pinterestVerificationCode || "",
      baiduVerificationCode: settings.baiduVerificationCode || "",
      facebookPixelId: settings.facebookPixelId || "",
    },
  };
};

const RouteSeo = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const currentPath = normalizeSlug(location.pathname);

    const loadSeo = async () => {
      try {
        const [pagesResponse, settingsResponse] = await Promise.all([
          fetch(`${API_BASE}/seo/pages`),
          fetch(`${API_BASE}/seo/settings`),
        ]);

        const pages = pagesResponse.ok ? await pagesResponse.json() : [];
        const settings = settingsResponse.ok ? await settingsResponse.json() : {};
        const matchedPage =
          pages.find((page) => normalizeSlug(page.slug) === currentPath) || null;

        if (!isMounted) return;
        setSeoData(buildSeoPayload(currentPath, settings, matchedPage));
      } catch {
        if (!isMounted) return;
        setSeoData(buildSeoPayload(currentPath));
      }
    };

    loadSeo();
    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (!seoData) return null;

  return <Seo {...seoData} canonicalPath={location.pathname} />;
};

export default RouteSeo;
