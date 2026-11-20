"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import s from "./Site.module.css";

/** Header nav: inline on tablet/desktop; on mobile a hamburger toggles a full-screen centered menu. */
export default function HeaderNav({ label, openLabel, closeLabel, children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 641px)");
    const onResize = (e) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`${s.menuBtn} ${open ? s.menuOpen : ""}`}
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={s.menuBar} />
        <span className={s.menuBar} />
        <span className={s.menuBar} />
      </button>
      <nav
        id={navId}
        className={`${s.navLinks} ${open ? s.navOpen : ""}`}
        aria-label={label}
        onClick={(e) => e.target.closest("a, button") && setOpen(false)}
      >
        {children}
      </nav>
    </>
  );
}
