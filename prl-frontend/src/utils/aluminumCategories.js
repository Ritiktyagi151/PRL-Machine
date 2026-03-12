export const ALUMINUM_CATEGORIES = [
  {
    id: 1,
    name: "Aluminum Cutting Machines",
    slug: "aluminum-profile-cutting-machine",
  },
  {
    id: 2,
    name: "Aluminum Lock Hole Machines",
    slug: "aluminum-copy-router-machine",
  },
  {
    id: 3,
    name: "Aluminum Mullion Machines",
    slug: "aluminum-end-milling-machine",
  },
  {
    id: 4,
    name: "Punching & Crimping Machines",
    slug: "aluminum-corner-crimping-machine",
  },
  {
    id: 5,
    name: "Other Special Machines",
    slug: "other-special-machine",
  },
];

export const getAluminumCategorySlugByName = (name = "") => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("cutting")) return ALUMINUM_CATEGORIES[0].slug;
  if (lowerName.includes("lock hole") || lowerName.includes("router"))
    return ALUMINUM_CATEGORIES[1].slug;
  if (lowerName.includes("mullion") || lowerName.includes("end milling"))
    return ALUMINUM_CATEGORIES[2].slug;
  if (
    lowerName.includes("punching") ||
    lowerName.includes("crimping") ||
    lowerName.includes("corner crimping")
  )
    return ALUMINUM_CATEGORIES[3].slug;
  if (lowerName.includes("other special")) return ALUMINUM_CATEGORIES[4].slug;

  return null;
};
