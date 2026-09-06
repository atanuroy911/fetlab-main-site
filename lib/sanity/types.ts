export type NoticeType = "vacancy" | "call" | "announcement" | "event";

export type NoticeSummary = {
  _id: string;
  title: string;
  slug: string;
  type: NoticeType;
  summary: string;
  publishedAt: string;
  deadline?: string | null;
};

export type NoticeDetail = NoticeSummary & {
  body?: unknown;
  applyLink?: string | null;
  relatedGroup?: { title: string; slug: string } | null;
};

export type GroupKind = "group" | "initiative" | "forum";

export type Socials = {
  linkedin?: string | null;
  twitter?: string | null;
  github?: string | null;
  scholar?: string | null;
};

export type PersonRef = {
  _id: string;
  name: string;
  slug: string;
  role: string;
  affiliation?: string | null;
  photoUrl?: string | null;
  email?: string | null;
  website?: string | null;
  socials?: Socials | null;
};

export type ResearchGroupSummary = {
  _id: string;
  title: string;
  shortTitle?: string | null;
  slug: string;
  kind: GroupKind;
  summary: string;
  themes?: string[];
  isFeatured?: boolean;
};

export type ResearchGroupDetail = ResearchGroupSummary & {
  description?: unknown;
  leaders?: PersonRef[];
  members?: PersonRef[];
};

export type PersonCategory = "leadership" | "core" | "researcher" | "student" | "collaborator";

export type PersonSummary = {
  _id: string;
  name: string;
  slug: string;
  role: string;
  affiliation?: string | null;
  category: PersonCategory;
  bio?: string | null;
  photoUrl?: string | null;
  email?: string | null;
  website?: string | null;
  socials?: Socials | null;
};

export type PostAuthor = {
  name: string;
  slug: string;
  role?: string | null;
  photoUrl?: string | null;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags?: string[];
  coverImageUrl?: string | null;
  author?: PostAuthor | null;
};

export type PostDetail = PostSummary & {
  body?: unknown;
  relatedGroup?: { title: string; slug: string } | null;
};

export type PublicationType = "journal" | "conference" | "preprint" | "thesis" | "report";

export type Publication = {
  _id: string;
  title: string;
  authors: string[];
  year: number;
  venue?: string | null;
  type: PublicationType;
  tags?: string[];
  doiUrl?: string | null;
  pdfUrl?: string | null;
  relatedGroup?: { title: string; slug: string } | null;
};

export type SiteSettings = {
  title?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  whatIsFetlab?: string;
  mission?: string;
  vision?: string;
  contactEmail?: string;
};
