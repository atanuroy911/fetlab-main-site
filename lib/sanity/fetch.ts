import { client, isSanityConfigured } from "./client";
import {
  noticesListQuery,
  noticeBySlugQuery,
  recentNoticesQuery,
  researchGroupsListQuery,
  featuredResearchGroupsQuery,
  researchGroupBySlugQuery,
  peopleListQuery,
  personCategoriesQuery,
  siteSettingsQuery,
  postsListQuery,
  recentPostsQuery,
  postBySlugQuery,
  publicationsListQuery,
  publicationsByGroupQuery,
  postsByGroupQuery,
  noticesByGroupQuery,
  galleryAlbumsListQuery,
  galleryAlbumBySlugQuery,
} from "./queries";
import type {
  NoticeDetail,
  NoticeSummary,
  GalleryAlbumDetail,
  GalleryAlbumSummary,
  PersonCategory,
  PersonSummary,
  PostDetail,
  PostSummary,
  Publication,
  ResearchGroupDetail,
  ResearchGroupSummary,
  SiteSettings,
} from "./types";

/**
 * All content comes from Sanity. When the project is unconfigured or a fetch
 * fails, callers get an empty result and render their own empty state — no
 * placeholder content is ever shown as if it were real.
 */
async function safeFetch<T>(query: string, params: Record<string, unknown>, empty: T): Promise<T> {
  if (!isSanityConfigured) return empty;
  try {
    const result = await client.fetch<T>(query, params);
    return result ?? empty;
  } catch (err) {
    console.error("Sanity fetch failed:", err);
    return empty;
  }
}

export const getSiteSettings = () => safeFetch<SiteSettings>(siteSettingsQuery, {}, {});

export const getNotices = () => safeFetch<NoticeSummary[]>(noticesListQuery, {}, []);

export const getRecentNotices = () => safeFetch<NoticeSummary[]>(recentNoticesQuery, {}, []);

export const getNoticeBySlug = (slug: string) =>
  safeFetch<NoticeDetail | null>(noticeBySlugQuery, { slug }, null);

export const getResearchGroups = () =>
  safeFetch<ResearchGroupSummary[]>(researchGroupsListQuery, {}, []);

export const getFeaturedResearchGroups = () =>
  safeFetch<ResearchGroupSummary[]>(featuredResearchGroupsQuery, {}, []);

export const getResearchGroupBySlug = (slug: string) =>
  safeFetch<ResearchGroupDetail | null>(researchGroupBySlugQuery, { slug }, null);

export const getPeople = () => safeFetch<PersonSummary[]>(peopleListQuery, {}, []);

export const getPersonCategories = () =>
  safeFetch<PersonCategory[]>(personCategoriesQuery, {}, []);

export const getPosts = () => safeFetch<PostSummary[]>(postsListQuery, {}, []);

export const getRecentPosts = () => safeFetch<PostSummary[]>(recentPostsQuery, {}, []);

export const getPostBySlug = (slug: string) =>
  safeFetch<PostDetail | null>(postBySlugQuery, { slug }, null);

export const getPublications = () => safeFetch<Publication[]>(publicationsListQuery, {}, []);

export const getPublicationsByGroup = (slug: string) =>
  safeFetch<Publication[]>(publicationsByGroupQuery, { slug }, []);

export const getPostsByGroup = (slug: string) =>
  safeFetch<PostSummary[]>(postsByGroupQuery, { slug }, []);

export const getNoticesByGroup = (slug: string) =>
  safeFetch<NoticeSummary[]>(noticesByGroupQuery, { slug }, []);

export const getGalleryAlbums = () =>
  safeFetch<GalleryAlbumSummary[]>(galleryAlbumsListQuery, {}, []);

export const getGalleryAlbumBySlug = (slug: string) =>
  safeFetch<GalleryAlbumDetail | null>(galleryAlbumBySlugQuery, { slug }, null);
