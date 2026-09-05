import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Prose } from "@/components/site/prose";
import { Avatar } from "@/components/site/avatar";
import { getResearchGroupBySlug } from "@/lib/sanity/fetch";
import type { GroupKind } from "@/lib/sanity/types";

export default async function ResearchGroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [group, t] = await Promise.all([
    getResearchGroupBySlug(slug),
    getTranslations("Research"),
  ]);
  if (!group) notFound();

  const kindLabelFull: Record<GroupKind, string> = {
    group: t("kindGroup"),
    initiative: t("kindInitiativeFull"),
    forum: t("kindForumFull"),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/research"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> {t("backToResearch")}
      </Link>

      <p className="mt-6 flex items-center gap-2 text-sm font-medium tracking-wide text-primary uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {kindLabelFull[group.kind]}
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
                {group.leaders.length > 1 ? t("groupLeaders") : t("groupLeader")}
              </h2>
              <ul className="mt-4 space-y-4">
                {group.leaders.map((p) => (
                  <li key={p._id} className="flex items-center gap-3">
                    <Avatar name={p.name} photoUrl={p.photoUrl} size={40} />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {group.members && group.members.length > 0 && (
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {t("members")}
              </h2>
              <ul className="mt-4 space-y-4">
                {group.members.map((p) => (
                  <li key={p._id} className="flex items-center gap-3">
                    <Avatar name={p.name} photoUrl={p.photoUrl} size={40} />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
