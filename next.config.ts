import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Photos uploaded through the admin (Vercel Blob storage in production)
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Placeholder photography — remove once all demo images are replaced
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
