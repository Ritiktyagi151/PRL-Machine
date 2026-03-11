import React, { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";

const FALLBACK_SITE_URL = "https://paridaredlion.com";

const getSiteUrl = () => {
  const envUrl = import.meta.env.VITE_SITE_URL;
  if (envUrl) return envUrl;
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return FALLBACK_SITE_URL;
};

const toAbsoluteUrl = (value, siteUrl) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return `${siteUrl}${value}`;
  return `${siteUrl}/${value}`;
};

const stripHtml = (value = "") => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const normalizeKeywords = (keywords) => {
  if (Array.isArray(keywords)) return keywords.filter(Boolean);
  if (!keywords) return [];
  return String(keywords)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseJsonLd = (schemaJson) => {
  if (!schemaJson) return "";
  if (typeof schemaJson === "string") return schemaJson;
  return JSON.stringify(schemaJson);
};

const Seo = ({
  title,
  description,
  keywords = [],
  author,
  publisher,
  language,
  robots,
  canonicalPath = "/",
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogType,
  ogUrl,
  ogSiteName,
  ogLocale,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterSite,
  twitterCreator,
  themeColor,
  schemaJson,
  jsonLd,
  additionalMetaTags = [],
  additionalLinkTags = [],
  customHeadCode,
  hreflangs = [],
  faviconUrl,
  appleTouchIconUrl,
  manifestUrl,
  analytics = {},
}) => {
  const siteUrl = getSiteUrl().replace(/\/+$/, "");
  const resolvedTitle = title || "Parida Red Lion";
  const resolvedDescription = stripHtml(description || "").slice(0, 160);
  const resolvedKeywords = normalizeKeywords(keywords).join(", ");
  const resolvedCanonicalUrl =
    canonicalUrl || toAbsoluteUrl(canonicalPath || "/", siteUrl) || `${siteUrl}/`;
  const resolvedOgImage = toAbsoluteUrl(ogImage || "", siteUrl);
  const resolvedTwitterImage = toAbsoluteUrl(twitterImage || ogImage || "", siteUrl);
  const resolvedOgUrl = ogUrl || resolvedCanonicalUrl;
  const resolvedJsonLd = useMemo(
    () => parseJsonLd(schemaJson || jsonLd),
    [jsonLd, schemaJson],
  );

  useEffect(() => {
    const insertedNodes = [];

    if (customHeadCode) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = customHeadCode;
      Array.from(wrapper.children).forEach((node) => {
        const clonedNode = node.cloneNode(true);
        clonedNode.setAttribute("data-seo-custom-head", "true");
        document.head.appendChild(clonedNode);
        insertedNodes.push(clonedNode);
      });
    }

    if (analytics?.googleAnalyticsId) {
      const loaderScript = document.createElement("script");
      loaderScript.async = true;
      loaderScript.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalyticsId}`;
      loaderScript.setAttribute("data-seo-analytics", "ga");
      document.head.appendChild(loaderScript);
      insertedNodes.push(loaderScript);

      const inlineScript = document.createElement("script");
      inlineScript.setAttribute("data-seo-analytics", "ga-inline");
      inlineScript.text = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${analytics.googleAnalyticsId}');`;
      document.head.appendChild(inlineScript);
      insertedNodes.push(inlineScript);
    }

    if (analytics?.facebookPixelId) {
      const pixelScript = document.createElement("script");
      pixelScript.setAttribute("data-seo-analytics", "fb-pixel");
      pixelScript.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '${analytics.facebookPixelId}'); fbq('track', 'PageView');`;
      document.head.appendChild(pixelScript);
      insertedNodes.push(pixelScript);
    }

    return () => {
      insertedNodes.forEach((node) => node.remove());
    };
  }, [analytics?.facebookPixelId, analytics?.googleAnalyticsId, customHeadCode]);

  return (
    <Helmet prioritizeSeoTags>
      <title>{resolvedTitle}</title>
      <html lang={language || "en"} />
      <link rel="canonical" href={resolvedCanonicalUrl} />
      {faviconUrl ? <link rel="icon" href={toAbsoluteUrl(faviconUrl, siteUrl)} /> : null}
      {appleTouchIconUrl ? (
        <link rel="apple-touch-icon" href={toAbsoluteUrl(appleTouchIconUrl, siteUrl)} />
      ) : null}
      {manifestUrl ? <link rel="manifest" href={toAbsoluteUrl(manifestUrl, siteUrl)} /> : null}
      {hreflangs.map((item, index) =>
        item?.locale && item?.url ? (
          <link
            key={`hreflang-${item.locale}-${index}`}
            rel="alternate"
            hrefLang={item.locale}
            href={toAbsoluteUrl(item.url, siteUrl)}
          />
        ) : null,
      )}
      {additionalLinkTags.map((item, index) =>
        item?.rel && item?.href ? (
          <link
            key={`extra-link-${item.rel}-${index}`}
            rel={item.rel}
            href={toAbsoluteUrl(item.href, siteUrl)}
            hrefLang={item.hrefLang || undefined}
            media={item.media || undefined}
            type={item.type || undefined}
            title={item.title || undefined}
            sizes={item.sizes || undefined}
          />
        ) : null,
      )}

      {resolvedDescription ? <meta name="description" content={resolvedDescription} /> : null}
      {resolvedKeywords ? <meta name="keywords" content={resolvedKeywords} /> : null}
      {author ? <meta name="author" content={author} /> : null}
      {publisher ? <meta name="publisher" content={publisher} /> : null}
      {robots ? <meta name="robots" content={robots} /> : null}
      {themeColor ? <meta name="theme-color" content={themeColor} /> : null}
      {analytics?.googleSearchConsoleCode ? (
        <meta name="google-site-verification" content={analytics.googleSearchConsoleCode} />
      ) : null}
      {analytics?.bingWebmasterCode ? (
        <meta name="msvalidate.01" content={analytics.bingWebmasterCode} />
      ) : null}
      {analytics?.yandexVerificationCode ? (
        <meta name="yandex-verification" content={analytics.yandexVerificationCode} />
      ) : null}
      {analytics?.pinterestVerificationCode ? (
        <meta name="p:domain_verify" content={analytics.pinterestVerificationCode} />
      ) : null}
      {analytics?.baiduVerificationCode ? (
        <meta name="baidu-site-verification" content={analytics.baiduVerificationCode} />
      ) : null}

      <meta property="og:title" content={ogTitle || resolvedTitle} />
      {resolvedDescription || ogDescription ? (
        <meta property="og:description" content={ogDescription || resolvedDescription} />
      ) : null}
      {resolvedOgImage ? <meta property="og:image" content={resolvedOgImage} /> : null}
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:url" content={resolvedOgUrl} />
      <meta property="og:site_name" content={ogSiteName || "Parida Red Lion"} />
      {ogLocale ? <meta property="og:locale" content={ogLocale} /> : null}

      <meta name="twitter:card" content={twitterCard || "summary_large_image"} />
      <meta name="twitter:title" content={twitterTitle || resolvedTitle} />
      {resolvedDescription || twitterDescription ? (
        <meta name="twitter:description" content={twitterDescription || resolvedDescription} />
      ) : null}
      {resolvedTwitterImage ? <meta name="twitter:image" content={resolvedTwitterImage} /> : null}
      {twitterSite ? <meta name="twitter:site" content={twitterSite} /> : null}
      {twitterCreator ? <meta name="twitter:creator" content={twitterCreator} /> : null}

      {additionalMetaTags.map((item, index) => {
        if (!item?.name && !item?.property && !item?.httpEquiv && !item?.charset) {
          return null;
        }
        return (
          <meta
            key={`extra-meta-${item.name || item.property || item.httpEquiv || item.charset}-${index}`}
            name={item.name || undefined}
            property={item.property || undefined}
            httpEquiv={item.httpEquiv || undefined}
            charSet={item.charset || undefined}
            content={item.content || undefined}
          />
        );
      })}

      {resolvedJsonLd ? (
        <script type="application/ld+json">{resolvedJsonLd}</script>
      ) : null}
    </Helmet>
  );
};

export default Seo;
