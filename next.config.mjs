/** @type {import('next').NextConfig} */
const nextConfig = {
  // Matches the audited WordPress URLs (/product/, /our-journey/, /contact-us/)
  trailingSlash: true,
  // Never use the Vercel Image Optimization quota; responsive files are pre-generated in public/media
  images: { unoptimized: true },
  poweredByHeader: false,
  async redirects() {
    // Legacy WordPress sample post and its category archive (audit S4) → home
    return [
      { source: "/hello-world/", destination: "/", permanent: true },
      { source: "/category/blog/", destination: "/", permanent: true },
      { source: "/category/blog/:path*/", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
