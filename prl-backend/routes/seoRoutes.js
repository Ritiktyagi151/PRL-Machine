const express = require("express");
const controller = require("../controllers/seoController");

const router = express.Router();

router.get("/dashboard", controller.getDashboard);
router.get("/pages", controller.listPages);
router.get(/^\/pages\/(.+)$/, controller.getPageBySlug);
router.post("/pages", controller.createPage);
router.put("/pages/:id", controller.updatePage);
router.delete("/pages/:id", controller.deletePage);

router.get("/settings", controller.getSettings);
router.put("/settings", controller.updateSettings);

router.get("/redirects", controller.listRedirects);
router.post("/redirects", controller.createRedirect);
router.put("/redirects/:id", controller.updateRedirect);
router.delete("/redirects/:id", controller.deleteRedirect);

router.get("/meta", controller.resolveMeta);
router.get("/sitemap", controller.getSitemapData);
router.post("/sitemap/ping", controller.pingSitemap);
router.post("/audit", controller.auditPage);

module.exports = router;
