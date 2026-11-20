/** Shared public site configuration. Override with NEXT_PUBLIC_SITE_URL (inlined at build time). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://graphicconvert.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Image2SVG";

/** Combined before/after artwork shown in the gallery and used for social sharing. */
export const GALLERY_IMAGES = [
  { path: "/gallery/image-to-svg-before-after.jpg", width: 1600, height: 800, titleKey: "compareTitle", altKey: "compareAlt" },
  { path: "/gallery/cat-image-to-svg-before-after.jpg", width: 1600, height: 800, titleKey: "catCompareTitle", altKey: "catCompareAlt" },
];
export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function jsonLdString(value) {
  // Prevent a content value containing `</script>` from terminating the JSON-LD script.
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
