/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Output a fully Node.js server (default) so SSR is available for every route.
  // Use `next start` (or any Node.js host) to serve.
};

export default nextConfig;
