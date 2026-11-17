import Link from "next/link";
import InfoPage from "../components/InfoPage";
import { SITE_URL } from "../../lib/site";

const PATH = "/terms";
const TITLE = "Terms of Use";
const DESCRIPTION = "The rules for using the Image2SVG image to SVG converter and its website.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: `${SITE_URL}${PATH}`, title: TITLE, description: DESCRIPTION },
};

export default function TermsPage() {
  return (
    <InfoPage title={TITLE} description={DESCRIPTION} path={PATH} label="Legal" updated="2026-11-16">
      <section>
        <h2>Acceptance</h2>
        <p>By using Image2SVG you agree to these terms. If you do not agree, please do not use the service.</p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <ul>
          <li>Upload only images you own or have permission to convert.</li>
          <li>Do not upload unlawful, infringing or harmful content.</li>
          <li>Do not attempt to disrupt, overload or reverse-engineer the service, or use it to send automated bulk requests.</li>
        </ul>
      </section>
      <section>
        <h2>Your content and the output</h2>
        <p>
          You keep whatever rights you already have in the images you upload. The SVG output is derived from your image,
          so the same rights and restrictions apply to it. We claim no ownership of your images or of the SVG files you
          download.
        </p>
      </section>
      <section>
        <h2>Availability and changes</h2>
        <p>
          The service may change, be limited or be discontinued at any time, and file size or format limits may apply.
          We may update these terms; continued use after an update means you accept the revised terms.
        </p>
      </section>
      <section>
        <h2>No warranty and liability</h2>
        <p>
          The service is provided as described in the <Link href="/disclaimer">Disclaimer</Link>. Our handling of uploaded
          images is described in the <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </section>
    </InfoPage>
  );
}
