import Link from "next/link";
import InfoPage from "../components/InfoPage";
import { SITE_URL } from "../../lib/site";

const PATH = "/privacy-policy";
const TITLE = "Privacy Policy";
const DESCRIPTION = "How Image2SVG handles the images you upload, analytics and the preferences stored in your browser.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: `${SITE_URL}${PATH}`, title: TITLE, description: DESCRIPTION },
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title={TITLE} description={DESCRIPTION} path={PATH} label="Legal" updated="2026-11-16">
      <section>
        <h2>Summary</h2>
        <p>
          Image2SVG has no accounts or sign-up. To convert an image, the file you choose is sent to a conversion service
          that returns SVG output. This page explains what that involves and what is stored in your browser.
        </p>
      </section>
      <section>
        <h2>Images you upload</h2>
        <p>
          When you press Convert, your image and the tracing settings you selected are sent over the network to the
          conversion service, which processes the file to produce the SVG. The before/after comparison, the black &amp;
          white preview and the download are all generated from that response in your browser.
        </p>
        <p>
          Please do not upload images containing confidential or sensitive information, or images you do not have the
          right to use.
        </p>
      </section>
      <section>
        <h2>Analytics and cookies</h2>
        <p>
          If analytics is enabled for this site, Google Analytics may collect aggregated usage information such as pages
          viewed, approximate location, device and browser type, and may set cookies or similar identifiers to do so. It
          is not used to read the content of images you upload.
        </p>
      </section>
      <section>
        <h2>Data stored in your browser</h2>
        <ul>
          <li>
            <strong>Language preference:</strong> when you choose a language, the code (<code>en</code>, <code>fr</code>{" "}
            or <code>es</code>) is saved in your browser&apos;s local storage so that the site opens in that language next
            time. It never leaves your device.
          </li>
        </ul>
        <p>You can remove it at any time by clearing this site&apos;s data in your browser settings.</p>
      </section>
      <section>
        <h2>Fonts and third parties</h2>
        <p>
          Fonts are bundled with the site at build time rather than requested from a font provider when you visit. Links
          to other websites, such as the developer&apos;s profiles, are governed by those sites&apos; own policies.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          You can block cookies or analytics in your browser or with a content blocker, and the converter will continue to
          work. If you have a question about this policy, reach the developer through the links on the{" "}
          <Link href="/about">About page</Link>.
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>
          This policy may be updated as the service changes. The date at the top of the page shows the latest revision, and
          material changes are noted in the <Link href="/changelog">changelog</Link>.
        </p>
      </section>
    </InfoPage>
  );
}
