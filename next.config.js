// Imports:
/** @type {import('next').NextConfig} */

// Configurations:
const nextConfig = {

  // Note: This allows production builds to successfully complete even if your project has TypeScript errors.
  typescript:{
    ignoreBuildErrors: true,
  },
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ["mongoose"],
    },

    // Note: This allows production builds to successfully complete even if your project has ESLint errors.
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.clerk.com",
        },
        {
          protocol: "https",
          hostname: "images.clerk.dev",
        },
        {
          protocol: "https",
          hostname: "uploadthing.com",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
        },
        {
          protocol: "https",
          hostname: "utfs.io",
        },
      ],
    },
  };
  
  module.exports = nextConfig;