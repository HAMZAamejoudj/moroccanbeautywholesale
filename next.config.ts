import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
