import express from "express";
import {
  getAbout,
  upsertOurStory,
  getCoreCommittee,
  upsertCoreCommittee,
  upsertPaymentPolicy,
  upsertWhatWeDo,
} from "../controllers/aboutController.js";

const router = express.Router();

// Get whole about doc
router.get("/", getAbout);

// Upsert ourStory
router.post("/our-story", upsertOurStory);

// Core committee CRUD (array of members)
router.get("/core-committee", getCoreCommittee);

router.post("/core-committee", upsertCoreCommittee);

// Payment policy
router.post("/payment-policy", upsertPaymentPolicy);

// What we do
router.post("/what-we-do", upsertWhatWeDo);

export default router;
