import type { NoticeSummary, PostSummary } from "@/lib/sanity/types";

export type NewsKind = "post" | "announcement" | "event";

export type NewsItem = {
  id: string;
  kind: NewsKind;
  title: string;
  summary: string;
  href: string;
  date: string;
  tags?: string[];
  coverImageUrl?: string | null;
  author?: { name: string; photoUrl?: string | null } | null;
};

export const NEWS_KIND_LABEL: Record<NewsKind, string> = {
  post: "Post",
  announcement: "Announcement",
  event: "Event",
};

export const NEWS_KIND_ORDER: NewsKind[] = ["post", "announcement", "event"];

/**
 * Vacancies and calls are deliberately excluded — those are application-shaped
 * and live on /join, where deadlines and apply links matter. What is left is
 * everything a reader would browse rather than apply to.
 */
export function toNewsFeed(posts: PostSummary[], notices: NoticeSummary[]): NewsItem[] {
  const fromPosts: NewsItem[] = posts.map((post) => ({
    id: post._id,
    kind: "post",
    title: post.title,
    summary: post.excerpt,
    href: `/blog/${post.slug}`,
    date: post.publishedAt,
    tags: post.tags,
    coverImageUrl: post.coverImageUrl,
    author: post.author ? { name: post.author.name, photoUrl: post.author.photoUrl } : null,
  }));

  const fromNotices: NewsItem[] = notices
    .filter((notice) => notice.type === "announcement" || notice.type === "event")
    .map((notice) => ({
      id: notice._id,
      kind: notice.type === "event" ? "event" : "announcement",
      title: notice.title,
      summary: notice.summary,
      href: `/notices/${notice.slug}`,
      date: notice.publishedAt,
    }));

  return [...fromPosts, ...fromNotices].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function matchesNews(item: NewsItem, query: string) {
  if (!query) return true;
  const haystack = [item.title, item.summary, item.author?.name, ...(item.tags ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}
