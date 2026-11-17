"use client";

import { useEffect } from "react";
import { saveLocale } from "../../lib/localeClient";

/** Records the language of the home page being viewed so other pages follow it; never redirects. */
export default function LocaleSync({ locale }) {
  useEffect(() => {
    saveLocale(locale);
  }, [locale]);

  return null;
}
