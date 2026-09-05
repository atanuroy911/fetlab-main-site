import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  getFeaturedResearchGroups,
  getPeople,
  getRecentNotices,
  getResearchGroups,
  getSiteSettings,
} from "@/lib/sanity/fetch";
import { NoticeTypeBadge } from "@/components/site/notice-type-badge";
import { ModelLoop } from "@/components/site/model-loop";
import { formatDate } from "@/lib/format-date";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const tResearch = await getTranslations("Research");
  const [settings, groups, allGroups, notices, people] = await Promise.all([
    getSiteSettings(),
    getFeaturedResearchGroups(),
    getResearchGroups(),
    getRecentNotices(),
    getPeople(),
  ]);

  const stats = [
    { label: t("statGroups"), value: `${allGroups.length}+` },
    { label: t("statPeople"), value: `${people.length}+` },
    { label: t("statFounded"), value: "2024" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black_10%,transparent_70%)] opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-6 sm:pt-28 sm:pb-20">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-medium tracking-wide text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-6xl">
              <span className="text-brand-gradient">{settings.heroHeadline}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground text-pretty sm:text-lg">
              {settings.heroSubtext}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <Link href="/research">
                    {t("ctaExplore")} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                }
              />
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/contact">{t("ctaCollaborate")}</Link>}
              />
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-3 border-t border-border pt-8 sm:mt-16 sm:gap-6 sm:max-w-xl">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs text-muted-foreground text-pretty">{stat.label}</dt>
                <dd className="mt-1 font-heading text-xl font-semibold text-brand-gradient sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px w-full bg-border" />
      </div>

      {/* What is FETLAB */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-[200px_1fr]">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {t("whatIsFetlab")}
          </h2>
          <p className="max-w-2xl font-heading text-xl leading-snug text-pretty sm:text-2xl">
            {settings.whatIsFetlab}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px w-full bg-border" />
      </div>

      {/* The FETLAB Model */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-[200px_1fr]">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {t("modelTitle")}
          </h2>
          <div>
            <p className="max-w-2xl text-muted-foreground">{t("modelDesc")}</p>
            <div className="mt-10">
              <ModelLoop />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px w-full bg-border" />
      </div>

      {/* Research Groups */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {t("researchTitle")}
            </h2>
            <p className="mt-2 max-w-xl font-heading text-xl">{t("researchDesc")}</p>
          </div>
          <Link
            href="/research"
            className="hidden shrink-0 text-sm font-medium text-foreground hover:underline sm:block"
          >
            {t("viewAllResearch")} →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Link
              key={group._id}
              href={`/research/${group.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-border p-6 transition-colors hover:border-primary/40"
            >
              <span
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{
                  backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand-2))",
                }}
              />
              <span className="text-xs font-medium tracking-wide text-primary uppercase">
                {group.kind === "group"
                  ? tResearch("kindGroup")
                  : group.kind === "initiative"
                  ? tResearch("kindInitiative")
                  : tResearch("kindForum")}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-balance">
                {group.shortTitle || group.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">
                {group.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-foreground">
                {t("learnMore")} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/research"
          className="mt-8 block text-sm font-medium text-foreground hover:underline sm:hidden"
        >
          {t("viewAllResearch")} →
        </Link>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px w-full bg-border" />
      </div>

      {/* Notices */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {t("noticesTitle")}
            </h2>
            <p className="mt-2 max-w-xl font-heading text-xl">{t("noticesDesc")}</p>
          </div>
          <Link
            href="/notices"
            className="hidden shrink-0 text-sm font-medium text-foreground hover:underline sm:block"
          >
            {t("viewAllNotices")} →
          </Link>
        </div>
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
          {notices.map((notice) => (
            <Link
              key={notice._id}
              href={`/notices/${notice.slug}`}
              className="flex flex-col gap-2 p-6 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <NoticeTypeBadge type={notice.type} />
                <h3 className="font-medium text-balance">{notice.title}</h3>
              </div>
              <time className="shrink-0 text-sm text-muted-foreground">
                {formatDate(notice.publishedAt)}
              </time>
            </Link>
          ))}
        </div>
        <Link
          href="/notices"
          className="mt-8 block text-sm font-medium text-foreground hover:underline sm:hidden"
        >
          {t("viewAllNotices")} →
        </Link>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px w-full bg-border" />
      </div>

      {/* Collaborate CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
        <div
          className="relative overflow-hidden rounded-2xl border border-border px-8 py-14 text-center sm:px-16"
          style={{
            backgroundImage:
              "radial-gradient(120% 100% at 50% 0%, color-mix(in oklch, var(--brand) 8%, var(--card)), var(--card))",
          }}
        >
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            {t("collaborateTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("collaborateDesc")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/contact">{t("getInTouch")}</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/notices">{t("seeOpportunities")}</Link>}
            />
          </div>
        </div>
      </section>
    </>
  );
}
