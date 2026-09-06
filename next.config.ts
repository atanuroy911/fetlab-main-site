import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // /blog and /notices merged into /news. The detail routes are unchanged, so
  // existing links to individual posts and notices keep working.
  async redirects() {
    return [
      { source: "/blog", destination: "/news", permanent: true },
      { source: "/notices", destination: "/news", permanent: true },
    ];
  },
};

// Enables Cloudflare bindings (env vars, KV, etc.) when running `next dev`.
initOpenNextCloudflareForDev();

export default nextConfig;
