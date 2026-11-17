import { LOCALES, getDictionary, hreflangMap, localePath } from "./i18n";
import { absoluteUrl } from "./site";

/** Per-locale metadata with self-referencing canonical and hreflang alternates. */
export function homeMetadata(locale) {
  const t = getDictionary(locale);
  const path = localePath(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: path, languages: hreflangMap() },
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      locale: t.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => getDictionary(l).ogLocale),
    },
    twitter: { card: "summary_large_image", title: t.meta.ogTitle, description: t.meta.ogDescription },
  };
}
