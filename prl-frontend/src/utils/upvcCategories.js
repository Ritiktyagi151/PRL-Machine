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
    slug: "upvc-welding-machines",
  },
  {
    id: 2,
    name: "uPVC Cutting Machines",
    slug: "upvc-cutting-machines",
  },
  {
    id: 3,
    name: "uPVC Cleaning Machines",
    slug: "upvc-cleaning-machines",
  },
  {
    id: 4,
    name: "uPVC Copy Router & Lock Hole Machines",
    slug: "upvc-copy-router-and-lock-hole-machines",
  },
  {
    id: 5,
    name: "uPVC Glazing Bead Cutting Machines",
    slug: "upvc-glazing-bead-cutting-machines",
  },
  {
    id: 6,
    name: "uPVC Drainage Water Slot Machines",
    slug: "upvc-drainage-water-slot-machines",
  },
  {
    id: 7,
    name: "uPVC Mullion Cutting Machines",
    slug: "upvc-mullion-cutting-machines",
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
    slug: "other-special-machines",
  },
];

// Slugs are now always derived from the name — no dead code, no inconsistency
export const UPVC_CATEGORIES = UPVC_CATEGORY_BASE.map((category) => ({
  ...category,
  slug: slugifyCategoryName(category.name),
}));

// Safe lookup by id — not fragile index access
const findSlugById = (id) =>
  UPVC_CATEGORIES.find((c) => c.id === id)?.slug ?? null;

export const getUpvcCategorySlugByName = (name = "") => {
  const lowerName = name.toLowerCase();

  // Specific multi-word checks MUST come before generic single-word ones
  // to avoid "glazing bead cutting" or "mullion cutting" matching "cutting" too early

  if (lowerName.includes("glazing bead")) return findSlugById(5);
  if (lowerName.includes("mullion")) return findSlugById(7);
  if (lowerName.includes("water slot") || lowerName.includes("drainage"))
    return findSlugById(6);
  if (lowerName.includes("router") || lowerName.includes("lock hole"))
    return findSlugById(4);
  if (lowerName.includes("other special")) return findSlugById(10);

  // Generic single-word checks — safe now that specifics are handled above
  if (lowerName.includes("welding")) return findSlugById(1);
  if (lowerName.includes("cutting")) return findSlugById(2);
  if (lowerName.includes("cleaning")) return findSlugById(3);
  if (lowerName.includes("punching") || lowerName.includes("interlock"))
    return findSlugById(8);
  if (lowerName.includes("hand tool")) return findSlugById(9);

  return null;
};