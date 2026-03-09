const EXTRA_SCROLL_OFFSET = 12;

const getElementHeight = (id) => {
  const element = document.getElementById(id);
  return element ? element.offsetHeight : 0;
};

export const getStickyHeaderOffset = () => {
  const topBarHeight = getElementHeight("announcement-bar");
  const navbarHeight = getElementHeight("main-navbar");
  return topBarHeight + navbarHeight + EXTRA_SCROLL_OFFSET;
};

export const scrollToElementId = (id, behavior = "smooth") => {
  if (!id) return false;

  const targetElement = document.getElementById(id);
  if (!targetElement) return false;

  const top = targetElement.getBoundingClientRect().top + window.scrollY;
  const scrollPosition = Math.max(top - getStickyHeaderOffset(), 0);

  window.scrollTo({
    top: scrollPosition,
    behavior,
  });

  return true;
};

export const scrollToHash = (hash, behavior = "smooth") => {
  if (!hash || hash === "#") return false;

  const id = decodeURIComponent(hash.replace(/^#/, ""));
  return scrollToElementId(id, behavior);
};
