/**
 * Canonical origin for the deployed site. Set NEXT_PUBLIC_SITE_URL in the
 * environment (and in wrangler.jsonc `vars`) once the domain is final —
 * metadata, sitemap, and robots all derive their absolute URLs from it.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://fetlab.org"
).replace(/\/$/, "");

export const siteName = "FETLAB";

export const siteDescription =
  "An open, multidisciplinary research, innovation, and collaboration platform exploring emerging technologies and addressing complex challenges.";
