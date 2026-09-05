import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { NoticeTypeBadge } from "@/components/site/notice-type-badge";
import { Prose } from "@/components/site/prose";
import { getNoticeBySlug } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/format-date";

export default async function NoticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [notice, t] = await Promise.all([getNoticeBySlug(slug), getTranslations("Notices")]);
  if (!notice) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/notices"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> {t("backToNotices")}
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <NoticeTypeBadge type={notice.type} />
        <time className="text-sm text-muted-foreground">{formatDate(notice.publishedAt)}</time>
      </div>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {notice.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground text-pretty">{notice.summary}</p>

      {notice.deadline && (
        <p className="mt-4 text-sm font-medium">
          {t("deadline")}:{" "}
          <span className="text-muted-foreground">{formatDate(notice.deadline)}</span>
        </p>
      )}

      {notice.body ? (
        <div className="mt-8">
          <Prose value={notice.body} />
        </div>
      ) : null}

      {notice.relatedGroup && (
        <p className="mt-8 text-sm text-muted-foreground">
          {t("relatedTo")}{" "}
          <Link
            href={`/research/${notice.relatedGroup.slug}`}
            className="font-medium text-foreground hover:underline"
          >
            {notice.relatedGroup.title}
          </Link>
        </p>
      )}

      {notice.applyLink && (
        <div className="mt-8">
          <Button
            nativeButton={false}
            render={
              <a href={notice.applyLink} target="_blank" rel="noopener noreferrer">
                {t("apply")}
              </a>
            }
          />
        </div>
      )}
    </article>
  );
}
