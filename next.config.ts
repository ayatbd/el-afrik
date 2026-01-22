import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: 'http',
        hostname: '10.10.20.34',
        port: '5000', // Match the port from your URL
        pathname: '/uploads/**', // Allow access to the uploads folder
      },
    ]
  },
};

export default nextConfig;
