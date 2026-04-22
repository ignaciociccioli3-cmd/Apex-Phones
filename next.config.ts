import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Static export solo para GitHub Pages — Vercel usa su propio pipeline
  ...(isGithubPages && {
    output: "export",
    trailingSlash: true,
    basePath: "/Apex-Phones",
  }),
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
