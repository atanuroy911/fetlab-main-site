import { client, isSanityConfigured } from "./client";
import {
  noticesListQuery,
  noticeBySlugQuery,
  recentNoticesQuery,
  researchGroupsListQuery,
  featuredResearchGroupsQuery,
  researchGroupBySlugQuery,
  peopleListQuery,
  siteSettingsQuery,
  postsListQuery,
  recentPostsQuery,
  postBySlugQuery,
  publicationsListQuery,
  publicationsByGroupQuery,
  postsByGroupQuery,
  noticesByGroupQuery,
} from "./queries";
import {
  fallbackNotices,
  fallbackPeople,
  fallbackPosts,
  fallbackPublications,
  fallbackResearchGroups,
  fallbackSiteSettings,
} from "./fallback";
import type {
  NoticeDetail,
  NoticeSummary,
  PersonSummary,
  PostDetail,
  PostSummary,
  Publication,
  ResearchGroupDetail,
  ResearchGroupSummary,
  SiteSettings,
} from "./types";

function fallbackGroupDetail(slug: string): ResearchGroupDetail | null {
  const group = fallbackResearchGroups.find((g) => g.slug === slug);
  if (!group) return null;
  return { ...group, leaders: [], members: [] };
}

function fallbackNoticeDetail(slug: string): NoticeDetail | null {
  const notice = fallbackNotices.find((n) => n.slug === slug);
  if (!notice) return null;
  return { ...notice, relatedGroup: null, applyLink: null };
}

function fallbackPostDetail(slug: string): PostDetail | null {
  const post = fallbackPosts.find((p) => p.slug === slug);
  if (!post) return null;
  return { ...post, relatedGroup: null };
}

async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const result = await client.fetch<T>(query, params);
    if (result === null || (Array.isArray(result) && result.length === 0)) return fallback;
    return result;
  } catch (err) {
    console.error("Sanity fetch failed, using fallback content:", err);
    return fallback;
  }
}

export const getSiteSettings = () =>
  safeFetch<SiteSettings>(siteSettingsQuery, {}, fallbackSiteSettings);

export const getNotices = () =>
  safeFetch<NoticeSummary[]>(noticesListQuery, {}, fallbackNotices);

export const getRecentNotices = () =>
  safeFetch<NoticeSummary[]>(recentNoticesQuery, {}, fallbackNotices.slice(0, 3));

export const getNoticeBySlug = (slug: string) =>
  safeFetch<NoticeDetail | null>(noticeBySlugQuery, { slug }, fallbackNoticeDetail(slug));

export const getResearchGroups = () =>
  safeFetch<ResearchGroupSummary[]>(researchGroupsListQuery, {}, fallbackResearchGroups);

export const getFeaturedResearchGroups = () =>
  safeFetch<ResearchGroupSummary[]>(
    featuredResearchGroupsQuery,
    {},
    fallbackResearchGroups.filter((g) => g.isFeatured)
  );

export const getResearchGroupBySlug = (slug: string) =>
  safeFetch<ResearchGroupDetail | null>(
    researchGroupBySlugQuery,
    { slug },
    fallbackGroupDetail(slug)
  );

export const getPeople = () => safeFetch<PersonSummary[]>(peopleListQuery, {}, fallbackPeople);

export const getPosts = () => safeFetch<PostSummary[]>(postsListQuery, {}, fallbackPosts);

export const getRecentPosts = () =>
  safeFetch<PostSummary[]>(recentPostsQuery, {}, fallbackPosts.slice(0, 3));

export const getPostBySlug = (slug: string) =>
  safeFetch<PostDetail | null>(postBySlugQuery, { slug }, fallbackPostDetail(slug));

export const getPublications = () =>
  safeFetch<Publication[]>(publicationsListQuery, {}, fallbackPublications);

export const getPublicationsByGroup = (slug: string) =>
  safeFetch<Publication[]>(publicationsByGroupQuery, { slug }, []);

export const getPostsByGroup = (slug: string) =>
  safeFetch<PostSummary[]>(postsByGroupQuery, { slug }, []);

export const getNoticesByGroup = (slug: string) =>
  safeFetch<NoticeSummary[]>(noticesByGroupQuery, { slug }, []);
