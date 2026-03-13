import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["img.freepik.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // разрешаем все хосты
      },
    ],
  }
};

export default nextConfig;
