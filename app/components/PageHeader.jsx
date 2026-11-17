"use client";

import Header from "./Header";
import { useSavedLocale } from "../../lib/localeClient";

/** Header for pages that exist only in English: the chrome follows the visitor's saved language. */
export default function PageHeader() {
  return <Header locale={useSavedLocale()} />;
}
