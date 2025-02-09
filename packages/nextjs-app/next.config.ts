import type { NextConfig } from "next";

const nextConfig: NextConfig = {reactStrictMode: true,
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'covers.openlibrary.org',
          },
        ],
      },
};

export default nextConfig;
