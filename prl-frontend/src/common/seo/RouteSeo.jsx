import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "./Seo";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

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

  if (!seoData) return null;

  return <Seo {...seoData} canonicalPath={location.pathname} />;
};

export default RouteSeo;
