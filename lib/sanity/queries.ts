import { groq } from "next-sanity";

export const noticesListQuery = groq`
  *[_type == "notice" && isActive != false] | order(publishedAt desc) {
    _id, title, "slug": slug.current, type, summary, publishedAt, deadline
  }
`;

export const noticeBySlugQuery = groq`
  *[_type == "notice" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, type, summary, body, publishedAt, deadline, applyLink,
    "relatedGroup": relatedGroup->{title, "slug": slug.current}
  }
`;

export const recentNoticesQuery = groq`
  *[_type == "notice" && isActive != false] | order(publishedAt desc)[0...3] {
    _id, title, "slug": slug.current, type, summary, publishedAt, deadline
  }
`;

export const researchGroupsListQuery = groq`
  *[_type == "researchGroup"] | order(order asc) {
    _id, title, shortTitle, "slug": slug.current, kind, summary, themes, isFeatured
  }
`;

export const featuredResearchGroupsQuery = groq`
  *[_type == "researchGroup" && isFeatured == true] | order(order asc) {
    _id, title, shortTitle, "slug": slug.current, kind, summary, themes
  }
`;

export const researchGroupBySlugQuery = groq`
  *[_type == "researchGroup" && slug.current == $slug][0] {
    _id, title, shortTitle, "slug": slug.current, kind, summary, description, themes,
    "leaders": leaders[]->{_id, name, "slug": slug.current, role, affiliation, "photoUrl": photo.asset->url},
    "members": members[]->{_id, name, "slug": slug.current, role, affiliation, "photoUrl": photo.asset->url}
  }
`;

export const peopleListQuery = groq`
  *[_type == "person"] | order(category asc, order asc) {
    _id, name, "slug": slug.current, role, affiliation, category, bio,
    "photoUrl": photo.asset->url
  }
`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;
