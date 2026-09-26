import path from "path";
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
  // Pin the project root. Without this Next picks up a stray lockfile higher up
  // (e.g. in the user's home folder) and Turbopack scans/watches that whole tree,
  // which makes the first dev load extremely slow.
  turbopack: {
    root: path.join(__dirname),
  },
  outputFileTracingRoot: path.join(__dirname),
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
