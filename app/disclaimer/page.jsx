import Link from "next/link";
import InfoPage from "../components/InfoPage";
import { SITE_URL } from "../../lib/site";

const PATH = "/disclaimer";
const TITLE = "Disclaimer";
const DESCRIPTION = "Limits of the Image2SVG service: conversion quality, copyright responsibility and no warranty.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: `${SITE_URL}${PATH}`, title: TITLE, description: DESCRIPTION },
};

export default function DisclaimerPage() {
  return (
    <InfoPage title={TITLE} description={DESCRIPTION} path={PATH} label="Legal" updated="2026-11-16">
      <section>
        <h2>Provided as is</h2>
        <p>
          Image2SVG is provided free of charge and “as is”, without warranties of any kind. We do not guarantee that the
          service will be available at all times, uninterrupted or error-free.
        </p>
      </section>
      <section>
        <h2>Conversion results</h2>
        <p>
          Tracing turns pixels into approximate vector paths. Results depend on the source image and the settings you
          choose, and may simplify detail, merge shapes or produce complex paths. Photographs, gradients and textures
          often trace poorly. Always inspect the SVG before using it in production, print or manufacturing work.
        </p>
      </section>
      <section>
        <h2>Copyright and content responsibility</h2>
        <p>
          You are responsible for ensuring that you have the right to upload, convert and use every image you submit and
          every SVG you download. Converting an image does not change who owns it or what licence applies to it.
        </p>
      </section>
      <section>
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, the developer is not liable for any loss or damage arising from use of,
          or inability to use, the service or its output. Guides on this site are general information, not professional
          advice.
        </p>
      </section>
      <section>
        <h2>Related pages</h2>
        <p>
          See the <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.
        </p>
      </section>
    </InfoPage>
  );
}
