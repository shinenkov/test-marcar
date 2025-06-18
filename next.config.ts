import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: 'https://plex-parser.ru-rating.ru/cars'
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ru-msk-dr3-1.store.cloud.mts.ru",
      },
    ],
  },
};

export default nextConfig;
