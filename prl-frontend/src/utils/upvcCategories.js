export const slugifyCategoryName = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const UPVC_CATEGORY_BASE = [
  {
    id: 1,
    name: "uPVC Welding Machines",
    slug: "upvc-welding-machine",
  },
  {
    id: 2,
    name: "uPVC Cutting Machines",
    slug: "upvc-cutting-machine",
  },
  {
    id: 3,
    name: "uPVC Cleaning Machines",
    slug: "upvc-cleaning-machine",
  },
  {
    id: 4,
    name: "uPVC Copy Router & Lock Hole Machines",
    slug: "upvc-copy-router-lock-hole-machine",
  },
  {
    id: 5,
    name: "uPVC Glazing Bead Cutting Machines",
    slug: "upvc-glazing-bead-cutting-machine",
  },
  {
    id: 6,
    name: "uPVC Drainage Water Slot Machines",
    slug: "upvc-drainage-water-slot-machine",
  },
  {
    id: 7,
    name: "uPVC Mullion Cutting Machines",
    slug: "upvc-mullion-cutting-machine",
  },
  {
    id: 8,
    name: "uPVC Interlock Punching",
    slug: "upvc-interlock-punching",
  },
  {
    id: 9,
    name: "Hand Tools",
    slug: "hand-tools",
  },
  {
    id: 10,
    name: "Other Special Machines",
    slug: "other-special-machine",
  },
];

export const UPVC_CATEGORIES = UPVC_CATEGORY_BASE.map((category) => ({
  ...category,
  slug: category.slug || slugifyCategoryName(category.name),
}));

export const getUpvcCategorySlugByName = (name = "") => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("welding")) return UPVC_CATEGORIES[0].slug;
  if (lowerName.includes("cutting")) return UPVC_CATEGORIES[1].slug;
  if (lowerName.includes("cleaning")) return UPVC_CATEGORIES[2].slug;
  if (lowerName.includes("router") || lowerName.includes("lock hole"))
    return UPVC_CATEGORIES[3].slug;
  if (lowerName.includes("glazing bead")) return UPVC_CATEGORIES[4].slug;
  if (lowerName.includes("drainage") || lowerName.includes("water slot"))
    return UPVC_CATEGORIES[5].slug;
  if (lowerName.includes("mullion")) return UPVC_CATEGORIES[6].slug;
  if (lowerName.includes("punching") || lowerName.includes("interlock"))
    return UPVC_CATEGORIES[7].slug;
  if (lowerName.includes("hand tool")) return UPVC_CATEGORIES[8].slug;
  if (lowerName.includes("other special")) return UPVC_CATEGORIES[9].slug;

  return null;
};
