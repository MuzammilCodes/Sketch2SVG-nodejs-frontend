import Converter from "./Converter";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sketch2svg.netlify.app";

export const metadata = {
  title: "Convert Image to SVG Online Free | Sketch2SVG",
  description:
    "Convert PNG, JPG, BMP, or any image to SVG instantly. Free online image to SVG converter with clean scalable output. No login, no watermark.",
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    title: "Convert Image to SVG Online Free | Sketch2SVG",
    description:
      "Upload PNG, JPG, BMP, or any image and convert it into clean, scalable SVG in seconds. No login. No watermark.",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Sketch2SVG",
  url: SITE_URL,
  applicationCategory: "DesignApplication",
  operatingSystem: "Any (web)",
  description:
    "Free online image and sketch to SVG converter. Upload PNG, JPG, BMP, GIF, or WebP and get clean scalable vector output instantly.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <Converter />
    </>
  );
}
