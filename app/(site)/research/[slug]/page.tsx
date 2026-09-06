import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Prose } from "@/components/site/prose";
import { Avatar } from "@/components/site/avatar";
import { PersonLinks } from "@/components/site/person-links";
import { NoticeTypeBadge } from "@/components/site/notice-type-badge";
import type { Metadata } from "next";
import {
  getResearchGroupBySlug,
  getPublicationsByGroup,
  getPostsByGroup,
  getNoticesByGroup,
} from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/format-date";
import type { GroupKind } from "@/lib/sanity/types";

const KIND_LABEL_FULL: Record<GroupKind, string> = {
  group: "Research Group",
  initiative: "Research / Innovation Initiative",
  forum: "Community Forum",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const group = await getResearchGroupBySlug(slug);
  if (!group) return { title: "Not found" };
  return {
    title: group.title,
    description: group.summary,
    alternates: { canonical: `/research/${slug}` },
    openGraph: {
      title: group.title,
      description: group.summary,
      url: `/research/${slug}`,
    },
  };
}

export default async function ResearchGroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [group, publications, posts, notices] = await Promise.all([
    getResearchGroupBySlug(slug),
    getPublicationsByGroup(slug),
    getPostsByGroup(slug),
    getNoticesByGroup(slug),
  ]);
  if (!group) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/research"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Research
      </Link>

      <p className="mt-6 flex items-center gap-2 text-sm font-medium tracking-wide text-primary uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {KIND_LABEL_FULL[group.kind]}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {group.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground text-pretty">{group.summary}</p>

      {group.themes && group.themes.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {group.themes.map((theme) => (
            <Badge key={theme} variant="secondary" className="font-normal">
              {theme}
            </Badge>
          ))}
        </div>
      )}

      {group.description ? (
        <div className="mt-10">
          <Prose value={group.description} />
        </div>
      ) : null}

      {((group.leaders && group.leaders.length > 0) ||
        (group.members && group.members.length > 0)) && (
        <div className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-2">
          {group.leaders && group.leaders.length > 0 && (
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {group.leaders.length > 1 ? "Group Leaders" : "Group Leader"}
              </h2>
              <ul className="mt-4 space-y-4">
                {group.leaders.map((p) => (
                  <li key={p._id} className="flex items-center gap-3">
                    <Avatar name={p.name} photoUrl={p.photoUrl} size={40} />
                    <div className="flex-1">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.role}</p>
                    </div>
                    <PersonLinks email={p.email} website={p.website} socials={p.socials} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {group.members && group.members.length > 0 && (
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Members
              </h2>
              <ul className="mt-4 space-y-4">
                {group.members.map((p) => (
                  <li key={p._id} className="flex items-center gap-3">
                    <Avatar name={p.name} photoUrl={p.photoUrl} size={40} />
                    <div className="flex-1">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.role}</p>
                    </div>
                    <PersonLinks email={p.email} website={p.website} socials={p.socials} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {publications.length > 0 && (
        <div className="mt-12 border-t border-border pt-10">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Publications
          </h2>
          <ul className="mt-4 space-y-3">
            {publications.map((pub) => (
              <li key={pub._id}>
                <p className="font-medium text-balance">{pub.title}</p>
                <p className="text-sm text-muted-foreground">
                  {pub.authors.join(", ")} · {pub.year}
                  {pub.venue ? ` · ${pub.venue}` : ""}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/publications"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
          >
            View all publications <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {posts.length > 0 && (
        <div className="mt-12 border-t border-border pt-10">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            From the Blog
          </h2>
          <ul className="mt-4 space-y-3">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium text-balance hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {notices.length > 0 && (
        <div className="mt-12 border-t border-border pt-10">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Related Notices
          </h2>
          <ul className="mt-4 space-y-3">
            {notices.map((notice) => (
              <li key={notice._id} className="flex items-center gap-3">
                <NoticeTypeBadge type={notice.type} />
                <Link href={`/notices/${notice.slug}`} className="font-medium hover:underline">
                  {notice.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
