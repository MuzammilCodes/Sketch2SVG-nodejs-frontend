"use client";

import Footer from "./Footer";
import { useSavedLocale } from "../../lib/localeClient";

/** Footer for pages that exist only in English: the chrome follows the visitor's saved language. */
export default function PageFooter() {
  return <Footer locale={useSavedLocale()} />;
}
