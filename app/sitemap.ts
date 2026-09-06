import type { MetadataRoute } from "next";
import { getGalleryAlbums, getNotices, getPosts, getResearchGroups } from "@/lib/sanity/fetch";
import { siteUrl } from "@/lib/site";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/research", priority: 0.9, changeFrequency: "weekly" },
  { path: "/publications", priority: 0.9, changeFrequency: "weekly" },
  { path: "/people", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/news", priority: 0.8, changeFrequency: "weekly" },
  { path: "/join", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [groups, posts, notices, albums] = await Promise.all([
    getResearchGroups(),
    getPosts(),
    getNotices(),
    getGalleryAlbums(),
  ]);

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...groups.map((group) => ({
      url: `${siteUrl}/research/${group.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...albums.map((album) => ({
      url: `${siteUrl}/gallery/${album.slug}`,
      lastModified: new Date(album.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...notices.map((notice) => ({
      url: `${siteUrl}/notices/${notice.slug}`,
      lastModified: new Date(notice.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
