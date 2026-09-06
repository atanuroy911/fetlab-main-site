import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { Avatar } from "@/components/site/avatar";
import { NewsKindBadge } from "@/components/site/news-kind-badge";
import { ListFilters, type FilterOption } from "@/components/site/list-filters";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { getNotices, getPosts } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/format-date";
import {
  NEWS_KIND_ORDER,
  matchesNews,
  toNewsFeed,
  type NewsKind,
} from "@/lib/news";

const description =
  "Research notes, announcements, and events from across the FETLAB network. Looking for opportunities to apply to? See Join.";

export const metadata = {
  title: "News",
  description,
  alternates: { canonical: "/news" },
  openGraph: { title: "News — FETLAB", description, url: "/news" },
};

const PLURAL: Record<NewsKind, string> = {
  post: "Posts",
  announcement: "Announcements",
  event: "Events",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kind?: string }>;
}) {
  const [{ q, kind }, posts, notices] = await Promise.all([
    searchParams,
    getPosts(),
    getNotices(),
  ]);
  const query = (q ?? "").trim();
  const activeKind = kind ?? "all";

  const feed = toNewsFeed(posts, notices);

  const counts = new Map<string, number>();
  feed.forEach((item) => counts.set(item.kind, (counts.get(item.kind) ?? 0) + 1));
  const options: FilterOption[] = NEWS_KIND_ORDER.filter((k) => counts.has(k)).map((k) => ({
    value: k,
    label: PLURAL[k],
    count: counts.get(k)!,
  }));

  const visible = feed.filter(
    (item) => matchesNews(item, query) && (activeKind === "all" || item.kind === activeKind)
  );
  const isFiltered = Boolean(query) || activeKind !== "all";

  return (
    <>
      <PageHeader eyebrow="News" title="News & Updates" description={description} />

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        {feed.length === 0 ? (
          <p className="text-muted-foreground">Nothing published yet.</p>
        ) : (
          <>
            <ListFilters
              basePath="/news"
              placeholder="Search news…"
              searchLabel="Search news"
              query={query}
              filterKey="kind"
              options={options}
              activeValue={activeKind}
              allLabel="All"
              totalCount={feed.length}
            />

            <p className="mt-6 text-sm text-muted-foreground" role="status" aria-live="polite">
              {isFiltered
                ? `${visible.length} ${visible.length === 1 ? "item" : "items"} found`
                : " "}
            </p>

            {visible.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-heading text-xl font-semibold">Nothing matches that search</p>
                <Link
                  href="/news"
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Clear all filters
                </Link>
              </div>
            ) : (
              <Reveal className="mt-4 flex flex-col divide-y divide-border rounded-lg border border-border">
                {visible.map((item) => (
                  <RevealItem key={item.id}>
                    <Link
                      href={item.href}
                      className="flex gap-5 p-6 transition-colors hover:bg-accent/50"
                    >
                      {/* Posts carry cover art; notices do not, so the row adapts
                          rather than reserving an empty slot. */}
                      {item.coverImageUrl && (
                        <div className="relative hidden aspect-4/3 w-40 shrink-0 overflow-hidden rounded-md bg-muted sm:block">
                          <Image
                            src={item.coverImageUrl}
                            alt=""
                            fill
                            sizes="160px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <NewsKindBadge kind={item.kind} />
                          <time dateTime={item.date} className="text-sm text-muted-foreground">
                            {formatDate(item.date)}
                          </time>
                        </div>
                        <h2 className="mt-2 font-heading text-lg font-semibold text-balance">
                          {item.title}
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm text-muted-foreground text-pretty">
                          {item.summary}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                          {item.author && (
                            <span className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Avatar
                                name={item.author.name}
                                photoUrl={item.author.photoUrl}
                                size={20}
                              />
                              {item.author.name}
                            </span>
                          )}
                          {item.tags && item.tags.length > 0 && (
                            <span className="flex flex-wrap gap-1.5">
                              {item.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="font-normal">
                                  {tag}
                                </Badge>
                              ))}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </RevealItem>
                ))}
              </Reveal>
            )}

            <p className="mt-8 text-sm text-muted-foreground">
              Looking for vacancies, calls, and student positions?{" "}
              <Link href="/join" className="font-medium text-foreground hover:underline">
                See Join
              </Link>
              .
            </p>
          </>
        )}
      </section>
    </>
  );
}
