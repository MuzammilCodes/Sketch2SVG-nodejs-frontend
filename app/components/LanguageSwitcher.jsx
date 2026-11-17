"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_NAMES, localePath } from "../../lib/i18n";
import { saveLocale } from "../../lib/localeClient";
import s from "./Site.module.css";

export default function LanguageSwitcher({ current, label = "Language", full = false }) {
  const pathname = usePathname();
  // Only the home pages exist in every language; elsewhere switching keeps the visitor on the same page.
  const isHome = LOCALES.some((l) => localePath(l) === pathname);

  return (
    <nav className={`${s.langSwitch} ${full ? s.langFull : ""}`} aria-label={label}>
      {LOCALES.map((code) => {
        const active = code === current;
        const className = `${s.langLink} ${active ? s.langActive : ""}`;
        const text = full ? LOCALE_NAMES[code] : code.toUpperCase();

        return isHome ? (
          <Link
            key={code}
            href={localePath(code)}
            hrefLang={code}
            lang={code}
            prefetch={false}
            onClick={() => saveLocale(code)}
            aria-current={active ? "true" : undefined}
            className={className}
          >
            {text}
          </Link>
        ) : (
          <button key={code} type="button" lang={code} aria-pressed={active} onClick={() => saveLocale(code)} className={className}>
            {text}
          </button>
        );
      })}
    </nav>
  );
}
