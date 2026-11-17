import { SITE_URL } from "../lib/site";
import { LOCALES, localePath } from "../lib/i18n";

// Update a page's date only when its useful content changes materially.
const CONTENT_UPDATED = new Date("2026-11-06T00:00:00.000Z");
const SITE_UPDATED = new Date("2026-11-16T00:00:00.000Z");

const languages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${localePath(l)}`]));

export default function sitemap() {
  const home = LOCALES.map((l) => ({
    url: `${SITE_URL}${localePath(l)}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: l === "en" ? 1.0 : 0.9,
    alternates: { languages },
  }));

  return [
    ...home,
    { url: `${SITE_URL}/best-free-svg-converter-2027`, lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/blog/image-to-svg-guide`, lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/blog/image-to-vector-guide`, lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/blog/svg-vs-png`, lastModified: CONTENT_UPDATED, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/changelog`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];
}
