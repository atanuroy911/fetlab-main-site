"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterOption = { value: string; label: string; count: number };

/**
 * Shared search box + filter pills for the list pages. Filtering itself runs on
 * the server from the URL, so this only writes to the URL. The search box is a
 * real GET form and the pills are real links, which keeps both working before
 * hydration and with JavaScript disabled.
 */
export function ListFilters({
  basePath,
  placeholder,
  searchLabel,
  query,
  filterKey,
  options,
  activeValue,
  allLabel,
  totalCount,
}: {
  basePath: string;
  placeholder: string;
  searchLabel: string;
  query: string;
  filterKey: string;
  options: FilterOption[];
  activeValue: string;
  allLabel: string;
  totalCount: number;
}) {
  const router = useRouter();
  const [value, setValue] = useState(query);
  const [syncedQuery, setSyncedQuery] = useState(query);
  const isFirstRender = useRef(true);

  // Re-sync when the URL changes from elsewhere (back button, a pill, "clear").
  // Adjusting during render rather than in an effect avoids a second pass.
  if (query !== syncedQuery) {
    setSyncedQuery(query);
    setValue(query);
  }

  const buildHref = (nextQuery: string, nextFilter: string) => {
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextFilter && nextFilter !== "all") params.set(filterKey, nextFilter);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  // Debounce so typing does not push a navigation per keystroke.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (value === query) return;
    const id = setTimeout(
      () => router.replace(buildHref(value, activeValue), { scroll: false }),
      250
    );
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, query, activeValue, router]);

  return (
    <div>
      <form action={basePath} method="get" role="search">
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
            placeholder={placeholder}
            aria-label={searchLabel}
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
        {activeValue !== "all" && <input type="hidden" name={filterKey} value={activeValue} />}
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <Pill href={buildHref(query, "all")} active={activeValue === "all"}>
          {allLabel} <span className="opacity-60">{totalCount}</span>
        </Pill>
        {options.map((option) => (
          <Pill
            key={option.value}
            href={buildHref(query, option.value)}
            active={activeValue === option.value}
          >
            {option.label} <span className="opacity-60">{option.count}</span>
          </Pill>
        ))}
      </div>
    </div>
  );
}

function Pill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
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
