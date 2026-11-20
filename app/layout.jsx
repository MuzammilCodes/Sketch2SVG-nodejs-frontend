import { Lora, Fraunces, DM_Mono } from "next/font/google";
import Script from "next/script";
import { SITE_NAME, SITE_URL, jsonLdString } from "../lib/site";
import "./globals.css";

const lora = Lora({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-lora", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["700"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-dm-mono", display: "swap" });

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const isValidGtmId =
  typeof GTM_ID === "string" && /^GTM-[A-Z0-9]+$/i.test(GTM_ID);

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free Image to SVG Converter Online | Image2SVG",
    template: "%s | Image2SVG",
  },
  description:
    "Convert PNG, JPG, BMP, GIF and WebP images into SVG vector paths online with Image2SVG. Adjust tracing settings and download your SVG for free.",
  applicationName: SITE_NAME,
  keywords: [
    "image to svg converter",
    "convert image to svg",
    "png to svg",
    "jpg to svg",
    "image to vector",
    "raster to vector converter",
    "free svg converter",
  ],
  authors: [{ name: "Image2SVG" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Free Image to SVG Converter Online | Image2SVG",
    description: "Turn raster images into SVG vector paths. Upload an image, adjust tracing settings and download your SVG.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to SVG Converter Online | Image2SVG",
    description: "Convert PNG, JPG and other supported images into SVG vector paths online.",
  },
  verification: {
    google: "YZbXQI6OEIL9yor3J53MKpDVNVRlUYQVd2GOmoE_QQM",
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#f5f0e8" };

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE_NAME, url: SITE_URL, publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: ["en", "fr", "es"] },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${fraunces.variable} ${dmMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(siteJsonLd) }} />
        {isValidGtmId && (
          <Script
            id="google-tag-manager"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({
                'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body>
        {isValidGtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
