import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/site/page-header";
import { NoticeTypeBadge } from "@/components/site/notice-type-badge";
import { getNotices } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/format-date";

export async function generateMetadata() {
  const t = await getTranslations("Notices");
  return { title: `${t("eyebrow")} — FETLAB` };
}

export default async function NoticesPage() {
  const t = await getTranslations("Notices");
  const notices = await getNotices();

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        {notices.length === 0 ? (
          <p className="text-muted-foreground">{t("empty")}</p>
        ) : (
          <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
            {notices.map((notice) => (
              <Link
                key={notice._id}
                href={`/notices/${notice.slug}`}
                className="flex flex-col gap-3 p-6 transition-colors hover:bg-accent/50 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <NoticeTypeBadge type={notice.type} />
                    <time className="text-sm text-muted-foreground">
                      {formatDate(notice.publishedAt)}
                    </time>
                  </div>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-balance">
                    {notice.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground text-pretty">
                    {notice.summary}
                  </p>
                </div>
                {notice.deadline && (
                  <div className="shrink-0 text-sm text-muted-foreground sm:text-right">
                    {t("deadline")}
                    <br />
                    <span className="font-medium text-foreground">
                      {formatDate(notice.deadline)}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
