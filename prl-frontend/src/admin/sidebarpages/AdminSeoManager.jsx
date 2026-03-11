import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Globe,
  Link2,
  Loader2,
  Monitor,
  Moon,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Share2,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Sun,
  Trash2,
  WandSparkles,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";
const DRAFT_STORAGE_KEY = "seo_admin_draft_v1";

const emptyPageDraft = {
  id: null,
  pageName: "",
  slug: "/",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  metaAuthor: "",
  metaPublisher: "",
  metaLanguage: "en",
  metaRevisitAfter: "",
  metaSubject: "",
  metaClassification: "",
  metaCoverage: "",
  metaDistribution: "",
  metaRating: "",
  referrerPolicy: "",
  themeColor: "",
  canonicalUrl: "",
  robots: "index,follow",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "website",
  ogUrl: "",
  ogSiteName: "",
  ogLocale: "en_IN",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  twitterSite: "",
  twitterCreator: "",
  schemaType: "Organization",
  schemaJson: "",
  customHeadCode: "",
  hreflangs: [{ locale: "en", url: "" }],
  additionalMetaTags: [{ name: "", property: "", httpEquiv: "", charset: "", content: "" }],
  additionalLinkTags: [{ rel: "alternate", href: "", hrefLang: "", media: "", type: "", title: "", sizes: "" }],
  sitemapPriority: 0.5,
  sitemapChangefreq: "weekly",
  includeInSitemap: true,
  isIndexed: true,
  notes: "",
};

const emptyRedirectDraft = {
  id: null,
  fromUrl: "",
  toUrl: "",
  redirectType: 301,
};

const tabs = [
  { id: "dashboard", label: "SEO Dashboard", icon: Sparkles },
  { id: "pages", label: "Pages Manager", icon: Globe },
  { id: "editor", label: "SEO Editor", icon: Pencil },
  { id: "settings", label: "Global Settings", icon: Settings },
  { id: "sitemap", label: "Sitemap", icon: Link2 },
  { id: "redirects", label: "Redirects", icon: ArrowUpRight },
  { id: "audit", label: "SEO Audit", icon: ShieldAlert },
];

const normalizeSlug = (value = "/") => {
  if (!value) return "/";
  const clean = String(value).trim();
  if (!clean) return "/";
  return clean.startsWith("/") ? clean : `/${clean}`;
};

const generateSchemaTemplate = (draft, websiteName = "Parida Red Lion") => {
  const canonicalUrl = draft.canonicalUrl || `${SITE_URL}${normalizeSlug(draft.slug)}`;
  const title = draft.metaTitle || draft.pageName;
  const description = draft.metaDescription;

  const templates = {
    Organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: websiteName,
      url: SITE_URL,
      logo: draft.ogImage || "",
    },
    Article: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      mainEntityOfPage: canonicalUrl,
    },
    Product: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: title,
      description,
      image: draft.ogImage ? [draft.ogImage] : [],
    },
    BreadcrumbList: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: draft.pageName || "Page", item: canonicalUrl },
      ],
    },
    FAQPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [],
    },
    LocalBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: websiteName,
      url: SITE_URL,
      image: draft.ogImage || "",
    },
  };

  return JSON.stringify(
    templates[draft.schemaType] || templates.Organization,
    null,
    2,
  );
};

const statusBadge = (status) => {
  if (status === "complete") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (status === "incomplete") return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-rose-100 text-rose-700 border-rose-200";
};

const charTone = (length, min, max) => {
  if (!length) return "text-gray-400";
  if (length >= min && length <= max) return "text-emerald-500";
  return "text-amber-500";
};

const normalizeMetaTagList = (tags = []) =>
  Array.isArray(tags) && tags.length
    ? tags
    : [{ name: "", property: "", httpEquiv: "", charset: "", content: "" }];

const normalizeLinkTagList = (tags = []) =>
  Array.isArray(tags) && tags.length
    ? tags
    : [{ rel: "alternate", href: "", hrefLang: "", media: "", type: "", title: "", sizes: "" }];

const StatCard = ({ title, value, hint, icon: Icon, tone = "blue" }) => {
  const palette = {
    blue: "from-sky-500/20 to-sky-600/5 text-sky-700 border-sky-200",
    rose: "from-rose-500/20 to-rose-600/5 text-rose-700 border-rose-200",
    amber: "from-amber-500/20 to-amber-600/5 text-amber-700 border-amber-200",
    emerald: "from-emerald-500/20 to-emerald-600/5 text-emerald-700 border-emerald-200",
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-5 shadow-sm ${palette[tone]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="mt-3 text-3xl font-bold">{value}</p>
          <p className="mt-2 text-xs opacity-80">{hint}</p>
        </div>
        <div className="rounded-2xl bg-white/70 p-3 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

const PreviewShell = ({ title, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
    </div>
    {children}
  </div>
);

const GooglePreview = ({ draft, settings }) => {
  const title =
    draft.metaTitle ||
    draft.pageName ||
    `${settings.websiteName || "Parida Red Lion"} Page`;
  const description =
    draft.metaDescription || settings.defaultMetaDescription || "Meta description preview";
  const url = `${SITE_URL.replace(/\/+$/, "")}${normalizeSlug(draft.slug)}`;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <PreviewShell title="Google Desktop Preview">
        <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-emerald-700">{url}</div>
          <div className="mt-1 text-xl text-blue-700">{title.slice(0, 60)}</div>
          <div className="mt-2 text-sm text-slate-600">{description.slice(0, 160)}</div>
        </div>
      </PreviewShell>
      <PreviewShell title="Google Mobile Preview">
        <div className="mx-auto max-w-[360px] rounded-[2rem] border border-slate-200 bg-slate-50 p-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-[11px] text-emerald-700">{url}</div>
            <div className="mt-1 text-base leading-tight text-blue-700">{title.slice(0, 55)}</div>
            <div className="mt-2 text-sm text-slate-600">{description.slice(0, 120)}</div>
          </div>
        </div>
      </PreviewShell>
    </div>
  );
};

const SocialPreview = ({ draft, settings }) => {
  const title = draft.ogTitle || draft.twitterTitle || draft.metaTitle || draft.pageName;
  const description =
    draft.ogDescription ||
    draft.twitterDescription ||
    draft.metaDescription ||
    settings.defaultMetaDescription;
  const image =
    draft.ogImage ||
    draft.twitterImage ||
    settings.defaultOgImage ||
    "/assets/logo/parida-red-new-logo.jpg";
  const url = `${SITE_URL.replace(/\/+$/, "")}${normalizeSlug(draft.slug)}`;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <PreviewShell title="Facebook / WhatsApp Preview">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="h-44 bg-slate-100">
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </div>
          <div className="p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">{url}</div>
            <div className="mt-2 text-lg font-semibold text-slate-800">{title}</div>
            <div className="mt-2 text-sm text-slate-600">{description}</div>
          </div>
        </div>
      </PreviewShell>
      <PreviewShell title="Twitter Preview">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="h-44 bg-slate-100">
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </div>
          <div className="p-4">
            <div className="text-base font-semibold text-slate-800">{title}</div>
            <div className="mt-2 text-sm text-slate-600">{description}</div>
            <div className="mt-2 text-xs text-slate-400">{url}</div>
          </div>
        </div>
      </PreviewShell>
    </div>
  );
};

const AdminSeoManager = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("seo_admin_theme") === "dark",
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState({
    websiteName: "Parida Red Lion",
    metaTitleFormat: "{Page Title} | {Site Name}",
    defaultMetaDescription: "",
    defaultMetaKeywords: "",
    defaultMetaAuthor: "",
    defaultMetaPublisher: "",
    defaultMetaLanguage: "en",
    defaultRobots: "index,follow",
    defaultThemeColor: "",
    defaultOgImage: "",
    defaultOgSiteName: "Parida Red Lion",
    defaultOgLocale: "en_IN",
    defaultTwitterSite: "",
    defaultTwitterCreator: "",
    faviconUrl: "",
    appleTouchIconUrl: "",
    manifestUrl: "",
    googleAnalyticsId: "",
    googleSearchConsoleCode: "",
    bingWebmasterCode: "",
    yandexVerificationCode: "",
    pinterestVerificationCode: "",
    baiduVerificationCode: "",
    facebookPixelId: "",
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: {SITE_URL}/sitemap.xml",
    htaccessRedirects: "",
    siteUrl: SITE_URL,
  });
  const [redirects, setRedirects] = useState([]);
  const [sitemapXml, setSitemapXml] = useState("");
  const [draft, setDraft] = useState(() => {
    const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!stored) return emptyPageDraft;
    const parsed = JSON.parse(stored);
    return {
      ...emptyPageDraft,
      ...parsed,
      hreflangs: parsed.hreflangs?.length ? parsed.hreflangs : emptyPageDraft.hreflangs,
      additionalMetaTags: normalizeMetaTagList(parsed.additionalMetaTags),
      additionalLinkTags: normalizeLinkTagList(parsed.additionalLinkTags),
    };
  });
  const [redirectDraft, setRedirectDraft] = useState(emptyRedirectDraft);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [auditUrl, setAuditUrl] = useState("");
  const [auditResult, setAuditResult] = useState(null);
  const [auditLoading, setAuditLoading] = useState(false);
  const userRole = localStorage.getItem("adminRole") || "super_admin";
  const canEdit = userRole === "super_admin" || userRole === "seo_manager";
  const canDelete = userRole === "super_admin";

  const themeClasses = darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900";
  const cardClasses = darkMode
    ? "border-slate-800 bg-slate-900 text-slate-100"
    : "border-slate-200 bg-white text-slate-900";

  const fetchJson = async (url, options = {}) => {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Request failed");
    }
    return response.json();
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [dashboardData, pagesData, settingsData, redirectsData, sitemapData] =
        await Promise.all([
          fetchJson(`${API_BASE}/seo/dashboard`),
          fetchJson(
            `${API_BASE}/seo/pages?status=${statusFilter}&search=${encodeURIComponent(searchTerm)}`,
          ),
          fetchJson(`${API_BASE}/seo/settings`),
          fetchJson(`${API_BASE}/seo/redirects`),
          fetchJson(`${API_BASE}/seo/sitemap`),
        ]);

      setDashboard(dashboardData);
      setPages(pagesData);
      setSettings(settingsData);
      setRedirects(redirectsData);
      setSitemapXml(sitemapData.xml);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        const pagesData = await fetchJson(
          `${API_BASE}/seo/pages?status=${statusFilter}&search=${encodeURIComponent(searchTerm)}`,
        );
        setPages(pagesData);
      } catch (error) {
        toast.error(error.message);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("seo_admin_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }, 500);
    return () => window.clearTimeout(timer);
  }, [draft]);

  const filteredPages = useMemo(() => pages, [pages]);

  const openEditor = (page = null) => {
    if (page) {
      setDraft({
        ...emptyPageDraft,
        ...page,
        metaKeywords: Array.isArray(page.metaKeywords)
          ? page.metaKeywords.join(", ")
          : page.metaKeywords || "",
        hreflangs: page.hreflangs?.length ? page.hreflangs : [{ locale: "en", url: "" }],
        additionalMetaTags: normalizeMetaTagList(page.additionalMetaTags),
        additionalLinkTags: normalizeLinkTagList(page.additionalLinkTags),
      });
    } else {
      setDraft({
        ...emptyPageDraft,
        schemaJson: generateSchemaTemplate(emptyPageDraft, settings.websiteName),
      });
    }
    setActiveTab("editor");
  };

  const handleDraftChange = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleHreflangChange = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      hreflangs: prev.hreflangs.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleMetaTagChange = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      additionalMetaTags: prev.additionalMetaTags.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleLinkTagChange = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      additionalLinkTags: prev.additionalLinkTags.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const savePage = async () => {
    if (!canEdit) return;
    if (!draft.pageName.trim() || !draft.slug.trim()) {
      toast.error("Page name and slug are required.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...draft,
        slug: normalizeSlug(draft.slug),
        hreflangs: draft.hreflangs.filter((item) => item.locale && item.url),
        additionalMetaTags: draft.additionalMetaTags.filter(
          (item) => item.name || item.property || item.httpEquiv || item.charset,
        ),
        additionalLinkTags: draft.additionalLinkTags.filter(
          (item) => item.rel && item.href,
        ),
      };
      const id = draft._id || draft.id;
      const url = id ? `${API_BASE}/seo/pages/${id}` : `${API_BASE}/seo/pages`;
      const method = id ? "PUT" : "POST";

      await fetchJson(url, { method, body: JSON.stringify(payload) });
      toast.success("SEO page saved.");
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      await loadData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const deletePage = async () => {
    if (!deleteTarget || !canDelete) return;
    try {
      await fetchJson(`${API_BASE}/seo/pages/${deleteTarget._id || deleteTarget.id}`, {
        method: "DELETE",
      });
      setDeleteTarget(null);
      toast.success("SEO page deleted.");
      await loadData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const saveSettings = async () => {
    if (!canEdit) return;
    try {
      setSaving(true);
      await fetchJson(`${API_BASE}/seo/settings`, {
        method: "PUT",
        body: JSON.stringify(settings),
      });
      toast.success("Global SEO settings updated.");
      await loadData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const saveRedirect = async () => {
    if (!canEdit) return;
    try {
      const url = redirectDraft.id
        ? `${API_BASE}/seo/redirects/${redirectDraft.id}`
        : `${API_BASE}/seo/redirects`;
      const method = redirectDraft.id ? "PUT" : "POST";
      await fetchJson(url, { method, body: JSON.stringify(redirectDraft) });
      setRedirectDraft(emptyRedirectDraft);
      toast.success("Redirect saved.");
      await loadData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteRedirect = async (id) => {
    if (!canDelete) return;
    try {
      await fetchJson(`${API_BASE}/seo/redirects/${id}`, { method: "DELETE" });
      toast.success("Redirect deleted.");
      await loadData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAudit = async () => {
    if (!auditUrl.trim()) return;
    try {
      setAuditLoading(true);
      const result = await fetchJson(`${API_BASE}/seo/audit`, {
        method: "POST",
        body: JSON.stringify({ url: auditUrl }),
      });
      setAuditResult(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAuditLoading(false);
    }
  };

  const uploadImage = async (file, field) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Upload failed");
      handleDraftChange(field, result.url);
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const downloadSitemap = () => {
    const blob = new Blob([sitemapXml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "sitemap.xml";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const submitSitemap = async () => {
    try {
      const result = await fetchJson(`${API_BASE}/seo/sitemap/ping`, {
        method: "POST",
      });
      const successful = result.results.filter((item) => item.success).length;
      toast.success(`Sitemap submitted. Success ${successful}/${result.results.length}.`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`min-h-screen rounded-3xl p-6 transition-colors ${themeClasses}`}>
      <ToastContainer position="top-right" autoClose={2500} theme={darkMode ? "dark" : "light"} />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 p-3 text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">SEO Management Dashboard</h1>
              <p className="mt-1 text-sm text-slate-400">
                Manage metadata, structured data, sitemap, redirects, and audits.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className={`rounded-2xl border px-4 py-2 text-sm shadow-sm ${cardClasses}`}
          >
            {darkMode ? (
              <span className="flex items-center gap-2"><Sun className="h-4 w-4" /> Light</span>
            ) : (
              <span className="flex items-center gap-2"><Moon className="h-4 w-4" /> Dark</span>
            )}
          </button>
          <button
            type="button"
            onClick={loadData}
            className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg"
          >
            <span className="flex items-center gap-2"><RefreshCw className="h-4 w-4" /> Refresh</span>
          </button>
        </div>
      </div>

      {loading && !dashboard ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className={`rounded-3xl border p-3 shadow-sm ${cardClasses}`}>
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                      active
                        ? "bg-sky-600 text-white shadow-lg"
                        : darkMode
                        ? "text-slate-200 hover:bg-slate-800"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <div className={`mt-6 rounded-2xl border p-4 text-xs ${cardClasses}`}>
              <div className="font-semibold">Role Permissions</div>
              <div className="mt-2 capitalize text-slate-400">{userRole.replace("_", " ")}</div>
              <div className="mt-3 space-y-1 text-slate-400">
                <div>Edit: {canEdit ? "Allowed" : "Read only"}</div>
                <div>Delete: {canDelete ? "Allowed" : "Restricted"}</div>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            {activeTab === "dashboard" && dashboard ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <StatCard
                    title="Total Indexed Pages"
                    value={dashboard.totalPages}
                    hint="Pages currently managed in SEO panel"
                    icon={Globe}
                    tone="blue"
                  />
                  <StatCard
                    title="Missing Meta Titles"
                    value={dashboard.missingTitle}
                    hint="Needs attention to improve CTR"
                    icon={AlertTriangle}
                    tone="amber"
                  />
                  <StatCard
                    title="Duplicate Tag Warnings"
                    value={dashboard.duplicateWarnings}
                    hint="Potential duplication issues"
                    icon={ShieldAlert}
                    tone="rose"
                  />
                  <StatCard
                    title="SEO Health Score"
                    value={`${dashboard.healthScore}/100`}
                    hint="Average metadata completeness score"
                    icon={CheckCircle2}
                    tone="emerald"
                  />
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                  <div className={`rounded-3xl border p-6 shadow-sm ${cardClasses}`}>
                    <h2 className="text-xl font-semibold">Quick Actions</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      Jump directly into the highest-impact SEO tasks.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setStatusFilter("missing");
                          setActiveTab("pages");
                        }}
                        className="rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white"
                      >
                        Fix Missing Tags
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setStatusFilter("all");
                          setActiveTab("pages");
                        }}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${cardClasses}`}
                      >
                        View All Pages
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditor()}
                        className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white"
                      >
                        Add SEO Page
                      </button>
                    </div>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl bg-slate-50 p-4 text-center text-slate-800">
                        <div className="text-3xl font-bold">{dashboard.statusCounts.complete}</div>
                        <div className="mt-1 text-sm">Complete</div>
                      </div>
                      <div className="rounded-2xl bg-amber-50 p-4 text-center text-amber-700">
                        <div className="text-3xl font-bold">{dashboard.statusCounts.incomplete}</div>
                        <div className="mt-1 text-sm">Incomplete</div>
                      </div>
                      <div className="rounded-2xl bg-rose-50 p-4 text-center text-rose-700">
                        <div className="text-3xl font-bold">{dashboard.statusCounts.missing}</div>
                        <div className="mt-1 text-sm">Missing</div>
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-3xl border p-6 shadow-sm ${cardClasses}`}>
                    <h2 className="text-xl font-semibold">Recent SEO Pages</h2>
                    <div className="mt-5 space-y-3">
                      {dashboard.recentPages.map((page) => (
                        <button
                          type="button"
                          key={page._id}
                          onClick={() => openEditor(page)}
                          className={`w-full rounded-2xl border p-4 text-left ${cardClasses}`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="font-semibold">{page.pageName}</div>
                              <div className="mt-1 text-xs text-slate-400">{page.slug}</div>
                            </div>
                            <div className={`rounded-full border px-3 py-1 text-xs ${statusBadge(page.status)}`}>
                              {page.status}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {activeTab === "pages" ? (
              <div className={`rounded-3xl border p-6 shadow-sm ${cardClasses}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">Pages SEO Manager</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      Search, filter, preview, and manage SEO metadata per page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openEditor()}
                    className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white"
                  >
                    <span className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add Page</span>
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px]">
                  <label className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${cardClasses}`}>
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search by page name or URL"
                      className="w-full bg-transparent outline-none"
                    />
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className={`rounded-2xl border px-4 py-3 ${cardClasses}`}
                  >
                    <option value="all">All Statuses</option>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="missing">Missing</option>
                  </select>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="px-4 py-3">Page</th>
                        <th className="px-4 py-3">URL / Slug</th>
                        <th className="px-4 py-3">Meta Title</th>
                        <th className="px-4 py-3">Meta Description</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPages.map((page) => (
                        <tr key={page._id || page.id} className="border-b border-slate-100">
                          <td className="px-4 py-4">
                            <div className="font-medium">{page.pageName}</div>
                            <div className="mt-1 text-xs text-slate-400">Score {page.score}/100</div>
                          </td>
                          <td className="px-4 py-4 text-slate-500">{page.slug}</td>
                          <td className="px-4 py-4">
                            <div className="max-w-[220px] truncate">{page.metaTitle || "Missing"}</div>
                            <div className={`mt-1 text-xs ${charTone(page.titleLength, 50, 60)}`}>
                              {page.titleLength}/60
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="max-w-[260px] truncate">{page.metaDescription || "Missing"}</div>
                            <div className={`mt-1 text-xs ${charTone(page.descriptionLength, 150, 160)}`}>
                              {page.descriptionLength}/160
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge(page.status)}`}>
                              {page.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => openEditor(page)}
                                className="rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white"
                              >
                                Edit
                              </button>
                              <a
                                href={`${SITE_URL}${normalizeSlug(page.slug)}`}
                                target="_blank"
                                rel="noreferrer"
                                className={`rounded-xl border px-3 py-2 text-xs font-semibold ${cardClasses}`}
                              >
                                Preview
                              </a>
                              {canDelete ? (
                                <button
                                  type="button"
                                  onClick={() => setDeleteTarget(page)}
                                  className="rounded-xl bg-rose-600 px-3 py-2 text-xs font-semibold text-white"
                                >
                                  Delete
                                </button>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {activeTab === "editor" ? (
              <div className="space-y-6">
                <div className={`rounded-3xl border p-6 shadow-sm ${cardClasses}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">Add / Edit SEO Page</h2>
                      <p className="mt-1 text-sm text-slate-400">
                        Configure metadata, social previews, JSON-LD, and sitemap settings.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleDraftChange(
                            "schemaJson",
                            generateSchemaTemplate(draft, settings.websiteName),
                          )
                        }
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${cardClasses}`}
                      >
                        <span className="flex items-center gap-2">
                          <WandSparkles className="h-4 w-4" />
                          Auto Generate JSON-LD
                        </span>
                      </button>
                      <button
                        type="button"
                        disabled={!canEdit || saving}
                        onClick={savePage}
                        className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
                      >
                        {saving ? "Saving..." : "Save SEO Page"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 xl:grid-cols-2">
                    <div className="space-y-6">
                      <div className={`rounded-2xl border p-5 ${cardClasses}`}>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Basic SEO</h3>
                        <div className="mt-4 grid gap-4">
                          <input value={draft.pageName} onChange={(event) => handleDraftChange("pageName", event.target.value)} placeholder="Page Name" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          <input value={draft.slug} onChange={(event) => handleDraftChange("slug", normalizeSlug(event.target.value))} placeholder="/about-us" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          <label className="grid gap-2">
                            <span className={`text-xs ${charTone(draft.metaTitle.length, 50, 60)}`}>{draft.metaTitle.length}/60</span>
                            <input value={draft.metaTitle} onChange={(event) => handleDraftChange("metaTitle", event.target.value)} placeholder="Meta Title" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          </label>
                          <label className="grid gap-2">
                            <span className={`text-xs ${charTone(draft.metaDescription.length, 150, 160)}`}>{draft.metaDescription.length}/160</span>
                            <textarea rows="4" value={draft.metaDescription} onChange={(event) => handleDraftChange("metaDescription", event.target.value)} placeholder="Meta Description" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          </label>
                          <input value={draft.metaKeywords} onChange={(event) => handleDraftChange("metaKeywords", event.target.value)} placeholder="keyword1, keyword2" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={draft.metaAuthor} onChange={(event) => handleDraftChange("metaAuthor", event.target.value)} placeholder="Meta Author" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                            <input value={draft.metaPublisher} onChange={(event) => handleDraftChange("metaPublisher", event.target.value)} placeholder="Meta Publisher" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={draft.metaLanguage} onChange={(event) => handleDraftChange("metaLanguage", event.target.value)} placeholder="Language (en, en-IN)" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                            <input value={draft.metaRevisitAfter} onChange={(event) => handleDraftChange("metaRevisitAfter", event.target.value)} placeholder="Revisit After (7 days)" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={draft.metaSubject} onChange={(event) => handleDraftChange("metaSubject", event.target.value)} placeholder="Meta Subject" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                            <input value={draft.metaClassification} onChange={(event) => handleDraftChange("metaClassification", event.target.value)} placeholder="Classification" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={draft.metaCoverage} onChange={(event) => handleDraftChange("metaCoverage", event.target.value)} placeholder="Coverage" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                            <input value={draft.metaDistribution} onChange={(event) => handleDraftChange("metaDistribution", event.target.value)} placeholder="Distribution" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={draft.metaRating} onChange={(event) => handleDraftChange("metaRating", event.target.value)} placeholder="Rating" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                            <input value={draft.themeColor} onChange={(event) => handleDraftChange("themeColor", event.target.value)} placeholder="Theme Color (#ffffff)" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={draft.canonicalUrl} onChange={(event) => handleDraftChange("canonicalUrl", event.target.value)} placeholder="Canonical URL" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                            <select value={draft.robots} onChange={(event) => handleDraftChange("robots", event.target.value)} className={`rounded-2xl border px-4 py-3 ${cardClasses}`}>
                              <option value="index,follow">index/follow</option>
                              <option value="noindex,nofollow">noindex/nofollow</option>
                              <option value="noindex,follow">noindex/follow</option>
                              <option value="index,nofollow">index/nofollow</option>
                            </select>
                          </div>
                          <input value={draft.referrerPolicy} onChange={(event) => handleDraftChange("referrerPolicy", event.target.value)} placeholder="Referrer Policy (origin-when-cross-origin)" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                        </div>
                      </div>

                      <div className={`rounded-2xl border p-5 ${cardClasses}`}>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Open Graph / Twitter</h3>
                        <div className="mt-4 grid gap-4">
                          <input value={draft.ogTitle} onChange={(event) => handleDraftChange("ogTitle", event.target.value)} placeholder="og:title" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          <textarea rows="3" value={draft.ogDescription} onChange={(event) => handleDraftChange("ogDescription", event.target.value)} placeholder="og:description" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                              <input value={draft.ogImage} onChange={(event) => handleDraftChange("ogImage", event.target.value)} placeholder="og:image" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                              <input type="file" onChange={(event) => uploadImage(event.target.files?.[0], "ogImage")} />
                            </div>
                            <select value={draft.ogType} onChange={(event) => handleDraftChange("ogType", event.target.value)} className={`rounded-2xl border px-4 py-3 ${cardClasses}`}>
                              <option value="website">website</option>
                              <option value="article">article</option>
                              <option value="product">product</option>
                            </select>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={draft.ogUrl} onChange={(event) => handleDraftChange("ogUrl", event.target.value)} placeholder="og:url" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                            <input value={draft.ogSiteName} onChange={(event) => handleDraftChange("ogSiteName", event.target.value)} placeholder="og:site_name" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          </div>
                          <input value={draft.ogLocale} onChange={(event) => handleDraftChange("ogLocale", event.target.value)} placeholder="og:locale" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          <div className="grid gap-4 md:grid-cols-2">
                            <select value={draft.twitterCard} onChange={(event) => handleDraftChange("twitterCard", event.target.value)} className={`rounded-2xl border px-4 py-3 ${cardClasses}`}>
                              <option value="summary">summary</option>
                              <option value="summary_large_image">summary_large_image</option>
                            </select>
                            <div className="grid gap-2">
                              <input value={draft.twitterImage} onChange={(event) => handleDraftChange("twitterImage", event.target.value)} placeholder="twitter:image" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                              <input type="file" onChange={(event) => uploadImage(event.target.files?.[0], "twitterImage")} />
                            </div>
                          </div>
                          <input value={draft.twitterTitle} onChange={(event) => handleDraftChange("twitterTitle", event.target.value)} placeholder="twitter:title" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          <textarea rows="3" value={draft.twitterDescription} onChange={(event) => handleDraftChange("twitterDescription", event.target.value)} placeholder="twitter:description" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          <div className="grid gap-4 md:grid-cols-2">
                            <input value={draft.twitterSite} onChange={(event) => handleDraftChange("twitterSite", event.target.value)} placeholder="twitter:site" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                            <input value={draft.twitterCreator} onChange={(event) => handleDraftChange("twitterCreator", event.target.value)} placeholder="twitter:creator" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          </div>
                        </div>
                      </div>

                      <div className={`rounded-2xl border p-5 ${cardClasses}`}>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Schema / Advanced</h3>
                        <div className="mt-4 grid gap-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <select value={draft.schemaType} onChange={(event) => handleDraftChange("schemaType", event.target.value)} className={`rounded-2xl border px-4 py-3 ${cardClasses}`}>
                              {["Organization", "Article", "Product", "BreadcrumbList", "FAQPage", "LocalBusiness"].map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            <input type="number" min="0.1" max="1" step="0.1" value={draft.sitemapPriority} onChange={(event) => handleDraftChange("sitemapPriority", event.target.value)} className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                          </div>
                          <textarea rows="12" value={draft.schemaJson} onChange={(event) => handleDraftChange("schemaJson", event.target.value)} className={`rounded-2xl border px-4 py-3 font-mono text-xs ${cardClasses}`} />
                          <textarea rows="5" value={draft.customHeadCode} onChange={(event) => handleDraftChange("customHeadCode", event.target.value)} placeholder="Custom head code" className={`rounded-2xl border px-4 py-3 font-mono text-xs ${cardClasses}`} />
                          <div className="grid gap-4 md:grid-cols-2">
                            <select value={draft.sitemapChangefreq} onChange={(event) => handleDraftChange("sitemapChangefreq", event.target.value)} className={`rounded-2xl border px-4 py-3 ${cardClasses}`}>
                              {["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"].map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            <div className="grid gap-2 text-sm">
                              <label className="flex items-center gap-2"><input type="checkbox" checked={draft.includeInSitemap} onChange={(event) => handleDraftChange("includeInSitemap", event.target.checked)} /> Include in sitemap</label>
                              <label className="flex items-center gap-2"><input type="checkbox" checked={draft.isIndexed} onChange={(event) => handleDraftChange("isIndexed", event.target.checked)} /> Indexed</label>
                            </div>
                          </div>
                          <div className="rounded-2xl border border-dashed border-slate-300 p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold">Hreflang Tags</h4>
                              <button type="button" onClick={() => setDraft((prev) => ({ ...prev, hreflangs: [...prev.hreflangs, { locale: "", url: "" }] }))} className="rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white">Add Hreflang</button>
                            </div>
                            <div className="mt-4 space-y-3">
                              {draft.hreflangs.map((item, index) => (
                                <div key={`${item.locale}-${index}`} className="grid gap-3 md:grid-cols-[160px_1fr_auto]">
                                  <input value={item.locale} onChange={(event) => handleHreflangChange(index, "locale", event.target.value)} placeholder="en-IN" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.url} onChange={(event) => handleHreflangChange(index, "url", event.target.value)} placeholder="https://example.com/en/" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <button type="button" onClick={() => setDraft((prev) => ({ ...prev, hreflangs: prev.hreflangs.filter((_, itemIndex) => itemIndex !== index) }))} className="rounded-2xl bg-rose-600 px-4 py-3 text-white">
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="rounded-2xl border border-dashed border-slate-300 p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold">Additional Meta Tags</h4>
                              <button type="button" onClick={() => setDraft((prev) => ({ ...prev, additionalMetaTags: [...prev.additionalMetaTags, { name: "", property: "", httpEquiv: "", charset: "", content: "" }] }))} className="rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white">Add Meta Tag</button>
                            </div>
                            <div className="mt-4 space-y-3">
                              {draft.additionalMetaTags.map((item, index) => (
                                <div key={`meta-tag-${index}`} className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_140px_1fr_auto]">
                                  <input value={item.name} onChange={(event) => handleMetaTagChange(index, "name", event.target.value)} placeholder="name" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.property} onChange={(event) => handleMetaTagChange(index, "property", event.target.value)} placeholder="property" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.httpEquiv} onChange={(event) => handleMetaTagChange(index, "httpEquiv", event.target.value)} placeholder="http-equiv" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.charset} onChange={(event) => handleMetaTagChange(index, "charset", event.target.value)} placeholder="charset" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.content} onChange={(event) => handleMetaTagChange(index, "content", event.target.value)} placeholder="content" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <button type="button" onClick={() => setDraft((prev) => ({ ...prev, additionalMetaTags: prev.additionalMetaTags.filter((_, itemIndex) => itemIndex !== index) }))} className="rounded-2xl bg-rose-600 px-4 py-3 text-white">
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="rounded-2xl border border-dashed border-slate-300 p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold">Additional Link Tags</h4>
                              <button type="button" onClick={() => setDraft((prev) => ({ ...prev, additionalLinkTags: [...prev.additionalLinkTags, { rel: "alternate", href: "", hrefLang: "", media: "", type: "", title: "", sizes: "" }] }))} className="rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white">Add Link Tag</button>
                            </div>
                            <div className="mt-4 space-y-3">
                              {draft.additionalLinkTags.map((item, index) => (
                                <div key={`link-tag-${index}`} className="grid gap-3 md:grid-cols-2 xl:grid-cols-[140px_1fr_120px_120px_120px_120px_120px_auto]">
                                  <input value={item.rel} onChange={(event) => handleLinkTagChange(index, "rel", event.target.value)} placeholder="rel" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.href} onChange={(event) => handleLinkTagChange(index, "href", event.target.value)} placeholder="href" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.hrefLang} onChange={(event) => handleLinkTagChange(index, "hrefLang", event.target.value)} placeholder="hrefLang" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.media} onChange={(event) => handleLinkTagChange(index, "media", event.target.value)} placeholder="media" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.type} onChange={(event) => handleLinkTagChange(index, "type", event.target.value)} placeholder="type" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.title} onChange={(event) => handleLinkTagChange(index, "title", event.target.value)} placeholder="title" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <input value={item.sizes} onChange={(event) => handleLinkTagChange(index, "sizes", event.target.value)} placeholder="sizes" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                                  <button type="button" onClick={() => setDraft((prev) => ({ ...prev, additionalLinkTags: prev.additionalLinkTags.filter((_, itemIndex) => itemIndex !== index) }))} className="rounded-2xl bg-rose-600 px-4 py-3 text-white">
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <GooglePreview draft={draft} settings={settings} />
                      <SocialPreview draft={draft} settings={settings} />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === "settings" ? (
              <div className={`rounded-3xl border p-6 shadow-sm ${cardClasses}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Global SEO Settings</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      Site-wide defaults, analytics, verification codes, robots.txt, and .htaccess redirects.
                    </p>
                  </div>
                  <button type="button" disabled={!canEdit || saving} onClick={saveSettings} className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white">
                    Save Settings
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    ["websiteName", "Website Name"],
                    ["metaTitleFormat", "Meta Title Format"],
                    ["defaultMetaDescription", "Default Meta Description"],
                    ["defaultMetaKeywords", "Default Meta Keywords"],
                    ["defaultMetaAuthor", "Default Meta Author"],
                    ["defaultMetaPublisher", "Default Meta Publisher"],
                    ["defaultMetaLanguage", "Default Meta Language"],
                    ["defaultRobots", "Default Robots"],
                    ["defaultThemeColor", "Default Theme Color"],
                    ["defaultOgImage", "Default OG Image"],
                    ["defaultOgSiteName", "Default OG Site Name"],
                    ["defaultOgLocale", "Default OG Locale"],
                    ["defaultTwitterSite", "Default Twitter Site"],
                    ["defaultTwitterCreator", "Default Twitter Creator"],
                    ["faviconUrl", "Favicon URL"],
                    ["appleTouchIconUrl", "Apple Touch Icon URL"],
                    ["manifestUrl", "Manifest URL"],
                    ["siteUrl", "Site URL"],
                    ["googleAnalyticsId", "Google Analytics ID"],
                    ["googleSearchConsoleCode", "Google Search Console Code"],
                    ["bingWebmasterCode", "Bing Webmaster Verification"],
                    ["yandexVerificationCode", "Yandex Verification"],
                    ["pinterestVerificationCode", "Pinterest Verification"],
                    ["baiduVerificationCode", "Baidu Verification"],
                    ["facebookPixelId", "Facebook Pixel ID"],
                  ].map(([field, label]) => (
                    <label key={field} className="grid gap-2">
                      <span className="text-sm font-medium">{label}</span>
                      <input value={settings[field] || ""} onChange={(event) => setSettings((prev) => ({ ...prev, [field]: event.target.value }))} className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                    </label>
                  ))}
                </div>

                <div className="mt-6 grid gap-4">
                  <textarea rows="8" value={settings.robotsTxt || ""} onChange={(event) => setSettings((prev) => ({ ...prev, robotsTxt: event.target.value }))} className={`rounded-2xl border px-4 py-3 font-mono text-xs ${cardClasses}`} />
                  <textarea rows="8" value={settings.htaccessRedirects || ""} onChange={(event) => setSettings((prev) => ({ ...prev, htaccessRedirects: event.target.value }))} className={`rounded-2xl border px-4 py-3 font-mono text-xs ${cardClasses}`} />
                </div>
              </div>
            ) : null}

            {activeTab === "sitemap" ? (
              <div className="space-y-6">
                <div className={`rounded-3xl border p-6 shadow-sm ${cardClasses}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">XML Sitemap Manager</h2>
                      <p className="mt-1 text-sm text-slate-400">
                        Manage inclusion, priority, frequency, and export of sitemap.xml.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={downloadSitemap} className="rounded-2xl bg-slate-700 px-4 py-3 text-sm font-semibold text-white">
                        Download sitemap.xml
                      </button>
                      <button type="button" onClick={submitSitemap} className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white">
                        Submit to Google / Bing
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="px-4 py-3">Page</th>
                          <th className="px-4 py-3">Include</th>
                          <th className="px-4 py-3">Priority</th>
                          <th className="px-4 py-3">Changefreq</th>
                          <th className="px-4 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pages.map((page) => (
                          <tr key={page._id} className="border-b border-slate-100">
                            <td className="px-4 py-3">
                              <div className="font-medium">{page.pageName}</div>
                              <div className="text-xs text-slate-400">{page.slug}</div>
                            </td>
                            <td className="px-4 py-3">{page.includeInSitemap ? "Yes" : "No"}</td>
                            <td className="px-4 py-3">{page.sitemapPriority}</td>
                            <td className="px-4 py-3">{page.sitemapChangefreq}</td>
                            <td className="px-4 py-3">
                              <button type="button" onClick={() => openEditor(page)} className="rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className={`rounded-3xl border p-6 shadow-sm ${cardClasses}`}>
                  <h3 className="text-lg font-semibold">Generated sitemap.xml</h3>
                  <textarea readOnly rows="16" value={sitemapXml} className={`mt-4 w-full rounded-2xl border px-4 py-3 font-mono text-xs ${cardClasses}`} />
                </div>
              </div>
            ) : null}

            {activeTab === "redirects" ? (
              <div className={`rounded-3xl border p-6 shadow-sm ${cardClasses}`}>
                <h2 className="text-xl font-semibold">Redirect Manager</h2>
                <p className="mt-1 text-sm text-slate-400">Add and manage 301 / 302 redirects.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_180px_auto]">
                  <input value={redirectDraft.fromUrl} onChange={(event) => setRedirectDraft((prev) => ({ ...prev, fromUrl: event.target.value }))} placeholder="/old-url" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                  <input value={redirectDraft.toUrl} onChange={(event) => setRedirectDraft((prev) => ({ ...prev, toUrl: event.target.value }))} placeholder="/new-url" className={`rounded-2xl border px-4 py-3 ${cardClasses}`} />
                  <select value={redirectDraft.redirectType} onChange={(event) => setRedirectDraft((prev) => ({ ...prev, redirectType: Number(event.target.value) }))} className={`rounded-2xl border px-4 py-3 ${cardClasses}`}>
                    <option value={301}>301 Permanent</option>
                    <option value={302}>302 Temporary</option>
                  </select>
                  <button type="button" disabled={!canEdit} onClick={saveRedirect} className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white">
                    Save
                  </button>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="px-4 py-3">From URL</th>
                        <th className="px-4 py-3">To URL</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {redirects.map((redirect) => (
                        <tr key={redirect._id} className="border-b border-slate-100">
                          <td className="px-4 py-3">{redirect.fromUrl}</td>
                          <td className="px-4 py-3">{redirect.toUrl}</td>
                          <td className="px-4 py-3">{redirect.redirectType}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setRedirectDraft({
                                    id: redirect._id,
                                    fromUrl: redirect.fromUrl,
                                    toUrl: redirect.toUrl,
                                    redirectType: redirect.redirectType,
                                  })
                                }
                                className="rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white"
                              >
                                Edit
                              </button>
                              {canDelete ? (
                                <button type="button" onClick={() => deleteRedirect(redirect._id)} className="rounded-xl bg-rose-600 px-3 py-2 text-xs font-semibold text-white">
                                  Delete
                                </button>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {activeTab === "audit" ? (
              <div className="space-y-6">
                <div className={`rounded-3xl border p-6 shadow-sm ${cardClasses}`}>
                  <h2 className="text-xl font-semibold">SEO Audit Tool</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Audit any public URL for metadata, headings, and image alt issues.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <input value={auditUrl} onChange={(event) => setAuditUrl(event.target.value)} placeholder="https://your-site.com/page" className={`min-w-[320px] flex-1 rounded-2xl border px-4 py-3 ${cardClasses}`} />
                    <button type="button" onClick={handleAudit} className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white">
                      {auditLoading ? "Auditing..." : "Run Audit"}
                    </button>
                  </div>
                </div>

                {auditResult ? (
                  <div className={`rounded-3xl border p-6 shadow-sm ${cardClasses}`}>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <StatCard title="Score" value={`${auditResult.score}/100`} hint="Computed from detected issues" icon={ShieldAlert} tone="emerald" />
                      <StatCard title="Title Length" value={auditResult.titleLength} hint="Target 30-60 chars" icon={ExternalLink} tone="blue" />
                      <StatCard title="Description Length" value={auditResult.descriptionLength} hint="Target 70-160 chars" icon={Monitor} tone="amber" />
                      <StatCard title="Images Missing Alt" value={auditResult.images.missingAlt} hint={`${auditResult.images.total} total images`} icon={AlertTriangle} tone="rose" />
                    </div>
                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                      <div className={`rounded-2xl border p-5 ${cardClasses}`}>
                        <h3 className="text-lg font-semibold">Issues & Fix Suggestions</h3>
                        <div className="mt-4 space-y-3">
                          {auditResult.issues.length ? (
                            auditResult.issues.map((issue) => (
                              <div key={issue} className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{issue}</div>
                            ))
                          ) : (
                            <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">No major issues found.</div>
                          )}
                        </div>
                      </div>
                      <div className={`rounded-2xl border p-5 ${cardClasses}`}>
                        <h3 className="text-lg font-semibold">Heading Structure</h3>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl bg-slate-50 p-4 text-center text-slate-800">
                            <div className="text-3xl font-bold">{auditResult.headings.h1}</div>
                            <div className="mt-1 text-sm">H1 Tags</div>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-4 text-center text-slate-800">
                            <div className="text-3xl font-bold">{auditResult.headings.h2}</div>
                            <div className="mt-1 text-sm">H2 Tags</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        </div>
      )}

      {deleteTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Delete SEO Page</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Delete SEO configuration for <strong>{deleteTarget.pageName}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-2xl border px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deletePage}
                className="rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminSeoManager;
