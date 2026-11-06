/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: "/blog/sketch-to-svg-guide",
        destination: "/blog/image-to-vector-guide",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
