import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export const LOCALES = ["en", "fr", "es"];
export const DEFAULT_LOCALE = "en";
export const LANG_STORAGE_KEY = "i2s-lang";
export const LOCALE_NAMES = { en: "English", fr: "Français", es: "Español" };

const DICTIONARIES = { en, fr, es };

export function getDictionary(locale) {
  return DICTIONARIES[locale] || DICTIONARIES[DEFAULT_LOCALE];
}

export function localePath(locale) {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}

/** Map for Next metadata `alternates.languages` (hreflang). */
export function hreflangMap() {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l)])),
    "x-default": localePath(DEFAULT_LOCALE),
  };
}
