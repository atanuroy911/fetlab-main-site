import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { getResearchGroups } from "@/lib/sanity/fetch";
import type { GroupKind, ResearchGroupSummary } from "@/lib/sanity/types";

export const metadata = { title: "Research — FETLAB" };

const KIND_LABEL: Record<GroupKind, string> = {
  group: "Research Group",
  initiative: "Initiative",
  forum: "Forum",
};

const KIND_ORDER: GroupKind[] = ["group", "initiative", "forum"];

const KIND_DESCRIPTION: Record<GroupKind, string> = {
  group: "Sustained, thematic research groups within the FETLAB umbrella.",
  initiative: "Programs focused on a particular problem or ecosystem function.",
  forum: "Communities bringing people together around a shared activity.",
};

export default async function ResearchPage() {
  const groups = await getResearchGroups();
  const byKind = KIND_ORDER.map((kind) => ({
    kind,
    items: groups.filter((g) => g.kind === kind),
  })).filter((section) => section.items.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Research Groups, Initiatives & Forums"
        description="FETLAB does not put every activity into one flat list. Research groups form around sustained themes; initiatives around specific problems; forums around communities of people."
      />

      {byKind.map((section, i) => (
        <section
          key={section.kind}
          className={`mx-auto max-w-6xl px-4 pb-16 sm:px-6 ${i % 2 === 1 ? "bg-muted/30 py-10 rounded-2xl" : ""}`}
        >
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold">{KIND_LABEL[section.kind]}s</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {KIND_DESCRIPTION[section.kind]}
            </p>
          </div>
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((group) => (
              <RevealItem key={group._id}>
                <GroupCard group={group} />
              </RevealItem>
            ))}
          </Reveal>
        </section>
      ))}
    </>
  );
}

function GroupCard({ group }: { group: ResearchGroupSummary }) {
  return (
    <Link
      href={`/research/${group.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
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
        Learn more{" "}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
