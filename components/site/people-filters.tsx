"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterCategory = { _id: string; title: string; slug: string; count: number };

/**
 * Search + category controls. Filtering itself happens on the server from the
 * URL, so this only writes to the URL. It is a real GET form, which keeps
 * search working before hydration and without JavaScript.
 */
export function PeopleFilters({
  categories,
  totalCount,
  query,
  activeCategory,
}: {
  categories: FilterCategory[];
  totalCount: number;
  query: string;
  activeCategory: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(query);
  const [syncedQuery, setSyncedQuery] = useState(query);
  const isFirstRender = useRef(true);

  // Keep the box in sync when the URL changes from elsewhere (back button, a
  // category pill, the "clear all" link). Adjusting during render rather than
  // in an effect avoids a second render pass.
  if (query !== syncedQuery) {
    setSyncedQuery(query);
    setValue(query);
  }

  // Debounce so typing does not push a navigation per keystroke.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (value === query) return;
    const id = setTimeout(() => router.replace(buildHref(value, activeCategory), { scroll: false }), 250);
    return () => clearTimeout(id);
  }, [value, query, activeCategory, router]);

  return (
    <div className="mx-auto max-w-2xl">
      <form action="/people" method="get" role="search">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            name="q"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search by name, role, or affiliation…"
            aria-label="Search people"
            className="h-11 w-full rounded-full border border-border bg-background pr-10 pl-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          {value && (
            <button
              type="button"
              onClick={() => setValue("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {/* Preserves the active category when the form is submitted without JS. */}
        {activeCategory !== "all" && <input type="hidden" name="category" value={activeCategory} />}
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <FilterPill href={buildHref(query, "all")} active={activeCategory === "all"}>
          All <span className="opacity-60">{totalCount}</span>
        </FilterPill>
        {categories.map((category) => (
          <FilterPill
            key={category._id}
            href={buildHref(query, category.slug)}
            active={activeCategory === category.slug}
          >
            {category.title} <span className="opacity-60">{category.count}</span>
          </FilterPill>
        ))}
      </div>
    </div>
  );
}

export function buildHref(query: string, category: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (category && category !== "all") params.set("category", category);
  const qs = params.toString();
  return qs ? `/people?${qs}` : "/people";
}

function FilterPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  // A real link, so pills are crawlable and open-in-new-tab works.
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}
