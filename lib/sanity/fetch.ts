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
} from "./queries";
import {
  fallbackNotices,
  fallbackPeople,
  fallbackResearchGroups,
  fallbackSiteSettings,
} from "./fallback";
import type {
  NoticeDetail,
  NoticeSummary,
  PersonSummary,
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
