"use client";

import { useRef, useState, useEffect } from "react";
import c from "./Sections.module.css";

const SNIPPETS = {
  img: `<img
  src="your-image.svg"
  alt="Describe what the image shows"
  width="240"
  height="auto"
  loading="lazy"
/>`,
  inline: `<svg viewBox="0 0 320 240" role="img" aria-labelledby="logo-title" width="240">
  <title id="logo-title">Describe what the image shows</title>
  <!-- Paste the <path> elements from your-image.svg here -->
</svg>`,
  css: `/* As a background */
.hero-art {
  background: url("your-image.svg") center / contain no-repeat;
}

/* As a mask: the icon takes the current text colour */
.icon {
  width: 24px;
  height: 24px;
  background-color: currentColor;
  -webkit-mask: url("your-image.svg") center / contain no-repeat;
  mask: url("your-image.svg") center / contain no-repeat;
}`,
};

export default function EmbedSnippet({ t }) {
  const [tab, setTab] = useState("img");
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard.writeText(SNIPPETS[tab]).then(() => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="embed" className={c.section} aria-labelledby="embed-title">
      <p className={c.eyebrow}>{t.eyebrow}</p>
      <h2 id="embed-title" className={c.title}>{t.title}</h2>
      <p className={c.lead}>{t.lead}</p>

      <div className={c.codeCard}>
        <div className={c.codeBar}>
          <div className={c.tabs} role="tablist" aria-label={t.title}>
            {Object.keys(SNIPPETS).map((id) => (
              <button
                key={id}
                id={`embed-tab-${id}`}
                role="tab"
                type="button"
                aria-selected={tab === id}
                aria-controls="embed-panel"
                className={`${c.tab} ${tab === id ? c.tabOn : ""}`}
                onClick={() => setTab(id)}
              >
                {t.tabs[id]}
              </button>
            ))}
          </div>
          <button type="button" className={c.copy} onClick={copy}>
            {copied ? t.copied : t.copy}
          </button>
        </div>
        <pre id="embed-panel" role="tabpanel" aria-labelledby={`embed-tab-${tab}`} className={c.code} tabIndex={0}>
          <code>{SNIPPETS[tab]}</code>
        </pre>
      </div>
      <p className={c.note}>{t.tips[tab]}</p>
    </section>
  );
}
