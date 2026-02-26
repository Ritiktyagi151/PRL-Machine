import React from "react";
import { Link as HeadLink, Meta, Title } from "react-head";

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
  if (!value) return `${siteUrl}/`;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return `${siteUrl}${value}`;
  return `${siteUrl}/${value}`;
};

const stripHtml = (value = "") => value.replace(/<[^>]*>/g, " ").trim();

const Seo = ({
  title,
  description,
  keywords = [],
  canonicalPath = "/",
  image = "/assets/logo/parida-red-new-logo.jpg",
  type = "website",
  noindex = false,
  jsonLd,
}) => {
  const siteUrl = getSiteUrl().replace(/\/+$/, "");
  const canonicalUrl = toAbsoluteUrl(canonicalPath, siteUrl);
  const imageUrl = toAbsoluteUrl(image, siteUrl);
  const cleanDescription = stripHtml(description).slice(0, 160);
  const keywordsString = Array.isArray(keywords)
    ? keywords.filter(Boolean).join(", ")
    : String(keywords || "");

  return (
    <>
      <Title>{title}</Title>
      <HeadLink rel="canonical" href={canonicalUrl} />

      <Meta name="description" content={cleanDescription} />
      {keywordsString ? <Meta name="keywords" content={keywordsString} /> : null}
      <Meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />

      <Meta property="og:type" content={type} />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={cleanDescription} />
      <Meta property="og:url" content={canonicalUrl} />
      <Meta property="og:image" content={imageUrl} />
      <Meta property="og:site_name" content="Parida Red Lion" />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={cleanDescription} />
      <Meta name="twitter:image" content={imageUrl} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </>
  );
};

export default Seo;
