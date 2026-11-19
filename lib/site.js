/** Shared public site configuration. Override with NEXT_PUBLIC_SITE_URL (inlined at build time). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://graphicconvert.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Image2SVG";
export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function jsonLdString(value) {
  // Prevent a content value containing `</script>` from terminating the JSON-LD script.
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
