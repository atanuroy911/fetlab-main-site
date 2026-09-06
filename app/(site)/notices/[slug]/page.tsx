import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoticeTypeBadge } from "@/components/site/notice-type-badge";
import { NoticeStatusBadge } from "@/components/site/notice-status-badge";
import { noticeStatus } from "@/lib/notice-status";
import { Prose } from "@/components/site/prose";
import type { Metadata } from "next";
import { getNoticeBySlug } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/format-date";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const notice = await getNoticeBySlug(slug);
  if (!notice) return { title: "Notice not found" };
  return {
    title: notice.title,
    description: notice.summary,
    alternates: { canonical: `/notices/${slug}` },
    openGraph: {
      type: "article",
      title: notice.title,
      description: notice.summary,
      url: `/notices/${slug}`,
      publishedTime: notice.publishedAt,
    },
  };
}

export default async function NoticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const notice = await getNoticeBySlug(slug);
  if (!notice) notFound();
  const closed = noticeStatus(notice.deadline) === "closed";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/news"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to News
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <NoticeTypeBadge type={notice.type} />
        <NoticeStatusBadge deadline={notice.deadline} />
        <time className="text-sm text-muted-foreground">{formatDate(notice.publishedAt)}</time>
      </div>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {notice.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground text-pretty">{notice.summary}</p>

      {notice.deadline && (
        <p className="mt-4 text-sm font-medium">
          {closed ? "Closed on" : "Deadline"}:{" "}
          <span className="text-muted-foreground">{formatDate(notice.deadline)}</span>
        </p>
      )}

      {closed && (
        <p className="mt-6 rounded-md border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          This opportunity has closed. See{" "}
          <Link href="/join" className="font-medium text-foreground hover:underline">
            current opportunities
          </Link>{" "}
          for what is open now.
        </p>
      )}

      {notice.body ? (
        <div className="mt-8">
          <Prose value={notice.body} />
        </div>
      ) : null}

      {notice.relatedGroup && (
        <p className="mt-8 text-sm text-muted-foreground">
          Related to{" "}
          <Link
            href={`/research/${notice.relatedGroup.slug}`}
            className="font-medium text-foreground hover:underline"
          >
            {notice.relatedGroup.title}
          </Link>
        </p>
      )}

      {notice.applyLink && !closed && (
        <div className="mt-8">
          <Button
            nativeButton={false}
            render={
              <a href={notice.applyLink} target="_blank" rel="noopener noreferrer">
                Apply / Learn More
              </a>
            }
          />
        </div>
      )}
    </article>
  );
}
