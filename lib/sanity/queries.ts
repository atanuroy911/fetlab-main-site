import { groq } from "next-sanity";

const personRefFields = groq`
  _id, name, "slug": slug.current, role, affiliation, email, website, socials,
  "photoUrl": photo.asset->url
`;

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
    "leaders": leaders[]->{${personRefFields}},
    "members": members[]->{${personRefFields}}
  }
`;

export const peopleListQuery = groq`
  *[_type == "person"] | order(category->order asc, order asc, name asc) {
    _id, name, "slug": slug.current, role, affiliation, bio, email, website, socials,
    "photoUrl": photo.asset->url,
    "category": category->{_id, title, "slug": slug.current, description, order}
  }
`;

export const personCategoriesQuery = groq`
  *[_type == "personCategory"] | order(order asc, title asc) {
    _id, title, "slug": slug.current, description, order
  }
`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const postsListQuery = groq`
  *[_type == "post" && isActive != false] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, publishedAt, tags,
    "coverImageUrl": coverImage.asset->url,
    "author": author->{name, "slug": slug.current, "photoUrl": photo.asset->url}
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post" && isActive != false] | order(publishedAt desc)[0...3] {
    _id, title, "slug": slug.current, excerpt, publishedAt, tags,
    "coverImageUrl": coverImage.asset->url,
    "author": author->{name, "slug": slug.current, "photoUrl": photo.asset->url}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, excerpt, body, publishedAt, tags,
    "coverImageUrl": coverImage.asset->url,
    "author": author->{name, "slug": slug.current, role, "photoUrl": photo.asset->url},
    "relatedGroup": relatedGroup->{title, "slug": slug.current}
  }
`;

export const publicationsListQuery = groq`
  *[_type == "publication"] | order(year desc, title asc) {
    _id, title, authors, year, venue, type, tags, doiUrl, pdfUrl,
    "relatedGroup": relatedGroup->{title, "slug": slug.current}
  }
`;

export const publicationsByGroupQuery = groq`
  *[_type == "publication" && relatedGroup->slug.current == $slug] | order(year desc, title asc) {
    _id, title, authors, year, venue, type, tags, doiUrl, pdfUrl,
    "relatedGroup": relatedGroup->{title, "slug": slug.current}
  }
`;

export const postsByGroupQuery = groq`
  *[_type == "post" && isActive != false && relatedGroup->slug.current == $slug] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, publishedAt, tags,
    "coverImageUrl": coverImage.asset->url
  }
`;

export const noticesByGroupQuery = groq`
  *[_type == "notice" && isActive != false && relatedGroup->slug.current == $slug] | order(publishedAt desc) {
    _id, title, "slug": slug.current, type, summary, publishedAt, deadline
  }
`;

export const galleryAlbumsListQuery = groq`
  *[_type == "galleryAlbum" && isActive != false] | order(date desc) {
    _id, title, "slug": slug.current, date, description, location,
    "coverUrl": coalesce(coverImage.asset->url, images[0].asset->url),
    "coverLqip": coalesce(coverImage.asset->metadata.lqip, images[0].asset->metadata.lqip),
    "imageCount": count(images),
    "relatedGroup": relatedGroup->{title, "slug": slug.current}
  }
`;

export const galleryAlbumBySlugQuery = groq`
  *[_type == "galleryAlbum" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, date, description, location,
    "coverUrl": coalesce(coverImage.asset->url, images[0].asset->url),
    "coverLqip": coalesce(coverImage.asset->metadata.lqip, images[0].asset->metadata.lqip),
    "imageCount": count(images),
    "relatedGroup": relatedGroup->{title, "slug": slug.current},
    "images": images[]{
      alt, caption,
      "url": asset->url,
      "lqip": asset->metadata.lqip,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`;
