import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/site/page-header";
import { Badge } from "@/components/ui/badge";
import { getResearchGroups } from "@/lib/sanity/fetch";
import type { GroupKind, ResearchGroupSummary } from "@/lib/sanity/types";

export async function generateMetadata() {
  const t = await getTranslations("Research");
  return { title: `${t("eyebrow")} — FETLAB` };
}

const KIND_ORDER: GroupKind[] = ["group", "initiative", "forum"];

export default async function ResearchPage() {
  const t = await getTranslations("Research");
  const tHome = await getTranslations("Home");
  const groups = await getResearchGroups();
  const byKind = KIND_ORDER.map((kind) => ({
    kind,
    items: groups.filter((g) => g.kind === kind),
  })).filter((section) => section.items.length > 0);

  const kindLabelPlural: Record<GroupKind, string> = {
    group: t("kindGroupPlural"),
    initiative: t("kindInitiativePlural"),
    forum: t("kindForumPlural"),
  };
  const kindDescription: Record<GroupKind, string> = {
    group: t("kindGroupDesc"),
    initiative: t("kindInitiativeDesc"),
    forum: t("kindForumDesc"),
  };

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      {byKind.map((section) => (
        <section key={section.kind} className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold">
              {kindLabelPlural[section.kind]}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {kindDescription[section.kind]}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((group) => (
              <GroupCard key={group._id} group={group} learnMoreLabel={tHome("learnMore")} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function GroupCard({
  group,
  learnMoreLabel,
}: {
  group: ResearchGroupSummary;
  learnMoreLabel: string;
}) {
  return (
    <Link
      href={`/research/${group.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border p-6 transition-colors hover:border-primary/40"
    >
      <span
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand-2))" }}
      />
      <h3 className="font-heading text-lg font-semibold text-balance">
        {group.shortTitle || group.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">{group.summary}</p>
      {group.themes && group.themes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {group.themes.slice(0, 4).map((theme) => (
            <Badge key={theme} variant="secondary" className="font-normal">
              {theme}
            </Badge>
          ))}
        </div>
      )}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-foreground">
        {learnMoreLabel} <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
