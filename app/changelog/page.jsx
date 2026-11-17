import InfoPage from "../components/InfoPage";
import { SITE_URL } from "../../lib/site";

const PATH = "/changelog";
const TITLE = "Changelog";
const DESCRIPTION = "A dated list of what has changed in Image2SVG.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: `${SITE_URL}${PATH}`, title: TITLE, description: DESCRIPTION },
};

const RELEASES = [
  {
    version: "1.2.0",
    date: "2026-11-16",
    changes: [
      "New before/after comparison machine: slide the mechanical carriage to compare your original with the SVG output.",
      "Black & white toggle to preview, copy and download a monochrome version of the result.",
      "French and Spanish versions of the home page with hreflang tags and a language switcher that is remembered across pages.",
      "Added a before/after gallery, a use-cases section and ready-to-copy embed snippets.",
      "Added About, Privacy Policy, Disclaimer, Terms of Use and this changelog, plus a full site footer.",
      "Redesigned 404 page.",
      "Trimmed unused font weights and styles to reduce page weight.",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-11-06",
    changes: [
      "Published guides on converting images to SVG, raster and vector graphics, and SVG vs PNG.",
      "Added the Best Free SVG Converter 2027 article.",
    ],
  },
  {
    version: "1.0.0",
    date: null,
    changes: ["Initial release of the converter with threshold, speckle, corner and curve controls."],
  },
];

export default function ChangelogPage() {
  return (
    <InfoPage title={TITLE} description={DESCRIPTION} path={PATH} label="Updates" updated="2026-11-16">
      {RELEASES.map((r) => (
        <section key={r.version} id={`v${r.version}`}>
          <h2>
            v{r.version}
            {r.date ? <> — <time dateTime={r.date}>{r.date}</time></> : " — Earlier"}
          </h2>
          <ul>
            {r.changes.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      ))}
    </InfoPage>
  );
}
