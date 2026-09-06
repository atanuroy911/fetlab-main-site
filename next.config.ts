import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

// Enables Cloudflare bindings (env vars, KV, etc.) when running `next dev`.
initOpenNextCloudflareForDev();

export default nextConfig;
