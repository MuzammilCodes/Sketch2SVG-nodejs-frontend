"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, LANG_STORAGE_KEY, LOCALES } from "./i18n";

const EVENT = "i2s-lang-change";

export function readSavedLocale() {
  try {
    const v = localStorage.getItem(LANG_STORAGE_KEY);
    return LOCALES.includes(v) ? v : null;
  } catch {
    return null;
  }
}

export function saveLocale(code) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, code);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Saved language; the server snapshot is the default so hydration matches. */
export function useSavedLocale() {
  return useSyncExternalStore(subscribe, () => readSavedLocale() ?? DEFAULT_LOCALE, () => DEFAULT_LOCALE);
}
