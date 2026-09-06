import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { Avatar } from "@/components/site/avatar";
import { PersonLinks } from "@/components/site/person-links";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { PeopleFilters, type FilterCategory } from "@/components/site/people-filters";
import { getPeople, getPersonCategories } from "@/lib/sanity/fetch";
import type { PersonSummary } from "@/lib/sanity/types";

export const metadata = {
  title: "People",
  description:
    "Founders, leadership, researchers, students, and collaborators in the FETLAB network.",
  alternates: { canonical: "/people" },
  openGraph: {
    title: "People — FETLAB",
    description:
      "Founders, leadership, researchers, students, and collaborators in the FETLAB network.",
    url: "/people",
  },
};

const UNCATEGORISED = "__other__";

function matches(person: PersonSummary, query: string) {
  if (!query) return true;
  const haystack = [person.name, person.role, person.affiliation, person.bio, person.category?.title]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const [{ q, category }, people, categories] = await Promise.all([
    searchParams,
    getPeople(),
    getPersonCategories(),
  ]);
  const query = (q ?? "").trim();
  const activeCategory = category ?? "all";

  // Only offer categories that actually have people in them.
  const counts = new Map<string, number>();
  people.forEach((p) => {
    const key = p.category?.slug ?? UNCATEGORISED;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  const usedCategories: FilterCategory[] = categories
    .filter((c) => counts.has(c.slug))
    .map((c) => ({ _id: c._id, title: c.title, slug: c.slug, count: counts.get(c.slug)! }));
  if (counts.has(UNCATEGORISED)) {
    usedCategories.push({
      _id: UNCATEGORISED,
      title: "Others",
      slug: UNCATEGORISED,
      count: counts.get(UNCATEGORISED)!,
    });
  }

  const visible = people.filter(
    (p) =>
      matches(p, query) &&
      (activeCategory === "all" || (p.category?.slug ?? UNCATEGORISED) === activeCategory)
  );
  const sections = usedCategories
    .map((c) => ({
      category: c,
      description: categories.find((full) => full.slug === c.slug)?.description,
      items: visible.filter((p) => (p.category?.slug ?? UNCATEGORISED) === c.slug),
    }))
    .filter((section) => section.items.length > 0);

  const isFiltered = Boolean(query) || activeCategory !== "all";

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Meet the Team"
        align="center"
        description="FETLAB is an institution, a research network, a set of research groups, an innovation community, and a student research forum — strengthened by everyone who participates."
      />

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <PeopleFilters
          categories={usedCategories}
          totalCount={people.length}
          query={query}
          activeCategory={activeCategory}
        />

        <p className="mt-6 text-center text-sm text-muted-foreground" role="status" aria-live="polite">
          {isFiltered
            ? `${visible.length} ${visible.length === 1 ? "person" : "people"} found`
            : " "}
        </p>

        {sections.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-heading text-xl font-semibold">No one matches that search</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different name, role, or affiliation.
            </p>
            <Link href="/people" className="mt-6 inline-block text-sm font-medium text-primary hover:underline">
              Clear all filters
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-20">
            {sections.map((section) => (
              <section key={section.category._id}>
                <h2 className="text-center font-heading text-2xl font-semibold text-balance sm:text-3xl">
                  {section.category.title}
                </h2>
                {section.description && (
                  <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground text-pretty">
                    {section.description}
                  </p>
                )}
                <Reveal className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-14">
                  {section.items.map((person) => (
                    <RevealItem
                      key={person._id}
                      className="flex w-full max-w-56 flex-col items-center text-center sm:w-56"
                    >
                      <Avatar name={person.name} photoUrl={person.photoUrl} size={144} />
                      <h3 className="mt-5 font-heading text-lg font-semibold text-balance">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground text-pretty">{person.role}</p>
                      {person.affiliation && (
                        <p className="mt-1 text-xs text-muted-foreground text-pretty">
                          {person.affiliation}
                        </p>
                      )}
                      <PersonLinks
                        className="mt-3 flex justify-center"
                        email={person.email}
                        website={person.website}
                        socials={person.socials}
                      />
                    </RevealItem>
                  ))}
                </Reveal>
              </section>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
