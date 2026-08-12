import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  serverExternalPackages: ['better-sqlite3', '@prisma/adapter-better-sqlite3'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
