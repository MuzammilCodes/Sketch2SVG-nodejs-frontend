/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      // Temporary: the root becomes a real homepage once more converters exist.
      { source: "/", destination: "/image-to-svg-converter", permanent: false },
      { source: "/blog/sketch-to-svg-guide", destination: "/image-to-svg-converter/blog/image-to-vector-guide", permanent: true },
      { source: "/blog/:slug", destination: "/image-to-svg-converter/blog/:slug", permanent: true },
      { source: "/best-free-svg-converter-2027", destination: "/image-to-svg-converter/best-free-svg-converter-2027", permanent: true },
      { source: "/es", destination: "/image-to-svg-converter/es", permanent: true },
      { source: "/fr", destination: "/image-to-svg-converter/fr", permanent: true },
      { source: "/imagetosvgconverter/:path*", destination: "/image-to-svg-converter/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
