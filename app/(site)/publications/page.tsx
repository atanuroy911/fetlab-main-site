import Link from "next/link";
import { Download, FileText, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { ListFilters, type FilterOption } from "@/components/site/list-filters";
import { CiteButton } from "@/components/site/cite-button";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { getPublications } from "@/lib/sanity/fetch";
import { toBibTeX } from "@/lib/bibtex";
import type { Publication, PublicationType } from "@/lib/sanity/types";

const description = "Papers, reports, and research outputs from across the FETLAB network.";

export const metadata = {
  title: "Publications",
  description,
  alternates: { canonical: "/publications" },
  openGraph: { title: "Publications — FETLAB", description, url: "/publications" },
};

const TYPE_ORDER: PublicationType[] = ["journal", "conference", "preprint", "thesis", "report"];

const TYPE_LABEL: Record<PublicationType, string> = {
  journal: "Journal Articles",
  conference: "Conference Papers",
  preprint: "Preprints",
  thesis: "Theses",
  report: "Reports",
};

const TYPE_BADGE: Record<PublicationType, string> = {
  journal: "Journal Article",
  conference: "Conference Paper",
  preprint: "Preprint",
  thesis: "Thesis",
  report: "Report",
};

function matches(publication: Publication, query: string) {
  if (!query) return true;
  const haystack = [
    publication.title,
    publication.venue,
    publication.authors.join(" "),
    String(publication.year),
    ...(publication.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const [{ q, type }, allPublications] = await Promise.all([searchParams, getPublications()]);
  const query = (q ?? "").trim();
  const activeType = type ?? "all";

  const counts = new Map<string, number>();
  allPublications.forEach((p) => counts.set(p.type, (counts.get(p.type) ?? 0) + 1));
  const options: FilterOption[] = TYPE_ORDER.filter((t) => counts.has(t)).map((t) => ({
    value: t,
    label: TYPE_LABEL[t],
    count: counts.get(t)!,
  }));

  const visible = allPublications.filter(
    (p) => matches(p, query) && (activeType === "all" || p.type === activeType)
  );
  const isFiltered = Boolean(query) || activeType !== "all";

  const byYear = new Map<number, Publication[]>();
  visible.forEach((p) => {
    if (!byYear.has(p.year)) byYear.set(p.year, []);
    byYear.get(p.year)!.push(p);
  });
  const years = Array.from(byYear.entries()).sort((a, b) => b[0] - a[0]);

  return (
    <>
      <PageHeader eyebrow="Publications" title="Publications" description={description} />

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        {allPublications.length === 0 ? (
          <p className="text-muted-foreground">No publications listed yet.</p>
        ) : (
          <>
            <ListFilters
              basePath="/publications"
              placeholder="Search by title, author, venue, or year…"
              searchLabel="Search publications"
              query={query}
              filterKey="type"
              options={options}
              activeValue={activeType}
              allLabel="All"
              totalCount={allPublications.length}
            />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
                {isFiltered
                  ? `${visible.length} ${visible.length === 1 ? "publication" : "publications"} found`
                  : " "}
              </p>
              <a
                href="/publications.bib"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Download className="h-3.5 w-3.5" aria-hidden />
                Download all as .bib
              </a>
            </div>

            {visible.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-heading text-xl font-semibold">
                  No publications match that search
                </p>
                <Link
                  href="/publications"
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Clear all filters
                </Link>
              </div>
            ) : (
              <div className="mt-4 space-y-10">
                {years.map(([year, publications]) => (
                  <div key={year}>
                    <h2 className="font-heading text-xl font-semibold">{year}</h2>
                    <Reveal className="mt-4 flex flex-col divide-y divide-border rounded-lg border border-border">
                      {publications.map((publication) => (
                        <RevealItem key={publication._id} className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-medium text-balance">{publication.title}</h3>
                            <Badge variant="outline" className="shrink-0 font-normal">
                              {TYPE_BADGE[publication.type]}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {publication.authors.join(", ")}
                          </p>
                          {publication.venue && (
                            <p className="mt-1 text-sm text-muted-foreground italic">
                              {publication.venue}
                            </p>
                          )}
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            {publication.doiUrl && (
                              <a
                                href={publication.doiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                              >
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                                View paper
                              </a>
                            )}
                            {publication.pdfUrl && (
                              <a
                                href={publication.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                              >
                                <FileText className="h-3.5 w-3.5" aria-hidden />
                                PDF
                              </a>
                            )}
                            <CiteButton
                              bibtex={toBibTeX(publication)}
                              title={publication.title}
                            />
                            {publication.relatedGroup && (
                              <Link
                                href={`/research/${publication.relatedGroup.slug}`}
                                className="text-sm text-muted-foreground hover:text-foreground"
                              >
                                {publication.relatedGroup.title}
                              </Link>
                            )}
                          </div>
                        </RevealItem>
                      ))}
                    </Reveal>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
