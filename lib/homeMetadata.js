import { LOCALES, getDictionary, hreflangMap, localePath } from "./i18n";
import { absoluteUrl, GALLERY_IMAGES } from "./site";

/** Per-locale metadata with self-referencing canonical and hreflang alternates. */
export function homeMetadata(locale) {
  const t = getDictionary(locale);
  const path = localePath(locale);
  const images = GALLERY_IMAGES.map((img) => ({
    url: absoluteUrl(img.path),
    width: img.width,
    height: img.height,
    alt: t.gallery[img.altKey],
  }));
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
      images,
    },
    twitter: { card: "summary_large_image", title: t.meta.ogTitle, description: t.meta.ogDescription, images: images.map((i) => i.url) },
  };
}
