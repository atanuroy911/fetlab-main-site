import { PageHeader } from "@/components/site/page-header";
import { Avatar } from "@/components/site/avatar";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { PersonLinks } from "@/components/site/person-links";
import { getPeople } from "@/lib/sanity/fetch";
import type { PersonCategory, PersonSummary } from "@/lib/sanity/types";

export const metadata = { title: "People — FETLAB" };

const CATEGORY_ORDER: PersonCategory[] = [
  "leadership",
  "core",
  "researcher",
  "student",
  "collaborator",
];

const CATEGORY_LABEL: Record<PersonCategory, string> = {
  leadership: "Founders & Leadership",
  core: "Core Team",
  researcher: "Researchers & Faculty",
  student: "Student Researchers",
  collaborator: "Collaborators",
};

export default async function PeoplePage() {
  const people = await getPeople();
  const byCategory = CATEGORY_ORDER.map((category) => ({
    category,
    items: people.filter((p) => p.category === category),
  })).filter((section) => section.items.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="People & Network"
        title="Founders, Leadership & Network"
        description="FETLAB is an institution, a research network, a set of research groups, an innovation community, and a student research forum — strengthened by everyone who participates."
      />

      {byCategory.map((section, i) => (
        <section
          key={section.category}
          className={i % 2 === 1 ? "bg-muted/30 py-12" : "py-4"}
        >
          <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
            <h2 className="mb-8 font-heading text-xl font-semibold">
              {CATEGORY_LABEL[section.category]}
            </h2>
            <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((person) => (
                <RevealItem key={person._id}>
                  <PersonCard person={person} spotlight={section.category === "leadership"} />
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}

function PersonCard({ person, spotlight }: { person: PersonSummary; spotlight?: boolean }) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-lg border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        spotlight ? "border-primary/20 bg-background" : "border-border bg-background"
      }`}
    >
      {spotlight && (
        <span
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand-2))" }}
        />
      )}
      <div className="flex gap-4">
        <Avatar
          name={person.name}
          photoUrl={person.photoUrl}
          size={spotlight ? 72 : 56}
          className={spotlight ? "ring-2 ring-primary/25" : undefined}
        />
        <div>
          <h3 className={`font-heading font-semibold ${spotlight ? "text-xl" : "text-lg"}`}>
            {person.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-primary">{person.role}</p>
          {person.affiliation && (
            <p className="mt-1 text-sm text-muted-foreground">{person.affiliation}</p>
          )}
        </div>
      </div>
      {person.bio && <p className="mt-3 text-sm text-muted-foreground">{person.bio}</p>}
      <PersonLinks
        email={person.email}
        website={person.website}
        socials={person.socials}
        className="mt-4 border-t border-border pt-3 -ml-1"
      />
    </div>
  );
}
