import Link from "next/link";
import s from "./Site.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import HeaderNav from "./HeaderNav";
import { getDictionary, localePath } from "../../lib/i18n";
import { IMAGE_TO_SVG_PATH as BASE } from "../../lib/converters";

export default function Header({ locale = "en" }) {
  const t = getDictionary(locale);
  return (
    <>
      <div className={s.topBand} />
      <header className={s.header}>
        <Link href={localePath(locale)} className={s.logoWrap} aria-label={t.nav.home}>
          <PenNib />
          <div>
            <span className={s.logoName}>
              Image<span className={s.logoTwo}>2</span>SVG
            </span>
            <p className={s.logoTagline}>{t.tagline}</p>
          </div>
        </Link>
        <HeaderNav label={t.nav.label} openLabel={t.nav.menuOpen} closeLabel={t.nav.menuClose}>
          <Link href={`${BASE}/best-free-svg-converter-2027`} className={s.blogLink}>{t.nav.best}</Link>
          <Link href={`${BASE}/blog/image-to-svg-guide`} className={s.blogLink}>{t.nav.guide}</Link>
          <Link href={`${BASE}/blog/image-to-vector-guide`} className={s.blogLink}>{t.nav.vector}</Link>
          <Link href={`${BASE}/blog/svg-vs-png`} className={s.blogLink}>{t.nav.svgPng}</Link>
          <LanguageSwitcher current={locale} label={t.footer.languageH} />
        </HeaderNav>
      </header>
    </>
  );
}

const PenNib = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" stroke="#6b7c5a" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#c4673a" />
  </svg>
);
