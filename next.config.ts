import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/our-services',
        destination: '/services',
        permanent: true, // Returns 301 redirect
      },
    ];
  },
};

export default nextConfig;
