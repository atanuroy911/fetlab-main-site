import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/site/page-header";
import { Avatar } from "@/components/site/avatar";
import { getPeople } from "@/lib/sanity/fetch";
import type { PersonCategory, PersonSummary } from "@/lib/sanity/types";

export async function generateMetadata() {
  const t = await getTranslations("People");
  return { title: `${t("eyebrow")} — FETLAB` };
}

const CATEGORY_ORDER: PersonCategory[] = [
  "leadership",
  "core",
  "researcher",
  "student",
  "collaborator",
];

export default async function PeoplePage() {
  const t = await getTranslations("People");
  const people = await getPeople();
  const byCategory = CATEGORY_ORDER.map((category) => ({
    category,
    items: people.filter((p) => p.category === category),
  })).filter((section) => section.items.length > 0);

  const categoryLabel: Record<PersonCategory, string> = {
    leadership: t("categoryLeadership"),
    core: t("categoryCore"),
    researcher: t("categoryResearcher"),
    student: t("categoryStudent"),
    collaborator: t("categoryCollaborator"),
  };

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      {byCategory.map((section) => (
        <section key={section.category} className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
          <h2 className="mb-8 font-heading text-xl font-semibold">
            {categoryLabel[section.category]}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((person) => (
              <PersonCard key={person._id} person={person} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function PersonCard({ person }: { person: PersonSummary }) {
  return (
    <div className="flex gap-4 rounded-lg border border-border p-6">
      <Avatar name={person.name} photoUrl={person.photoUrl} size={56} />
      <div>
        <h3 className="font-heading text-lg font-semibold">{person.name}</h3>
        <p className="mt-1 text-sm font-medium text-primary">{person.role}</p>
        {person.affiliation && (
          <p className="mt-1 text-sm text-muted-foreground">{person.affiliation}</p>
        )}
        {person.bio && <p className="mt-3 text-sm text-muted-foreground">{person.bio}</p>}
      </div>
    </div>
  );
}
