import c from "./Sections.module.css";

const ICONS = [
  // logo
  <path key="a" d="M12 2l3 6 6 .9-4.5 4.4 1 6.3L12 16.6 6.5 19.6l1-6.3L3 8.9 9 8z" />,
  // icon grid
  <g key="b"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>,
  // cutting
  <g key="c"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12" /></g>,
  // pen
  <path key="d" d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />,
  // stencil
  <g key="e"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h3v3H8zM13 13h3v3h-3zM13 8h3M8 13h3" /></g>,
  // feather / light
  <path key="f" d="M20.2 3.8C13 3.8 6 8 6 15c0 1.2.3 2.3.8 3.2L3 22M9 15c3-1 6-4 8-8M7 14h6" />,
];

export default function UseCases({ t }) {
  return (
    <section id="use-cases" className={c.section} aria-labelledby="use-cases-title">
      <p className={c.eyebrow}>{t.eyebrow}</p>
      <h2 id="use-cases-title" className={c.title}>{t.title}</h2>
      <p className={c.lead}>{t.lead}</p>
      <ul className={c.useGrid}>
        {t.items.map((item, i) => (
          <li key={item.title} className={c.useCard}>
            <span className={c.useIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[i]}
              </svg>
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
