import { Lora, Fraunces, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sketch2svg.netlify.app";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Convert Image to SVG Online Free | Sketch2SVG",
    template: "%s | Sketch2SVG",
  },
  description:
    "Convert PNG, JPG, BMP, or any image to SVG instantly. Free online image to SVG converter with clean scalable output.",
  applicationName: "Sketch2SVG",
  keywords: [
    "image to svg",
    "convert image to svg",
    "png to svg",
    "jpg to svg",
    "sketch to svg",
    "svg converter",
    "online svg converter",
    "free svg converter",
  ],
  authors: [{ name: "Mohammed Muzammil Uddin" }],
  creator: "Mohammed Muzammil Uddin",
  publisher: "Sketch2SVG",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sketch2SVG",
    title: "Convert Image to SVG Online Free | Sketch2SVG",
    description:
      "Upload PNG, JPG, BMP, or any image and convert it into clean, scalable SVG in seconds. No login. No watermark.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Image to SVG Online Free | Sketch2SVG",
    description:
      "Upload PNG, JPG, BMP, or any image and convert it into clean, scalable SVG in seconds.",
  },
  verification: {
    google: "YZbXQI6OEIL9yor3J53MKpDVNVRlUYQVd2GOmoE_QQM",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f0e8",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sketch2SVG",
  url: SITE_URL,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${fraunces.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        {children}

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
