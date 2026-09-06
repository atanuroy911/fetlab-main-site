import { PageHeader } from "@/components/site/page-header";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { Handshake, Lightbulb, Building2, GraduationCap, Users, Mail } from "lucide-react";

const PATHWAYS = [
  {
    title: "Research Collaboration",
    body: "Joint research, publications, grants, datasets, and experiments.",
    Icon: Handshake,
  },
  {
    title: "Innovation Collaboration",
    body: "Prototyping, technology development, pilots, and experimental deployments.",
    Icon: Lightbulb,
  },
  {
    title: "Institutional Collaboration",
    body: "Partnerships between universities, companies, government, and NGOs.",
    Icon: Building2,
  },
  {
    title: "Student & Education",
    body: "Research opportunities, mentorship, workshops, and experiential learning.",
    Icon: GraduationCap,
  },
  {
    title: "Community & Field Engagement",
    body: "Working with communities and practitioners on real-world problems.",
    Icon: Users,
  },
  {
    title: "Knowledge Exchange",
    body: "Seminars, talks, publications, open resources, and events.",
    Icon: Mail,
  },
];

export const metadata = { title: "Contact — FETLAB" };

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="Connect"
        title="Collaborate with FETLAB"
        description="FETLAB works with researchers, students, institutions, industry, government, and communities. Reach out to explore how we can work together."
      />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PATHWAYS.map(({ title, body, Icon }) => (
            <RevealItem key={title} className="border-l-2 border-border pl-4">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-heading text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-2xl border border-border px-8 py-14 text-center sm:px-16"
            style={{
              backgroundImage:
                "radial-gradient(120% 100% at 50% 0%, color-mix(in oklch, var(--brand) 10%, var(--background)), var(--background))",
            }}
          >
            <h2 className="font-heading text-2xl font-semibold">Get in touch</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Send us a note and let us know how you&apos;d like to be involved.
            </p>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              {settings.contactEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
