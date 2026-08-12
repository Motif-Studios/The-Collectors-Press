import type { NextConfig } from "next";

function getSupabaseHostname() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url) {
    return null;
  }

  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "eu.ui-avatars.com",
      },
      ...(getSupabaseHostname()
        ? [{ protocol: "https" as const, hostname: getSupabaseHostname()! }]
        : []),
    ],
  },
  async rewrites() {
    // Only add local API proxy when a dev API URL is configured and not in production
    const devApi = process.env.NEXT_PUBLIC_BASE_URL_DEV;
    if (devApi && process.env.NODE_ENV !== "production") {
      return [
        {
          source: "/api/:path*",
          destination: `${devApi}/:path*`,
        },
      ];
    }

    return [];
  },
};

export default nextConfig;
