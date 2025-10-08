import About from "../models/About.js";

export const getAbout = async (req, res) => {
  const doc = await About.findOne().sort({ createdAt: -1 });
  res.json(doc || {});
};

export const upsertOurStory = async (req, res) => {
  try {
    const doc = await About.findOneAndUpdate(
      {},
      { ourStory: req.body },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(doc.ourStory);
  } catch (e) {
    res.status(400).json({ error: "Failed to save our story", details: e.message });
  }
};

export const getCoreCommittee = async (req, res) => {
  const doc = await About.findOne({}, { coreCommittee: 1 });
  res.json(doc?.coreCommittee || []);
};

export const upsertCoreCommittee = async (req, res) => {
  try {
    const doc = await About.findOneAndUpdate(
      {},
      { coreCommittee: req.body },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(doc.coreCommittee);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Failed to save core committee", details: e.message });
  }
};

export const upsertPaymentPolicy = async (req, res) => {
  try {
    const doc = await About.findOneAndUpdate(
      {},
      { paymentPolicy: req.body },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(doc.paymentPolicy);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Failed to save payment policy", details: e.message });
  }
};

export const upsertWhatWeDo = async (req, res) => {
  try {
    const doc = await About.findOneAndUpdate(
      {},
      { whatWeDo: req.body },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(doc.whatWeDo);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Failed to save what we do", details: e.message });
  }
};


