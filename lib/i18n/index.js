import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";
import { IMAGE_TO_SVG_PATH } from "../converters";

export const LOCALES = ["en", "fr", "es"];
export const DEFAULT_LOCALE = "en";
export const LANG_STORAGE_KEY = "i2s-lang";
export const LOCALE_NAMES = { en: "English", fr: "Français", es: "Español" };

const DICTIONARIES = { en, fr, es };

export function getDictionary(locale) {
  return DICTIONARIES[locale] || DICTIONARIES[DEFAULT_LOCALE];
}

/** Localized URL for a converter's home page; the default locale has no prefix. */
export function localePath(locale, basePath = IMAGE_TO_SVG_PATH) {
  return locale === DEFAULT_LOCALE ? basePath : `${basePath}/${locale}`;
}

/** Map for Next metadata `alternates.languages` (hreflang). */
export function hreflangMap() {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l)])),
    "x-default": localePath(DEFAULT_LOCALE),
  };
}
