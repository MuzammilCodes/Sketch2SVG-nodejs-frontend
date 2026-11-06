import { SITE_URL } from "../lib/site";

// Update a page's date only when its useful content changes materially.
const CONTENT_UPDATED = new Date("2026-11-06T00:00:00.000Z");

export default function sitemap() {
  return [
    { url: `${SITE_URL}/`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/best-free-svg-converter-2027`, lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/blog/image-to-svg-guide`, lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/blog/image-to-vector-guide`, lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/blog/svg-vs-png`, lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.7 },
  ];
}
