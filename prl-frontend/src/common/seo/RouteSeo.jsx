import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "./Seo";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.prlmachine.com").replace(/\/+$/, "");

const toAbsoluteCanonicalUrl = (canonicalUrl, pathname = "/") => {
  const value = canonicalUrl || pathname || "/";
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

const buildFallbackSeoPayload = (pathname) => ({
  title: "Parida Red Lion",
  description: "",
  keywords: [],
  robots: "index,follow",
  canonicalPath: pathname,
});

const RouteSeo = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const currentPath = location.pathname || "/";

    const loadSeo = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/seo/meta?path=${encodeURIComponent(currentPath)}`,
        );
        const seoPayload = response.ok
          ? await response.json()
          : buildFallbackSeoPayload(currentPath);

        if (!isMounted) return;
        setSeoData(seoPayload);
      } catch {
        if (!isMounted) return;
        setSeoData(buildFallbackSeoPayload(currentPath));
      }
    };

    loadSeo();
    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!seoData) return undefined;

    const canonicalHref = toAbsoluteCanonicalUrl(
      seoData.canonicalUrl,
      seoData.canonicalPath || location.pathname,
    );
    let canonicalTag = document.querySelector('link[rel="canonical"]');

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", canonicalHref);

    return undefined;
  }, [location.pathname, seoData]);

  if (!seoData) return null;

  return (
    <Seo
      {...seoData}
      canonicalUrl={toAbsoluteCanonicalUrl(seoData.canonicalUrl, location.pathname)}
      canonicalPath={location.pathname}
    />
  );
};

export default RouteSeo;
