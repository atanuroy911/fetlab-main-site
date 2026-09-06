import { PageHeader } from "@/components/site/page-header";
import { ModelLoop } from "@/components/site/model-loop";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { getSiteSettings } from "@/lib/sanity/fetch";

export const metadata = { title: "About — FETLAB" };

const PRINCIPLES = [
  {
    title: "Problems before disciplines",
    body: "FETLAB begins with important questions and challenges rather than forcing every problem into a predefined disciplinary structure.",
  },
  {
    title: "Multidisciplinarity",
    body: "Complex problems frequently require perspectives from multiple disciplines. FETLAB creates teams and collaborations around problems rather than disciplinary boundaries.",
  },
  {
    title: "Distributed expertise",
    body: "FETLAB does not need to contain every capability internally. It builds value by connecting and orchestrating expertise across its network.",
  },
  {
    title: "Research and experimentation",
    body: "FETLAB combines rigorous inquiry with experimentation, prototyping, testing, and application.",
  },
  {
    title: "Openness",
    body: "FETLAB works across universities, research laboratories, companies, government, NGOs, communities, and independent researchers.",
  },
  {
    title: "Knowledge as an outcome",
    body: "Success is measured not only through products, but through scientific knowledge, models, methods, datasets, and new research questions.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader eyebrow="About" title="What is FETLAB?" description={settings.whatIsFetlab} />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Reveal className="grid gap-6 sm:grid-cols-2">
          <RevealItem className="rounded-lg border border-border p-8">
            <h2 className="text-sm font-medium tracking-wide text-primary uppercase">Vision</h2>
            <p className="mt-3 font-heading text-xl leading-snug text-pretty">
              {settings.vision}
            </p>
          </RevealItem>
          <RevealItem className="rounded-lg border border-border p-8">
            <h2 className="text-sm font-medium tracking-wide text-primary uppercase">Mission</h2>
            <p className="mt-3 font-heading text-xl leading-snug text-pretty">
              {settings.mission}
            </p>
          </RevealItem>
        </Reveal>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Philosophy &amp; Principles
          </h2>
          <Reveal className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <RevealItem key={p.title} className="border-l-2 border-border pl-4">
                <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{p.body}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          The FETLAB Model
        </h2>
        <p className="mt-4 max-w-2xl font-heading text-xl text-pretty">
          The conventional research model runs one way: Research → Publications → Technology
          → Industry. FETLAB works differently — as a loop.
        </p>
        <div className="mt-10">
          <ModelLoop />
        </div>
        <p className="mt-10 max-w-2xl text-muted-foreground">
          It is problem-driven, multidisciplinary, collaborative, experimental, open,
          iterative, knowledge-generating, and impact-oriented — an evolving system rather
          than a linear pipeline.
        </p>
      </section>
    </>
  );
}
