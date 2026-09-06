"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import type { Publication, PublicationType } from "@/lib/sanity/types";

const TYPE_ORDER: PublicationType[] = ["journal", "conference", "preprint", "thesis", "report"];

const TYPE_LABEL: Record<PublicationType, string> = {
  journal: "Journal Article",
  conference: "Conference Paper",
  preprint: "Preprint",
  thesis: "Thesis",
  report: "Report",
};

export function PublicationList({ publications }: { publications: Publication[] }) {
  const [type, setType] = useState<PublicationType | "all">("all");
  const [tag, setTag] = useState<string | "all">("all");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    publications.forEach((p) => p.tags?.forEach((tg) => set.add(tg)));
    return Array.from(set).sort();
  }, [publications]);

  const filtered = publications.filter(
    (p) => (type === "all" || p.type === type) && (tag === "all" || p.tags?.includes(tag))
  );

  const byYear = useMemo(() => {
    const map = new Map<number, Publication[]>();
    filtered.forEach((p) => {
      if (!map.has(p.year)) map.set(p.year, []);
      map.get(p.year)!.push(p);
    });
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  if (publications.length === 0) {
    return <p className="text-muted-foreground">No publications listed yet.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <FilterPill active={type === "all"} onClick={() => setType("all")}>
          All types
        </FilterPill>
        {TYPE_ORDER.filter((tp) => publications.some((p) => p.type === tp)).map((tp) => (
          <FilterPill key={tp} active={type === tp} onClick={() => setType(tp)}>
            {TYPE_LABEL[tp]}
          </FilterPill>
        ))}
      </div>

      {allTags.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <FilterPill active={tag === "all"} onClick={() => setTag("all")} subtle>
            All topics
          </FilterPill>
          {allTags.map((tg) => (
            <FilterPill key={tg} active={tag === tg} onClick={() => setTag(tg)} subtle>
              {tg}
            </FilterPill>
          ))}
        </div>
      )}

      <div className="mt-10 space-y-10">
        {byYear.map(([year, pubs]) => (
          <div key={year}>
            <h2 className="font-heading text-xl font-semibold">{year}</h2>
            <Reveal className="mt-4 flex flex-col divide-y divide-border rounded-lg border border-border">
              {pubs.map((pub) => (
                <RevealItem key={pub._id} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium text-balance">{pub.title}</h3>
                    <Badge variant="outline" className="shrink-0 font-normal">
                      {TYPE_LABEL[pub.type]}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{pub.authors.join(", ")}</p>
                  {pub.venue && (
                    <p className="mt-1 text-sm text-muted-foreground italic">{pub.venue}</p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {pub.doiUrl && (
                      <a
                        href={pub.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View paper
                      </a>
                    )}
                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        PDF
                      </a>
                    )}
                    {pub.relatedGroup && (
                      <Link
                        href={`/research/${pub.relatedGroup.slug}`}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {pub.relatedGroup.title}
                      </Link>
                    )}
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        ))}
        {byYear.length === 0 && (
          <p className="text-muted-foreground">No publications match this filter.</p>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  subtle,
  children,
}: {
  active: boolean;
  onClick: () => void;
  subtle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
        subtle && !active && "text-xs"
      )}
    >
      {children}
    </button>
  );
}
