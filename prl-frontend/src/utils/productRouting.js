export const slugifyProductName = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getProductSlug = (product = {}) =>
  product.id || product.slug || product._id || slugifyProductName(product.name || "");

export const getCanonicalProductPath = (productOrSlug) => {
  const slug =
    typeof productOrSlug === "string"
      ? productOrSlug
      : getProductSlug(productOrSlug);

  return slug ? `/products/${slug}` : "/products";
};

export const findProductBySlug = (products = [], productSlug = "") =>
  products.find((product) => getProductSlug(product) === productSlug);
